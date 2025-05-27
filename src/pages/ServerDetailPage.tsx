import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useServers } from '../hooks/useServers';
import { 
  CheckCircle, 
  XCircle, 
  Users, 
  Calendar, 
  Award, 
  ExternalLink,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';

const ServerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getServerById, loading, error } = useServers();
  const [voted, setVoted] = useState(false);
  const [server, setServer] = useState(getServerById(id || ''));

  useEffect(() => {
    // Get server data
    const serverData = getServerById(id || '');
    setServer(serverData);
    
    // Set page title
    document.title = serverData 
      ? `${serverData.name} | Discord Server | ReloadWeb`
      : 'Server Not Found | ReloadWeb';
      
    // Check if user has already voted for this server
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    if (votes[id || '']) {
      setVoted(true);
    }
  }, [id, getServerById]);

  const handleVote = () => {
    if (!server || voted) return;
    
    // In a real app, this would send a request to the server
    // For now, we'll just store the vote in localStorage
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    votes[server.id] = true;
    localStorage.setItem('votes', JSON.stringify(votes));
    
    // Update UI
    setVoted(true);
    setServer({
      ...server,
      votes: server.votes + 1
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !server) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="bg-red-900/20 border border-red-700 text-red-300 p-6 rounded-lg max-w-2xl mx-auto my-12">
          <h2 className="text-xl font-bold mb-2">Server Not Found</h2>
          <p className="mb-4">The Discord server you're looking for doesn't exist or has been removed.</p>
          <Link to="/ranked" className="text-blue-400 hover:text-blue-300 flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Ranked Servers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24"
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back
      </button>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
          {/* Server Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
            <img 
              src={server.icon} 
              alt={server.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">{server.name}</h1>
                {server.aiStatus === 'SAFE' ? (
                  <div className="bg-green-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    <span>Verified</span>
                  </div>
                ) : server.aiStatus === 'NSFW' ? (
                  <div className="bg-red-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                    <XCircle size={14} className="mr-1" />
                    <span>NSFW</span>
                  </div>
                ) : (
                  <div className="bg-yellow-600 text-white text-sm px-3 py-1 rounded-full flex items-center">
                    <XCircle size={14} className="mr-1" />
                    <span>Unverified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Server Info */}
          <div className="p-6">
            {/* Server Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center text-gray-300">
                <Users size={18} className="mr-2 text-blue-400" />
                <span>{server.members.toLocaleString()} members</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Award size={18} className="mr-2 text-blue-400" />
                <span>{server.votes} votes</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar size={18} className="mr-2 text-blue-400" />
                <span>Created {new Date(server.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {server.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="bg-gray-700 text-blue-400 px-3 py-1 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">About this server</h3>
              <p className="text-gray-300 leading-relaxed">{server.fullDescription}</p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={server.inviteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                <MessageCircle size={18} className="mr-2" />
                Join Server
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVote}
                disabled={voted}
                className={`flex-1 py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors
                  ${voted 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                <Award size={18} className="mr-2" />
                {voted ? 'Already Voted' : 'Vote for Server'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerDetailPage;