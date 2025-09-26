import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedChatBackground from './AnimatedChatBackground';
import useMobileDetect from '../hooks/useMobileDetect';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { isMobile } = useMobileDetect();
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Intelligent', 'Conversational', 'Powerful', 'Custom'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section id="home" className="h-screen flex items-center relative overflow-hidden">
      {/* Animated Chat Background */}
      <AnimatedChatBackground />

      <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion || isMobile ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion || isMobile ? 0.3 : 0.8 }}
            className="p-8 md:p-12 lg:p-16"
          >
            {/* Main heading with animated words */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 px-4 whitespace-nowrap">
              <span className="text-black">Build </span>
              <motion.span
                key={currentWord}
                initial={{ opacity: shouldReduceMotion || isMobile ? 1 : 0, y: shouldReduceMotion || isMobile ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: shouldReduceMotion || isMobile ? 1 : 0, y: shouldReduceMotion || isMobile ? 0 : -20 }}
                transition={{ duration: shouldReduceMotion || isMobile ? 0 : 0.5 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-size-200 animate-gradient inline-block"
              >
                {words[currentWord]}
              </motion.span>
              <span className="text-black"> Chatbots</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-6">
              Transform your business with cutting-edge conversational AI.
              We create intelligent chatbots that understand, engage, and convert.
            </p>

            {/* CTA Buttons matching Portfolio style */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 md:mb-16 px-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 text-sm sm:text-base hover:bg-amber-700"
              >
                Get Started
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/portfolio')}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full text-amber-900 font-semibold hover:bg-white/90 transition-all duration-300 text-sm sm:text-base"
              >
                View Our Work
              </motion.button>
            </div>


          </motion.div>

        </div>
      </div>

      {/* Gradient at bottom for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;