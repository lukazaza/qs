import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Page Not Found | ReloadWeb';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24 min-h-[70vh] flex items-center justify-center"
    >
      <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <AlertTriangle size={32} className="text-yellow-500" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link 
            to="/search"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center justify-center transition-colors"
          >
            <Search size={18} className="mr-2" />
            Search Servers
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;