import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

type WebSocketContextType = {
  socket: WebSocket | null;
  connected: boolean;
  stories: Record<string, string>;
};

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  connected: false,
  stories: {},
});

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = (props: WebSocketProviderProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [stories, setStories] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
      setConnected(true);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setConnected(false);
      
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        toast({
          title: "Disconnesso",
          description: "Tentativo di riconnessione in corso...",
          variant: "destructive",
        });
      }, 5000);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast({
        title: "Errore di connessione",
        description: "Impossibile connettersi al server",
        variant: "destructive",
      });
    };
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'initialStories':
            setStories(message.data);
            break;
          case 'newStory':
            setStories(prev => ({
              ...prev,
              [message.data.username]: message.data.content
            }));
            break;
          default:
            console.log('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    setSocket(ws);
    
    return () => {
      ws.close();
    };
  }, []);
  
  return (
    <WebSocketContext.Provider value={{ socket, connected, stories }}>
      {props.children}
    </WebSocketContext.Provider>
  );
};
