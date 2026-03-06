import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Grainient from './Grainient';

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
      className={`fixed w-full z-50 transition-all duration-300 shadow-sm border-b border-gray-100 ${scrolled ? 'opacity-95' : 'opacity-100'
        }`}
    >
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
        <Grainient
          color1="#f1e9f1"
          color2="#b39709"
          color3="#e1d8fd"
          timeSpeed={0.25}
          colorBalance={1}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={6}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        {/* Adds a slight white overlay to ensure legibility of nav items over vibrant colors */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>
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
              className={`text-sm font-medium transition-colors ${location.pathname === '/'
                ? 'text-black font-semibold'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${location.pathname === '/services'
                ? 'text-black font-semibold'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              Services
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${location.pathname === '/about'
                ? 'text-black font-semibold'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${location.pathname === '/contact'
                ? 'text-black font-semibold'
                : 'text-gray-600 hover:text-black'
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
                className="px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300"
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
              <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black mt-1.5 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black mt-1.5 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-3' : ''}`}></span>
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
              <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 space-y-4 shadow-xl">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${location.pathname === '/'
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                    }`}
                >
                  Home
                </Link>

                <Link
                  to="/services"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${location.pathname === '/services'
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                    }`}
                >
                  Services
                </Link>

                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${location.pathname === '/about'
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                    }`}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${location.pathname === '/contact'
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                    }`}
                >
                  Contact
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 text-center mt-4"
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