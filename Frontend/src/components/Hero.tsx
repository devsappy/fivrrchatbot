import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useMobileDetect from '../hooks/useMobileDetect';
import Grainient from './Grainient';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { isMobile } = useMobileDetect();
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Intelligent', 'Powerful', 'Custom'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section id="home" className="min-h-[100svh] pt-32 pb-16 flex flex-col justify-center relative overflow-hidden bg-white" style={{ zIndex: 1 }}>
      {/* Animated Abstract Grainient Background */}
      <div className="absolute inset-0 w-full h-full opacity-60">
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
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-5xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion || isMobile ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion || isMobile ? 0.3 : 0.8 }}
            className="p-4 sm:p-8 md:p-12 lg:p-16"
          >
            {/* Main heading with animated words */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black mb-8 px-4 tracking-tight break-words">
              <span className="text-gray-900">Build </span>
              <motion.span
                key={currentWord}
                initial={{ opacity: shouldReduceMotion || isMobile ? 1 : 0, y: shouldReduceMotion || isMobile ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: shouldReduceMotion || isMobile ? 1 : 0, y: shouldReduceMotion || isMobile ? 0 : -20 }}
                transition={{ duration: shouldReduceMotion || isMobile ? 0 : 0.5 }}
                className="text-black inline-block"
              >
                {words[currentWord]}
              </motion.span>
              <br />
              <span className="text-gray-500"> Digital Solutions.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-500 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-6 font-medium tracking-wide">
              Transform your business with cutting-edge modern development.
              We create products that understand, engage, and convert.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 md:mb-16 px-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/contact')}
                className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-black text-white font-medium rounded-full overflow-hidden transition-all duration-300 text-sm sm:text-base hover:bg-gray-800 shadow-xl"
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