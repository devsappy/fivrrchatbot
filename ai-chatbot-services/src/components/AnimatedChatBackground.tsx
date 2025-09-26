import React, { useMemo, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AnimatedChatBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce number of bubbles on mobile for better performance
  const chatBubbles = useMemo(() => {
    const positions = isMobile ? [
      // Only 8 bubbles on mobile
      { x: 15, y: 20 },
      { x: 85, y: 15 },
      { x: 45, y: 40 },
      { x: 70, y: 70 },
      { x: 25, y: 65 },
      { x: 60, y: 30 },
      { x: 30, y: 85 },
      { x: 75, y: 50 },
    ] : [
      // Full set for desktop
      { x: 15, y: 20 },
      { x: 85, y: 15 },
      { x: 45, y: 10 },
      { x: 70, y: 35 },
      { x: 25, y: 45 },
      { x: 90, y: 50 },
      { x: 10, y: 70 },
      { x: 55, y: 65 },
      { x: 35, y: 80 },
      { x: 75, y: 75 },
      { x: 20, y: 90 },
      { x: 60, y: 85 },
      { x: 40, y: 30 },
      { x: 80, y: 60 },
      { x: 30, y: 60 },
      { x: 65, y: 50 },
    ];

    return positions.map((pos, index) => ({
      id: index,
      x: pos.x,
      y: pos.y,
      size: isMobile ? 40 + (index % 2) * 20 : 60 + (index % 3) * 20,
      floatDelay: (index * 0.3) % 4,
      floatDuration: isMobile ? 6 + (index % 2) : 4 + (index % 3),
      opacity: isMobile ? 0.2 : 0.3 + (index % 3) * 0.1,
    }));
  }, [isMobile]);

  const ChatIcon = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: isMobile ? 'none' : 'blur(0.5px) drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))' }}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );

  const MessageIcon = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: isMobile ? 'none' : 'blur(0.5px) drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))' }}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="13" y2="14" />
    </svg>
  );

  const icons = [ChatIcon, MessageIcon];

  // Simplified version for mobile or reduced motion
  if (shouldReduceMotion || isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50" />

        {/* Static or simplified bubbles for mobile */}
        <div className="absolute inset-0">
          {chatBubbles.map((bubble) => {
            const IconComponent = icons[bubble.id % icons.length];
            return (
              <div
                key={bubble.id}
                className="absolute text-white pointer-events-none"
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  transform: 'translate(-50%, -50%)',
                  opacity: bubble.opacity,
                }}
              >
                <IconComponent size={bubble.size} />
              </div>
            );
          })}
        </div>

        {/* Simple gradient orb without animation */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200/10 rounded-full filter blur-3xl" />
      </div>
    );
  }

  // Full animations for desktop
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50" />

      {/* Animated gradient mesh - only on desktop */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating chat bubbles with animations */}
      <div className="absolute inset-0">
        {chatBubbles.map((bubble) => {
          const IconComponent = icons[bubble.id % icons.length];
          return (
            <motion.div
              key={bubble.id}
              className="absolute text-white pointer-events-none will-change-transform"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: bubble.opacity,
                scale: 1,
                y: [0, -15, 0],
              }}
              transition={{
                opacity: {
                  duration: 2,
                  delay: bubble.id * 0.1,
                },
                scale: {
                  duration: 1,
                  delay: bubble.id * 0.1,
                  ease: 'backOut',
                },
                y: {
                  duration: bubble.floatDuration,
                  delay: bubble.floatDelay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <IconComponent size={bubble.size} />
            </motion.div>
          );
        })}
      </div>

      {/* Network lines - only on desktop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.2)" />
            <stop offset="50%" stopColor="rgba(251,191,36,0.4)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0.2)" />
          </linearGradient>
        </defs>

        <motion.line
          x1="15%" y1="20%" x2="45%" y2="10%"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Single glowing orb for depth */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default AnimatedChatBackground;