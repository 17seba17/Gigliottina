import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { WebSocketServer, WebSocket } from "ws";
import { insertStorySchema } from "@shared/schema";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Create WebSocket server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store connected clients
  const clients = new Set<WebSocket>();
  
  wss.on('connection', (ws) => {
    log('WebSocket client connected', 'ws');
    clients.add(ws);
    
    // Send current stories to new client
    storage.getStories().then(stories => {
      ws.send(JSON.stringify({
        type: 'initialStories',
        data: stories
      }));
    });
    
    ws.on('close', () => {
      log('WebSocket client disconnected', 'ws');
      clients.delete(ws);
    });
  });
  
  // Function to broadcast to all connected clients
  function broadcast(message: any) {
    const data = JSON.stringify(message);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  // API endpoint to get all stories
  app.get('/api/stories', async (req, res) => {
    try {
      const stories = await storage.getStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stories' });
    }
  });

  // API endpoint to save a story
  app.post('/api/stories', async (req, res) => {
    try {
      const { username, content } = req.body;
      
      // Validate input
      if (!username || !content) {
        return res.status(400).json({ message: 'Username and content are required' });
      }
      
      // Save the story
      await storage.saveStory(username, content);
      
      // Broadcast to all clients
      broadcast({
        type: 'newStory',
        data: { username, content }
      });
      
      res.status(201).json({ message: 'Story saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving story' });
    }
  });

  return httpServer;
}
