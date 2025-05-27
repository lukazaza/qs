import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Search, Trophy, PlusCircle, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import AuthModal from './AuthModal';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navbarVariants = {
    transparent: { 
      backgroundColor: 'rgba(15, 23, 42, 0)', 
      boxShadow: 'none' 
    },
    solid: { 
      backgroundColor: 'rgba(15, 23, 42, 0.95)', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
    }
  };

  const navLinks = [
    { to: '/ranked', text: t('nav.ranked'), icon: <Trophy size={20} className="mr-2" /> },
    { to: '/search', text: t('nav.search'), icon: <Search size={20} className="mr-2" /> },
    { to: '/submit', text: t('nav.addServer'), icon: <PlusCircle size={20} className="mr-2" /> }
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300"
        variants={navbarVariants}
        animate={isScrolled ? 'solid' : 'transparent'}
        initial="transparent"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
            <Zap className="mr-2" size={28} />
            <span>ReloadWeb</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === link.to
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800">
                  <User size={20} className="mr-2" />
                  <span className="max-w-[100px] truncate">{user.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-lg shadow-xl invisible group-hover:visible">
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <LogIn size={20} className="mr-2" />
                Sign In
              </button>
            )}
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-lg py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto flex flex-col space-y-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    location.pathname === link.to
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
              
              {user ? (
                <>
                  <div className="px-4 py-2 text-gray-300 border-t border-gray-700">
                    <User size={16} className="inline mr-2" />
                    {user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 w-full"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <LogIn size={16} className="mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;