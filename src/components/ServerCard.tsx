import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Award, Users, ExternalLink } from 'lucide-react';
import { Server } from '../types/server';

interface ServerCardProps {
  server: Server;
  rank?: number;
  delay?: number;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, rank, delay = 0 }) => {
  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, this would send a request to the server
    // For now, we'll just store the vote in localStorage
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    const serverId = server.id;
    
    if (!votes[serverId]) {
      votes[serverId] = true;
      localStorage.setItem('votes', JSON.stringify(votes));
      
      // Update UI - In a real app, this would update the server state
      const voteCountElement = document.getElementById(`vote-count-${serverId}`);
      if (voteCountElement) {
        voteCountElement.textContent = `${server.votes + 1}`;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={server.icon} 
          alt={`${server.name} icon`}
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        {rank && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
            {rank}
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          {server.aiStatus === 'SAFE' ? (
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <CheckCircle size={12} className="mr-1" />
              <span>Safe</span>
            </div>
          ) : server.aiStatus === 'NSFW' ? (
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <XCircle size={12} className="mr-1" />
              <span>NSFW</span>
            </div>
          ) : (
            <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <XCircle size={12} className="mr-1" />
              <span>Dubious</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <Link to={`/servers/${server.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">{server.name}</h3>
        </Link>
        
        <p className="text-gray-400 text-sm mb-4">{server.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {server.categories.slice(0, 3).map((category, index) => (
            <span 
              key={index} 
              className="bg-gray-700 text-blue-400 text-xs px-2 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center text-gray-400 text-sm">
              <Users size={14} className="mr-1" />
              <span>{server.members.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Award size={14} className="mr-1" />
              <span id={`vote-count-${server.id}`}>{server.votes}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-lg transition-colors flex items-center"
              onClick={handleVote}
            >
              Vote
            </motion.button>
            
            <a 
              href={server.inviteLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded-lg transition-colors flex items-center"
            >
              <ExternalLink size={14} className="mr-1" />
              Join
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerCard;