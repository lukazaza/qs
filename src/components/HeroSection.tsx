import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Search, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="relative bg-gray-900 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
      
      {/* Animated Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center justify-center mb-6 bg-blue-900/30 rounded-full px-4 py-1 border border-blue-700/30">
              <Zap size={16} className="text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm font-medium">Discover the best Discord servers</span>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
          >
            Find your perfect Discord community
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Explore top-ranked Discord servers, connect with like-minded people, and join thriving communities in gaming, art, music, and more.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/ranked" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors shadow-lg shadow-blue-600/20"
            >
              <Award size={20} className="mr-2" />
              View Top Servers
            </Link>
            <Link 
              to="/search" 
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors border border-gray-700"
            >
              <Search size={20} className="mr-2" />
              Search Servers
            </Link>
          </motion.div>
        </div>
        
        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { 
              icon: <Award className="text-blue-400 mb-4\" size={32} />, 
              title: "Ranked Servers", 
              description: "Discover the most popular Discord servers ranked by community votes." 
            },
            { 
              icon: <Search className="text-blue-400 mb-4" size={32} />, 
              title: "Category Filters", 
              description: "Find servers that match your interests with powerful filtering options." 
            },
            { 
              icon: <Zap className="text-blue-400 mb-4\" size={32} />, 
              title: "AI Verification", 
              description: "All servers are automatically verified to ensure a safe experience." 
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-600/50 transition-colors"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;