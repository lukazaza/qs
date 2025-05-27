import serversData from '../data/servers.json';
import { Server } from '../types/server';
import { suggestCategories } from './aiCategorization';

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Store submitted servers in memory (in a real app, this would be in a database)
const submittedServers = new Map<string, Server>();

// Mock API service
export const apiMock = {
  // Get all servers
  getServers: async (): Promise<Server[]> => {
    await delay(800);
    // Include submitted servers in the results
    return [...serversData.servers, ...Array.from(submittedServers.values())];
  },
  
  // Get server by ID
  getServerById: async (id: string): Promise<Server | null> => {
    await delay(500);
    // Check submitted servers first
    const submittedServer = submittedServers.get(id);
    if (submittedServer) {
      return submittedServer;
    }
    // Then check original servers
    return serversData.servers.find(s => s.id === id) || null;
  },
  
  // Search servers
  searchServers: async (
    query: string = '', 
    categories: string[] = [], 
    aiStatus: 'ALL' | 'SAFE' | 'NSFW' = 'ALL'
  ): Promise<Server[]> => {
    await delay(600);
    
    // Combine original and submitted servers
    const allServers = [...serversData.servers, ...Array.from(submittedServers.values())];
    
    return allServers.filter(server => {
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
  
  // Submit server
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
    
    // Auto-categorize the server
    const suggestedCategories = suggestCategories(serverData);
    
    // Create a new server object with a unique ID
    const newServerId = `new-server-${Date.now()}`;
    const newServer: Server = {
      id: newServerId,
      name: serverData.name,
      icon: serverData.icon || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      description: serverData.description,
      fullDescription: serverData.fullDescription || serverData.description,
      inviteLink: serverData.inviteLink,
      members: 0,
      categories: suggestedCategories,
      aiStatus: verificationResult.status,
      votes: 0,
      createdAt: new Date().toISOString()
    };
    
    // Store the new server
    submittedServers.set(newServerId, newServer);
    
    return { 
      success: true, 
      serverId: newServerId
    };
  },
  
  // Verify server with AI
  verifyServer: async (
    serverId: string
  ): Promise<{ status: 'SAFE' | 'NSFW' | 'DUBIOUS', reason: string }> => {
    await delay(2000);
    
    // For demo purposes, we'll return SAFE by default
    return {
      status: 'SAFE',
      reason: 'Content meets community guidelines and is appropriate for all audiences.'
    };
  },
  
  // Vote for a server
  voteForServer: async (serverId: string): Promise<{ success: boolean, newVoteCount?: number }> => {
    await delay(300);
    
    // Check submitted servers first
    const submittedServer = submittedServers.get(serverId);
    if (submittedServer) {
      submittedServer.votes += 1;
      return { 
        success: true, 
        newVoteCount: submittedServer.votes 
      };
    }
    
    // Then check original servers
    const server = serversData.servers.find(s => s.id === serverId);
    if (!server) {
      return { success: false };
    }
    
    server.votes += 1;
    return { 
      success: true, 
      newVoteCount: server.votes 
    };
  }
};