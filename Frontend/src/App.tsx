import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AppDevelopmentPage from './pages/AppDevelopmentPage';
import SaasDevelopmentPage from './pages/SaasDevelopmentPage';
import MvpDevelopmentPage from './pages/MvpDevelopmentPage';
import EcommerceDevelopmentPage from './pages/EcommerceDevelopmentPage';
import TemplatesPage from './pages/TemplatesPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/chatbot-integration" element={<ChatbotIntegrationPage />} />
            <Route path="/services/voice-agents" element={<VoiceAgentsPage />} />
            <Route path="/services/video-editing" element={<VideoEditingPage />} />
            <Route path="/services/app-development" element={<AppDevelopmentPage />} />
            <Route path="/services/saas-development" element={<SaasDevelopmentPage />} />
            <Route path="/services/mvp-development" element={<MvpDevelopmentPage />} />
            <Route path="/services/ecommerce-development" element={<EcommerceDevelopmentPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/team/dipanjan" element={<DipanjanPortfolioPage />} />
            <Route path="/team/rajatava" element={<RajatavaPortfolioPage />} />
            <Route path="/team/saptarshi" element={<SaptarshiPortfolioPage />} />
          </Routes>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
