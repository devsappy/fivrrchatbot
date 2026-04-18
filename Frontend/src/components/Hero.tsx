import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Grainient from './Grainient';

const WORDS = ['chatbots', 'websites', 'voice agents', 'mobile apps'];

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = window.setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % WORDS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#fafaf7] min-h-[100svh] flex flex-col"
      style={{ zIndex: 1 }}
    >
      {/* Ambient background — subtle grainient + soft glows + paper dot-grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Animated grainient — warm neutrals, present but not loud */}
        <div className="absolute inset-0 opacity-60">
          <Grainient
            color1="#f4e7d1"
            color2="#d9b98a"
            color3="#c4d0e6"
            timeSpeed={0.16}
            colorBalance={1}
            warpStrength={0.9}
            warpFrequency={4}
            warpSpeed={5}
            warpAmplitude={45}
            blendAngle={0}
            blendSoftness={0.1}
            rotationAmount={400}
            noiseScale={2}
            grainAmount={0.08}
            grainScale={2}
            grainAnimated={false}
            contrast={1.35}
            gamma={1}
            saturation={0.85}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>
        {/* Directional color glows on top of grainient */}
        <div className="absolute -top-40 -right-40 w-[55vw] h-[55vw] max-w-[780px] max-h-[780px] rounded-full bg-gradient-to-br from-amber-200/30 via-orange-100/15 to-transparent blur-[120px]" />
        <div className="absolute -bottom-48 -left-40 w-[50vw] h-[50vw] max-w-[720px] max-h-[720px] rounded-full bg-gradient-to-tr from-indigo-100/35 via-sky-50/15 to-transparent blur-[120px]" />
        {/* Paper dot-grid texture — eased back since grainient carries grain */}
        <div className="absolute inset-0 hero-dotgrid opacity-40" />
        {/* Soft fade toward the base color at the bottom for a clean edge */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#fafaf7]" />
      </div>

      {/* Top editorial ribbon */}
      <div className="relative z-10 container mx-auto px-6 pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500"
        >
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-900" aria-hidden />
            Chatterify <span className="hidden sm:inline text-gray-400">— a digital studio</span>
          </span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 container mx-auto px-6 py-10 sm:py-14 lg:py-16 flex flex-col items-center justify-center text-center">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/80 text-[12px] sm:text-[13px] font-medium text-gray-700 mb-8 sm:mb-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Booking projects for Q2 · 2026
        </motion.div>

        {/* Headline */}
        <h1
          className="font-black text-gray-900 leading-[0.96] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.75rem, 8.5vw, 8rem)' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            We build
          </motion.span>
          <span className="block relative h-[1em]" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 text-gray-900 inline-flex justify-center"
              >
                <span className="relative inline-block">
                  {WORDS[currentWord]}
                  <span
                    key={`u-${currentWord}`}
                    aria-hidden
                    className="absolute left-0 right-0 -bottom-[0.06em] h-[0.08em] rounded-full bg-amber-400/90 animate-heroUnderline"
                  />
                </span>
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="sr-only">{WORDS.join(', ')}</span>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="block text-gray-400"
          >
            that people love.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 sm:mt-10 max-w-xl text-base sm:text-lg text-gray-500 leading-relaxed"
        >
          A senior digital studio crafting AI-first websites, chatbots, voice agents and apps. Two-week sprints. No process theater.
        </motion.p>

        {/* CTAs — matched primary & ghost pills for perfect alignment */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-10 sm:mt-12 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/contact')}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-gray-900 text-white text-[15px] font-semibold rounded-full hover:bg-black transition-colors duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_30px_-10px_rgba(15,15,15,0.4)]"
          >
            Start a project
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/templates')}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/60 backdrop-blur-sm border border-gray-900/15 text-gray-900 text-[15px] font-semibold rounded-full hover:bg-white hover:border-gray-900/30 transition-all duration-300"
          >
            View our work
            <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.58 }}
          className="mt-14 sm:mt-16 flex items-center flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] sm:text-[13px] text-gray-500"
        >
          <span>10+ projects shipped</span>
          <span aria-hidden className="text-gray-300 hidden sm:inline">·</span>
          <span className="hidden sm:inline">On-time, every time</span>
        </motion.div>
      </div>

      {/* Bottom editorial ribbon */}
      <div className="relative z-10 container mx-auto px-6 pb-8 sm:pb-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400"
        >
          <motion.span
            aria-hidden
            animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            ↓
          </motion.span>
          Scroll to explore
        </motion.span>
      </div>
    </section>
  );
};

export default Hero;
