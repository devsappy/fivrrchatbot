import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Grainient from './Grainient';
import PillNav from './PillNav';

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
      className="fixed w-full z-[999] pt-6 transition-all duration-300"
    >

      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:hidden"
          >
            <Link to="/" className="transition-colors">
              <img src="/logo.png" alt="Chatterify Logo" className="h-10 w-auto" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex w-full justify-center">
            <PillNav
              logo={<div className="flex items-center gap-2"><img src="/logo.png" alt="Chatterify Logo" className="h-11 w-auto object-contain" /><span className="logo-rubik text-2xl text-gray-900 font-bold tracking-wide leading-none">Chatterify</span></div>}
              logoAlt="Chatterify Logo"
              items={[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' }
              ]}
              activeHref={location.pathname}
              className="custom-nav"
              ease="power2.easeOut"
              baseColor="#ffffff"
              pillColor="#000000"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#ffffff"
              theme="light"
              initialLoadAnimation
            />
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
                  to="/blog"
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 text-lg font-medium transition-colors ${location.pathname === '/blog'
                    ? 'text-black font-semibold'
                    : 'text-gray-600 hover:text-black'
                    }`}
                >
                  Blog
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


              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;