// This file simulates API calls in a real application
// In a production app, these would be actual API requests

import serversData from '../data/servers.json';
import { Server } from '../types/server';
import { suggestCategories } from './aiCategorization';

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
    
    // Validate required fields
    if (!serverData.name || !serverData.description || !serverData.inviteLink) {
      return { success: false, error: 'Missing required fields' };
    }

    // Perform AI verification
    const verificationResult = await apiMock.verifyServer('');
    
    if (verificationResult.status === 'NSFW') {
      return { success: false, error: 'Server content violates community guidelines' };
    }

    // Auto-categorize the server if it's safe
    const suggestedCategories = suggestCategories(serverData);
    
    // Create a new server object
    const newServer: Server = {
      id: `new-server-${Date.now()}`,
      name: serverData.name,
      icon: serverData.icon || '',
      description: serverData.description,
      fullDescription: serverData.fullDescription || serverData.description,
      inviteLink: serverData.inviteLink,
      members: 0,
      categories: suggestedCategories,
      aiStatus: verificationResult.status,
      votes: 0,
      createdAt: new Date().toISOString()
    };
    
    // In a real app, this would be added to the database
    // For now, we'll add it to our mock data
    serversData.servers.push(newServer);
    
    return { 
      success: true, 
      serverId: newServer.id 
    };
  },
  
  // Verify server with AI (mock)
  verifyServer: async (
    serverId: string
  ): Promise<{ status: 'SAFE' | 'NSFW' | 'DUBIOUS', reason: string }> => {
    await delay(2000);
    
    // In a real app, this would use actual AI verification
    // For demo purposes, we'll return SAFE 80% of the time
    const random = Math.random();
    
    if (random < 0.8) {
      return {
        status: 'SAFE',
        reason: 'Content meets community guidelines and is appropriate for all audiences.'
      };
    } else if (random < 0.9) {
      return {
        status: 'NSFW',
        reason: 'Content contains adult material that violates our community guidelines.'
      };
    } else {
      return {
        status: 'DUBIOUS',
        reason: 'Content contains potentially inappropriate material that requires manual review.'
      };
    }
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