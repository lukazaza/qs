import React from 'react';
import { motion } from 'framer-motion';
import ServerCard from './ServerCard';
import { Server } from '../types/server';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeaturedServersProps {
  servers: Server[];
}

const FeaturedServers: React.FC<FeaturedServersProps> = ({ servers }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gray-900 py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white">
            <span className="text-blue-500">Featured</span> Servers
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => navigate('/ranked')}
          >
            <span className="mr-2">View all ranked servers</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servers.slice(0, 6).map((server, index) => (
            <ServerCard 
              key={server.id} 
              server={server} 
              rank={index + 1} 
              delay={index} 
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedServers;