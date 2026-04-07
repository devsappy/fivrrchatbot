import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/login');
    }
  };

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', active: true },
    { label: 'Profile', icon: <ProfileIcon />, path: '#' },
    { label: 'Settings', icon: <SettingsIcon />, path: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#111111] flex w-full font-sans text-gray-200 overflow-hidden">
      
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarExpanded ? 280 : 80 }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
        className="border-r border-[#222222] flex flex-col justify-between py-6 px-4 shrink-0 bg-[#0A0A0A] relative z-20 h-screen overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-2 mb-12 h-14 overflow-hidden shrink-0 mt-2">
            <div className="w-12 h-12 rounded flex items-center justify-center shrink-0 -translate-x-1 translate-y-0.5">
                <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain brightness-0 invert" />
            </div>
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold text-2xl text-white whitespace-nowrap"
                >
                  Chatterify
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          
          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-colors font-medium text-sm h-12 overflow-hidden ${
                  item.active ? 'bg-[#222222] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                }`}
                title={!isSidebarExpanded ? item.label : undefined}
              >
                <div className="shrink-0 flex items-center justify-center">
                  {item.icon}
                </div>
                <AnimatePresence>
                  {isSidebarExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
            
          </nav>
          
          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-3 py-3 rounded-xl transition-colors font-medium text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] group h-12 overflow-hidden mb-2"
              title={!isSidebarExpanded ? 'Logout' : undefined}
            >
              <div className="shrink-0 flex items-center justify-center">
                 <LogoutIcon />
              </div>
              <AnimatePresence>
                {isSidebarExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap flex-1 text-left"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          {/* User Profile */}
          <div className={`flex items-center gap-4 py-3 bg-transparent overflow-hidden rounded-xl transition-all duration-300 ${isSidebarExpanded ? 'px-3 bg-[#111111] border border-[#222222]' : 'px-1 border border-transparent'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] flex items-center justify-center font-bold text-white shadow-sm shrink-0">
               {user?.user_metadata?.first_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col whitespace-nowrap overflow-hidden"
                >
                  <span className="text-sm font-semibold text-white truncate w-full">
                    {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                  </span>
                  <span className="text-[11px] text-gray-500 truncate w-full mt-0.5">
                    {user?.email}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12 flex items-center justify-center relative z-10 w-full overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="w-24 h-24 bg-[#111111] border border-[#222222] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-black/20">
             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <line x1="3" x2="21" y1="9" y2="9"/>
                <path d="M9 21V9"/>
              </svg>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Dash Board Empty</h2>
          <p className="text-gray-500 text-[15px] max-w-sm leading-relaxed">
            There is currently no data or active projects to display in your workspace. Build something amazing!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

// Icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1"/>
    <rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/>
    <rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
);

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
);
