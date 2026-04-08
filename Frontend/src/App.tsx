import React from 'react';
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
  const { isAuthenticated } = useAuth();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const hideLayout = isAuthPage || isDashboardPage;

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
