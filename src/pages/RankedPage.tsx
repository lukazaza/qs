import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Calendar, Filter } from 'lucide-react';
import { useServers } from '../hooks/useServers';
import ServerCard from '../components/ServerCard';
import Pagination from '../components/Pagination';

const RankedPage: React.FC = () => {
  const { servers, loading, error, getPaginatedServers, getTotalPages } = useServers();
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState<'all' | 'daily' | 'weekly'>('all');
  const serversPerPage = 5;

  useEffect(() => {
    // Set the page title
    document.title = 'Ranked Discord Servers | ReloadWeb';
    
    // Get page from URL query params if it exists
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    }
  }, []);

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Update URL with new page
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url.toString());
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter servers based on time filter (in a real app, this would be API-based)
  const getFilteredServers = () => {
    if (timeFilter === 'all') {
      return getPaginatedServers(currentPage, serversPerPage);
    }
    
    // This is a simulation - in a real app, you'd have actual date filtering
    const filteredServers = servers.slice()
      .sort((a, b) => {
        if (timeFilter === 'daily') {
          // Simulate daily ranking with a random factor
          return (b.votes % 50) - (a.votes % 50);
        } else {
          // Simulate weekly ranking
          return (b.votes % 200) - (a.votes % 200);
        }
      });
      
    const startIndex = (currentPage - 1) * serversPerPage;
    return filteredServers.slice(startIndex, startIndex + serversPerPage);
  };

  const displayedServers = !loading ? getFilteredServers() : [];
  const totalPages = !loading ? getTotalPages(serversPerPage) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="mb-12 text-center">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-4 flex items-center justify-center"
        >
          <Trophy className="text-yellow-500 mr-3" />
          Top Ranked Discord Servers
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Discover the most popular Discord servers ranked by community votes and activity.
        </motion.p>
      </div>
      
      {/* Filter Tabs */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex justify-center mb-10"
      >
        <div className="bg-gray-800 rounded-lg p-1 flex">
          <button
            onClick={() => setTimeFilter('all')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              timeFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Trophy size={16} className="mr-2" />
            <span>All Time</span>
          </button>
          <button
            onClick={() => setTimeFilter('daily')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              timeFilter === 'daily' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Clock size={16} className="mr-2" />
            <span>Today</span>
          </button>
          <button
            onClick={() => setTimeFilter('weekly')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              timeFilter === 'weekly' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Calendar size={16} className="mr-2" />
            <span>This Week</span>
          </button>
        </div>
      </motion.div>
      
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg max-w-2xl mx-auto my-12">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 mb-8">
            {displayedServers.map((server, index) => (
              <ServerCard 
                key={server.id} 
                server={server} 
                rank={(currentPage - 1) * serversPerPage + index + 1} 
                delay={index}
              />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </motion.div>
  );
};

export default RankedPage;