import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Github } from 'lucide-react';
import Button from '../ui/Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-notion-blue rounded-notion-md flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold notion-text-primary hidden sm:block">
              Projects
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#" 
              className="text-notion-gray-700 hover:text-notion-gray-900 transition-colors duration-200 font-medium"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              Home
            </motion.a>
            <motion.a 
              href="#" 
              className="text-notion-gray-700 hover:text-notion-gray-900 transition-colors duration-200 font-medium"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              Projects
            </motion.a>
            <motion.a 
              href="#" 
              className="text-notion-gray-700 hover:text-notion-gray-900 transition-colors duration-200 font-medium"
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              About
            </motion.a>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="small"
              className="p-2"
            >
              <Search className="w-5 h-5 text-notion-gray-600" />
            </Button>
            
            <Button
              variant="ghost"
              size="small"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-notion-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-notion-gray-600" />
              )}
            </Button>
          </div>
        </div>

      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-notion-gray-200 overflow-hidden"
          >
            <nav className="px-6 py-4 space-y-4">
              <motion.a
                href="#"
                className="block text-notion-gray-700 hover:text-notion-gray-900 transition-colors duration-200 font-medium py-2"
                whileHover={{ x: 4 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </motion.a>
              <motion.a
                href="#"
                className="block text-notion-gray-700 hover:text-notion-gray-900 transition-colors duration-200 font-medium py-2"
                whileHover={{ x: 4 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </motion.a>
              <motion.a
                href="#"
                className="block text-notion-gray-700 hover:text-notion-gray-900 transition-colors duration-200 font-medium py-2"
                whileHover={{ x: 4 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;