import { useState, useEffect } from 'react';
import serversData from '../data/servers.json';
import { Server } from '../types/server';

export const useServers = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate API fetch delay
      const fetchData = async () => {
        setLoading(true);
        
        // Artificial delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sort servers by votes (descending)
        const sortedServers = [...serversData.servers].sort((a, b) => b.votes - a.votes);
        setServers(sortedServers);
        setLoading(false);
      };
      
      fetchData();
    } catch (err) {
      setError('Failed to load servers data');
      setLoading(false);
    }
  }, []);

  // Get paginated servers
  const getPaginatedServers = (page: number, perPage: number = 5) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return servers.slice(startIndex, endIndex);
  };

  // Get total pages
  const getTotalPages = (perPage: number = 5) => {
    return Math.ceil(servers.length / perPage);
  };

  // Get server by ID
  const getServerById = (id: string) => {
    return servers.find(server => server.id === id);
  };

  // Search servers
  const searchServers = (query: string, categories: string[] = []) => {
    if (!query && categories.length === 0) {
      return servers;
    }

    return servers.filter(server => {
      const matchesQuery = !query || 
        server.name.toLowerCase().includes(query.toLowerCase()) ||
        server.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategories = categories.length === 0 || 
        categories.every(cat => server.categories.includes(cat));
      
      return matchesQuery && matchesCategories;
    });
  };

  return {
    servers,
    loading,
    error,
    getPaginatedServers,
    getTotalPages,
    getServerById,
    searchServers,
  };
};