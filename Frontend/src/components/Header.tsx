import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Account';
  const initial = firstName.charAt(0).toUpperCase();

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Close on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="fixed w-full z-[999] pt-5"
    >
      <nav className="mx-auto px-4 sm:px-6 max-w-7xl" ref={menuRef}>

        {/* ── Desktop ── */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-lg px-3 py-2 w-full">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-1.5 mr-3 shrink-0 flex-1"
            >
              <img src="/logo.png" alt="Chatterify" className="h-10 w-auto object-contain" />
              <span className="logo-rubik text-2xl font-bold text-gray-900 tracking-wide leading-none">
                Chatterify
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 mr-2 shrink-0" />

            {/* Nav links — centered */}
            <div className="flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  onClick={() => {
                    if (location.pathname === href) window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative px-8 py-2 rounded-full text-base font-medium transition-colors"
                  style={{ color: isActive ? '#ffffff' : '#374151' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktop-pill"
                      className="absolute -inset-y-1.5 inset-x-0 bg-black rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </Link>
              );
            })}
            </div>

            {/* Auth */}
            <div className="flex-1 flex justify-end shrink-0">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {initial}
                  </div>
                  <span className="text-base font-semibold text-gray-800">
                    {firstName}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-full bg-black text-white text-base font-semibold hover:bg-gray-800 transition-colors"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile top bar ── */}
        <div className="lg:hidden flex items-center justify-between bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-lg px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Chatterify" className="h-8 w-auto object-contain" />
            <span className="logo-rubik text-lg font-bold text-gray-900 tracking-wide leading-none">
              Chatterify
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full hover:bg-black/5 transition-colors"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-gray-800 rounded-full origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-gray-800 rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-gray-800 rounded-full origin-center"
            />
          </button>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-3">
                {/* Nav links */}
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = location.pathname === href;
                  return (
                    <Link
                      key={href}
                      to={href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-black text-white'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </Link>
                  );
                })}

                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === '/dashboard'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    Dashboard
                    {location.pathname === '/dashboard' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </Link>
                )}
              </div>

              {/* Profile / Login */}
              <div className="px-3 pb-3">
                <div className="border-t border-gray-100 pt-3">
                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black">{firstName}</p>
                        <p className="text-xs text-gray-500">Go to Dashboard →</p>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="block w-full py-3 px-4 bg-black text-white text-center rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
                    >
                      Log In
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </motion.header>
  );
};

export default Header;
