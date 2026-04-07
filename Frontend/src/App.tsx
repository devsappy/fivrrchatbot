import React from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import DipanjanPortfolioPage from './pages/DipanjanPortfolioPage';

import RajatavaPortfolioPage from './pages/RajatavaPortfolioPage';
import SaptarshiPortfolioPage from './pages/SaptarshiPortfolioPage';
import WebDevelopmentPage from './pages/WebDevelopmentPage';
import ChatbotIntegrationPage from './pages/ChatbotIntegrationPage';
import VoiceAgentsPage from './pages/VoiceAgentsPage';
import VideoEditingPage from './pages/VideoEditingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const hideLayout = isAuthPage || isDashboardPage;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] flex flex-col items-center justify-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-10"
        >
          <img src="/logo.png" alt="Chatterify" className="h-12 w-auto object-contain" />
          <span className="logo-rubik text-3xl font-bold text-gray-900 tracking-wide">
            Chatterify
          </span>
        </motion.div>

        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-12 h-12"
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="block w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-900"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="App">
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/web-development" element={<WebDevelopmentPage />} />
        <Route path="/services/chatbot-integration" element={<ChatbotIntegrationPage />} />
        <Route path="/services/voice-agents" element={<VoiceAgentsPage />} />
        <Route path="/services/video-editing" element={<VideoEditingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/team/dipanjan" element={<DipanjanPortfolioPage />} />
        <Route path="/team/rajatava" element={<RajatavaPortfolioPage />} />
        <Route path="/team/saptarshi" element={<SaptarshiPortfolioPage />} />
      </Routes>
      {!hideLayout && <Footer />}
      {!hideLayout && <Chatbot />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
