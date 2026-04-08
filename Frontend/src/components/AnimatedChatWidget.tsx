import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMobileDetect from '../hooks/useMobileDetect';

const conversations = [
  {
    user: "Can you build a custom full-stack web application for our business?",
    ai: "Yes! We design and develop complete web applications, handling everything from stunning frontends to robust backend databases."
  },
  {
    user: "How can your AI Chatbots help automate our customer support?",
    ai: "Our intelligent chatbots integrate natively into your platforms to automate support, qualify leads, and handle inquiries 24/7."
  },
  {
    user: "Do you develop AI Voice Agents to handle our inbound phone calls?",
    ai: "Absolutely! We build smart voice automation systems and AI assistants that sound completely natural and scale your operations effortlessly."
  },
  {
    user: "Can you help edit promotional videos for our social media channels?",
    ai: "Yes! We provide professional video editing for marketing, social media, and YouTube content to ensure your brand stands out."
  }
];

const AnimatedChatWidget: React.FC = () => {
  const [convIndex, setConvIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [latency, setLatency] = useState(12);

  // Dynamic latency ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 15) + 8); // Random latency between 8 and 22ms
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Conversation Loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const runSequence = async () => {
      setStep(0); // clear
      timeout = setTimeout(() => setStep(1), 500); // User shows
      timeout = setTimeout(() => setStep(2), 2000); // AI thinking
      timeout = setTimeout(() => setStep(3), 4000); // AI response
      timeout = setTimeout(() => {
        setConvIndex((prev) => (prev + 1) % conversations.length);
        runSequence();
      }, 9000); // Next after 5s
    };

    runSequence();

    return () => clearTimeout(timeout);
  }, [convIndex]);

  const currentConv = conversations[convIndex];
  const { isMobile } = useMobileDetect();

  return (
    <motion.div 
      animate={isMobile ? {} : { y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className="w-full relative group"
    >
      {/* Decorative ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-[24px] blur opacity-50 group-hover:opacity-100 transition duration-1000 -z-10"></div>
      
      {/* Top Models Pills */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full border border-black bg-black text-white text-sm font-medium shadow-sm overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '200%'] }} 
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
          <div className="w-1.5 h-1.5 rounded-full bg-[#5227FF] animate-pulse relative z-10"></div>
          <span className="relative z-10">Chatterify</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-md text-gray-500 text-sm font-medium shadow-sm transition-colors duration-500">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 rounded-full bg-gray-400"
          ></motion.div>
          Analyzing
        </div>
      </div>

      {/* Main Chat Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 font-sans relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white/80">
          <span className="text-gray-900 font-bold text-[15px] flex items-center gap-2">
            <svg className="w-4 h-4 text-black animate-[spin_4s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5l-10 14M22 12H2M6.5 4.5l11 15" />
            </svg>
            System Active
          </span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5227FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5227FF]"></span>
            </span>
            <span className="text-[#5227FF] text-xs font-mono tracking-wider uppercase font-bold">live computing</span>
          </div>
        </div>
        
        {/* Chat Content */}
        <div className="p-6 space-y-6 min-h-[260px] relative">
          {/* Subtle scanning background line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0 pointer-events-none"
          />

          {/* User Message */}
          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div 
                key={`user-${convIndex}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-end relative z-10"
              >
                <div className="bg-gray-100 text-gray-900 border border-gray-200 px-5 py-4 rounded-[20px] rounded-tr-sm max-w-[85%] text-[14px] md:text-[15px] leading-relaxed shadow-sm font-medium">
                  {currentConv.user}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* AI Response Container */}
          <div className="flex items-start gap-4 relative z-10">
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-8 h-8 rounded-full border-none bg-black text-white flex items-center justify-center flex-shrink-0 mt-1 shadow-md relative"
                >
                  {/* AI glowing ring active while thinking */}
                  {step === 2 && (
                    <motion.div 
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full border border-black"
                    />
                  )}
                  <span className="text-white text-[10px] font-bold tracking-widest">AI</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {step === 2 && (
                <motion.div 
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-transparent border border-gray-100 px-5 py-4 rounded-[20px] rounded-tl-sm flex items-center gap-1.5 mt-1"
                >
                  <motion.div className="w-1.5 h-1.5 bg-[#5227FF]/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                  <motion.div className="w-1.5 h-1.5 bg-[#5227FF]/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                  <motion.div className="w-1.5 h-1.5 bg-[#5227FF]/60 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div 
                  key={`ai-${convIndex}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-transparent border border-gray-100 text-gray-700 px-5 py-4 rounded-[20px] rounded-tl-sm max-w-[90%] text-[14px] md:text-[15px] leading-relaxed relative mt-1"
                >
                  <p className="font-medium">
                    {currentConv.ai.split(' ').map((word, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: i * 0.05 }}
                        className="inline-block mr-1"
                      >
                        {word.match(/complete|frontends|robust|intelligent|automate|24\/7|smart|natural|effortlessly|professional|marketing/i) ? (
                          <span className="text-black font-bold">{word}</span>
                        ) : word}
                      </motion.span>
                    ))}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="bg-gray-50/80 backdrop-blur-md px-6 py-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium tracking-wide uppercase">
             <motion.svg 
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
               className="w-3.5 h-3.5 text-gray-400" 
               fill="none" viewBox="0 0 24 24" stroke="currentColor"
             >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </motion.svg>
             <span>Telemetry Active <span className="text-gray-300 mx-1">|</span> v2.4</span>
          </div>
          <div className="text-[11px] font-mono font-bold">
            <span className="text-gray-400 tracking-wider">LATENCY:</span> <span className="text-gray-900">{latency}ms</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedChatWidget;
