import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    <section id="home" className="h-screen flex items-center fixed top-0 left-0 right-0 overflow-hidden bg-black" style={{ zIndex: 1 }}>
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source src={`${process.env.PUBLIC_URL}/bgv.mp4`} type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

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
              <span className="text-white">Build </span>
              <motion.span
                key={currentWord}
                initial={{ opacity: shouldReduceMotion || isMobile ? 1 : 0, y: shouldReduceMotion || isMobile ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: shouldReduceMotion || isMobile ? 1 : 0, y: shouldReduceMotion || isMobile ? 0 : -20 }}
                transition={{ duration: shouldReduceMotion || isMobile ? 0 : 0.5 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-size-200 animate-gradient inline-block"
              >
                {words[currentWord]}
              </motion.span>
              <span className="text-white"> Chatbots</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-6">
              Transform your business with cutting-edge conversational AI.
              We create intelligent chatbots that understand, engage, and convert.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 md:mb-16 px-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 text-sm sm:text-base hover:bg-amber-700"
              >
                Get Started
              </motion.button>
            </div>


          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;