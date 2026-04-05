import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
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
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
