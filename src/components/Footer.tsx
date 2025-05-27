import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center text-xl font-bold text-blue-500 hover:text-blue-400 transition-colors mb-2">
              <Zap className="mr-2" size={24} />
              <span>ReloadWeb</span>
            </Link>
            <p className="text-sm max-w-md">
              Discover the best Discord communities and add your server to our growing ranked list.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link to="/ranked" className="hover:text-blue-400 transition-colors">Ranked</Link></li>
                <li><Link to="/search" className="hover:text-blue-400 transition-colors">Search</Link></li>
                <li><Link to="/submit" className="hover:text-blue-400 transition-colors">Add Server</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/search?category=Gaming" className="hover:text-blue-400 transition-colors">Gaming</Link></li>
                <li><Link to="/search?category=Community" className="hover:text-blue-400 transition-colors">Community</Link></li>
                <li><Link to="/search?category=Technology" className="hover:text-blue-400 transition-colors">Technology</Link></li>
                <li><Link to="/search?category=Entertainment" className="hover:text-blue-400 transition-colors">Entertainment</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white font-semibold mb-3">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Github">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} ReloadWeb. All rights reserved.</p>
          <div className="flex items-center text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500" />
            <span>for Discord communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;