import { stories, type Story, type InsertStory } from "@shared/schema";

export interface IStorage {
  getStories(): Promise<Record<string, string>>;
  saveStory(username: string, content: string): Promise<void>;
  getAllStories(): Promise<Story[]>;
}

export class MemStorage implements IStorage {
  private stories: Record<string, string> = {};
  private storiesWithTimestamp: Story[] = [];
  private currentId: number = 1;

  constructor() {
    this.stories = {};
    this.storiesWithTimestamp = [];
  }

  async getStories(): Promise<Record<string, string>> {
    return { ...this.stories };
  }

  async saveStory(username: string, content: string): Promise<void> {
    this.stories[username] = content;
    
    // Also save to the array with timestamp and id for full story objects
    const newStory: Story = {
      id: this.currentId++,
      username,
      content,
      timestamp: Math.floor(Date.now() / 1000)
    };
    
    this.storiesWithTimestamp.push(newStory);
  }

  async getAllStories(): Promise<Story[]> {
    return [...this.storiesWithTimestamp];
  }
}

export const storage = new MemStorage();
