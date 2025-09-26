import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedChatBackground: React.FC = () => {
  // Generate chat bubbles with fixed positions - using useMemo to prevent regeneration
  const chatBubbles = useMemo(() => {
    // Predefined mixed positions for a more organic look
    const positions = [
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
      { x: 50, y: 40 },
      { x: 12, y: 35 },
      { x: 88, y: 80 },
      { x: 42, y: 55 },
      { x: 72, y: 20 },
      { x: 28, y: 25 },
      { x: 58, y: 30 },
      { x: 18, y: 55 },
    ];

    return positions.map((pos, index) => ({
      id: index,
      x: pos.x,
      y: pos.y,
      size: 60 + (index % 3) * 20, // Varied sizes: 60, 80, or 100px
      floatDelay: (index * 0.3) % 4, // Staggered delays
      floatDuration: 4 + (index % 3), // 4-6 seconds
      opacity: 0.3 + (index % 3) * 0.1, // 0.3 to 0.5 for softer appearance
    }));
  }, []); // Empty dependency array ensures this only runs once

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
      style={{ filter: 'blur(0.5px) drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))' }}
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
      style={{ filter: 'blur(0.5px) drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))' }}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="13" y2="14" />
    </svg>
  );

  const DotsIcon = ({ size }: { size: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      style={{ filter: 'blur(0.5px) drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))' }}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="8" cy="12" r="2.5" fill="#000000" />
      <circle cx="12" cy="12" r="2.5" fill="#000000" />
      <circle cx="16" cy="12" r="2.5" fill="#000000" />
    </svg>
  );

  const icons = [ChatIcon, MessageIcon, DotsIcon];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Royal gold/white gradient background matching Portfolio section */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50" />

      {/* Animated gradient mesh with gold tones */}
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

      {/* Fixed position floating chat bubbles */}
      <div className="absolute inset-0">
        {chatBubbles.map((bubble) => {
          const IconComponent = icons[bubble.id % icons.length];
          return (
            <motion.div
              key={bubble.id}
              className="absolute text-white pointer-events-none"
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
                y: [0, -15, 0], // Floating effect
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
              <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: bubble.floatDuration * 1.5,
                  delay: bubble.floatDelay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <IconComponent size={bubble.size} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Network lines connecting chat bubbles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.2)" />
            <stop offset="50%" stopColor="rgba(251,191,36,0.4)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0.2)" />
          </linearGradient>
        </defs>

        {/* Static connection lines between specific points */}
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
        <motion.line
          x1="70%" y1="35%" x2="55%" y2="65%"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.line
          x1="25%" y1="45%" x2="75%" y2="75%"
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            delay: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {/* Glowing orbs for depth with gold tones */}
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
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-200/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 6,
          delay: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default AnimatedChatBackground;