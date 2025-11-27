import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl shadow-lg'
          : 'bg-black/60 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="text-4xl text-black hover:text-amber-700 transition-colors">
              <span className="logo-rubik text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
                Chatterify
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-amber-400 font-semibold'
                  : 'text-gray-200 hover:text-amber-400'
              }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/services'
                  ? 'text-amber-400 font-semibold'
                  : 'text-gray-200 hover:text-amber-400'
              }`}
            >
              Services
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? 'text-amber-400 font-semibold'
                  : 'text-gray-200 hover:text-amber-400'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/contact'
                  ? 'text-amber-400 font-semibold'
                  : 'text-gray-200 hover:text-amber-400'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative">
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-3' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-6 overflow-hidden"
            >
              <div className="bg-black/90 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-6 space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${
                    location.pathname === '/'
                      ? 'text-amber-400'
                      : 'text-gray-200 hover:text-amber-400'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/services"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${
                    location.pathname === '/services'
                      ? 'text-amber-400'
                      : 'text-gray-200 hover:text-amber-400'
                  }`}
                >
                  Services
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${
                    location.pathname === '/about'
                      ? 'text-amber-400'
                      : 'text-gray-200 hover:text-amber-400'
                  }`}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${
                    location.pathname === '/contact'
                      ? 'text-amber-400'
                      : 'text-gray-200 hover:text-amber-400'
                  }`}
                >
                  Contact
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all duration-300 text-center mt-4"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;