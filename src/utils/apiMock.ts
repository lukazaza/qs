// This file simulates API calls in a real application
// In a production app, these would be actual API requests

import serversData from '../data/servers.json';
import { Server } from '../types/server';

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const apiMock = {
  // Get all servers
  getServers: async (): Promise<Server[]> => {
    await delay(800);
    return serversData.servers;
  },
  
  // Get server by ID
  getServerById: async (id: string): Promise<Server | null> => {
    await delay(500);
    const server = serversData.servers.find(s => s.id === id);
    return server || null;
  },
  
  // Search servers
  searchServers: async (
    query: string = '', 
    categories: string[] = [], 
    aiStatus: 'ALL' | 'SAFE' | 'NSFW' = 'ALL'
  ): Promise<Server[]> => {
    await delay(600);
    
    return serversData.servers.filter(server => {
      // Match query
      const matchesQuery = !query || 
        server.name.toLowerCase().includes(query.toLowerCase()) ||
        server.description.toLowerCase().includes(query.toLowerCase());
      
      // Match categories
      const matchesCategories = categories.length === 0 || 
        categories.some(cat => server.categories.includes(cat));
      
      // Match AI status
      const matchesStatus = aiStatus === 'ALL' || server.aiStatus === aiStatus;
      
      return matchesQuery && matchesCategories && matchesStatus;
    });
  },
  
  // Submit server (mock)
  submitServer: async (serverData: Partial<Server>): Promise<{ success: boolean, serverId?: string, error?: string }> => {
    await delay(1500);
    
    // Simulate validation
    if (!serverData.name || !serverData.description || !serverData.inviteLink) {
      return { success: false, error: 'Missing required fields' };
    }
    
    // Simulate success
    return { 
      success: true, 
      serverId: 'new-server-123' 
    };
  },
  
  // Verify server with AI (mock)
  verifyServer: async (
    serverId: string
  ): Promise<{ status: 'SAFE' | 'NSFW' | 'DUBIOUS', reason: string }> => {
    await delay(2000);
    
    // Simulate verification
    // In a real app, this would call an AI service
    const statuses: Array<'SAFE' | 'NSFW' | 'DUBIOUS'> = ['SAFE', 'NSFW', 'DUBIOUS'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    let reason = '';
    switch (randomStatus) {
      case 'SAFE':
        reason = 'Content meets community guidelines and is appropriate for all audiences.';
        break;
      case 'NSFW':
        reason = 'Content contains adult material that violates our community guidelines.';
        break;
      case 'DUBIOUS':
        reason = 'Content contains potentially inappropriate material that requires manual review.';
        break;
    }
    
    return { status: randomStatus, reason };
  },
  
  // Vote for a server (mock)
  voteForServer: async (serverId: string): Promise<{ success: boolean, newVoteCount?: number }> => {
    await delay(300);
    
    // Find server
    const server = serversData.servers.find(s => s.id === serverId);
    if (!server) {
      return { success: false };
    }
    
    // Simulate vote increment
    return { 
      success: true, 
      newVoteCount: server.votes + 1 
    };
  }
};