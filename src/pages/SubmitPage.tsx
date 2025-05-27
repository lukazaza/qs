import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ServerSubmitForm from '../components/ServerSubmitForm';
import { useCategories } from '../hooks/useCategories';

const SubmitPage: React.FC = () => {
  const { categories, loading, error } = useCategories();

  useEffect(() => {
    // Set page title
    document.title = 'Submit Your Discord Server | ReloadWeb';
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Submit Your Server</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Add your Discord server to our growing list and get more members. All submissions are automatically verified by our AI system.
        </p>
      </motion.div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg max-w-2xl mx-auto my-12">
          <p>{error}</p>
        </div>
      ) : (
        <ServerSubmitForm categories={categories} />
      )}
    </div>
  );
};

export default SubmitPage;