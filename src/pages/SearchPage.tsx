import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { useServers } from '../hooks/useServers';
import { useCategories } from '../hooks/useCategories';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ServerCard from '../components/ServerCard';
import { AlertTriangle, Filter, CheckCircle, XCircle } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const initialCategory = searchParams.get('category') || '';
  
  const { servers, loading: serversLoading, error: serversError, searchServers } = useServers();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [aiFilter, setAiFilter] = useState<'ALL' | 'SAFE' | 'NSFW'>('ALL');
  const [filteredServers, setFilteredServers] = useState(servers);

  useEffect(() => {
    // Set page title
    document.title = 'Search Discord Servers | ReloadWeb';
  }, []);

  // Update search results when dependencies change
  useEffect(() => {
    if (serversLoading || categoriesLoading) return;
    
    // Filter servers
    let results = searchServers(query, selectedCategories);
    
    // Apply AI filter
    if (aiFilter !== 'ALL') {
      results = results.filter(server => server.aiStatus === aiFilter);
    }
    
    setFilteredServers(results);
    
    // Update URL params
    const params: {[key: string]: string} = {};
    if (query) params.query = query;
    if (selectedCategories.length === 1) params.category = selectedCategories[0];
    setSearchParams(params);
    
  }, [query, selectedCategories, aiFilter, servers, serversLoading, categoriesLoading, searchServers, setSearchParams]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const handleAiFilter = (filter: 'ALL' | 'SAFE' | 'NSFW') => {
    setAiFilter(filter);
  };

  const isLoading = serversLoading || categoriesLoading;
  const hasError = serversError || categoriesError;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24"
    >
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Search Discord Servers
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-300 max-w-2xl mx-auto"
        >
          Find the perfect Discord community by searching for keywords or browsing categories.
        </motion.p>
      </div>
      
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : hasError ? (
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg max-w-2xl mx-auto my-12">
          <p>{serversError || categoriesError}</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/4"
          >
            <div className="bg-gray-800 rounded-xl p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <Filter size={20} className="mr-2 text-blue-500" />
                <h2 className="text-xl font-semibold text-white">Filters</h2>
              </div>
              
              <CategoryFilter 
                categories={categories} 
                selectedCategories={selectedCategories}
                onSelectCategory={handleCategorySelect}
              />
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Safety Filter</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleAiFilter('ALL')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm text-left ${
                      aiFilter === 'ALL'
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Filter size={16} className="mr-2" />
                    <span>All Servers</span>
                  </button>
                  <button
                    onClick={() => handleAiFilter('SAFE')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm text-left ${
                      aiFilter === 'SAFE'
                        ? 'bg-green-900/50 text-green-400'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <CheckCircle size={16} className="mr-2" />
                    <span>Safe Only</span>
                  </button>
                  <button
                    onClick={() => handleAiFilter('NSFW')}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm text-left ${
                      aiFilter === 'NSFW'
                        ? 'bg-red-900/50 text-red-400'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <XCircle size={16} className="mr-2" />
                    <span>NSFW Only</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Results */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:w-3/4"
          >
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <p className="text-gray-300">
                <span className="font-medium">{filteredServers.length}</span> {filteredServers.length === 1 ? 'server' : 'servers'} found
                {query && <span> for "<span className="text-blue-400">{query}</span>"</span>}
                {selectedCategories.length > 0 && (
                  <span> in {selectedCategories.map(cat => 
                    <span key={cat} className="text-blue-400">{cat}</span>
                  ).reduce((prev, curr) => [prev, ', ', curr] as any)}
                  </span>
                )}
              </p>
            </div>
            
            {filteredServers.length === 0 ? (
              <div className="bg-gray-800 rounded-xl p-8 text-center">
                <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No servers found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search criteria or explore different categories.
                </p>
                <button
                  onClick={() => {
                    setQuery('');
                    setSelectedCategories([]);
                    setAiFilter('ALL');
                  }}
                  className="text-blue-500 hover:text-blue-400"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredServers.map((server, index) => (
                  <ServerCard 
                    key={server.id} 
                    server={server}
                    delay={index} 
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SearchPage;