import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturedServers from '../components/FeaturedServers';
import { useServers } from '../hooks/useServers';
import { Server } from 'lucide-react';

const HomePage: React.FC = () => {
  const { servers, loading, error } = useServers();
  
  useEffect(() => {
    // Set the page title
    document.title = 'ReloadWeb - Discover Top Discord Servers';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg max-w-2xl mx-auto my-12">
          <p>{error}</p>
        </div>
      ) : (
        <FeaturedServers servers={servers} />
      )}
      
      {/* Stats Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              The <span className="text-blue-500">Fastest Growing</span> Discord Directory
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join thousands of Discord community owners who list their servers on ReloadWeb to grow their membership.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: servers.length, label: 'Active Servers' },
              { number: servers.reduce((sum, server) => sum + server.members, 0).toLocaleString(), label: 'Members' },
              { number: servers.reduce((sum, server) => sum + server.votes, 0), label: 'Total Votes' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-600/50 transition-colors"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-900/30 to-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <Server size={40} className="text-blue-400 mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to add your server?
            </h2>
            <p className="text-gray-300 mb-8">
              Join the growing list of Discord communities on ReloadWeb. It only takes a minute to submit your server.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/submit" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Add Your Server
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;