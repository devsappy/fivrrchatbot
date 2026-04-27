import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import HeroCanvas from './HeroCanvas';
import HeroMessages from './HeroMessages';

const WORDS = ['chatbots', 'websites', 'voice agents', 'mobile apps'];

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Typewriter timing
const TYPE_MS = 95;
const DELETE_MS = 45;
const HOLD_MS = 1600;
const GAP_MS = 350;

const LineReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => (
  <span className={`block overflow-hidden ${className ?? ''}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: '110%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.span>
  </span>
);

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting' | 'gap'>('typing');
  const magneticRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(WORDS[wordIdx]);
      return;
    }
    const word = WORDS[wordIdx];
    let timeout: number;

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, TYPE_MS + Math.random() * 50);
      } else {
        timeout = window.setTimeout(() => setPhase('holding'), 40);
      }
    } else if (phase === 'holding') {
      timeout = window.setTimeout(() => setPhase('deleting'), HOLD_MS);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length - 1));
        }, DELETE_MS);
      } else {
        timeout = window.setTimeout(() => setPhase('gap'), 10);
      }
    } else if (phase === 'gap') {
      timeout = window.setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length);
        setPhase('typing');
      }, GAP_MS);
    }

    return () => window.clearTimeout(timeout);
  }, [displayed, phase, wordIdx, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = magneticRef.current;
    if (!el) return;

    const strength = 18;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(relX, relY);
      const radius = Math.max(rect.width, rect.height) * 1.1;
      if (dist < radius) {
        const k = 1 - dist / radius;
        el.style.transform = `translate(${(relX / radius) * strength * k}px, ${
          (relY / radius) * strength * k
        }px)`;
      } else {
        el.style.transform = 'translate(0,0)';
      }
    };
    const onLeave = () => {
      el.style.transform = 'translate(0,0)';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#fafaf7] min-h-[100svh] flex flex-col"
      style={{ zIndex: 1 }}
    >
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-[#fafaf7]">
        <div className="absolute top-0 inset-x-0 h-[70vh] bg-gradient-to-b from-white to-transparent opacity-90" />
      </div>

      {/* Grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.06]"
        style={{
          zIndex: 2,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: '160px 160px',
        }}
      />

      {/* Main content — two columns on lg+ */}
      <div className="relative z-10 flex-1 container mx-auto px-6 pt-28 sm:pt-36 lg:pt-44 pb-8 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center h-full">
          {/* LEFT — text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
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
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
            >
              <LineReveal delay={0.05}>We build</LineReveal>

              <span className="block relative h-[1em]" aria-hidden="true">
                <span className="absolute left-0 top-0 inline-flex items-center text-gray-900">
                  <span className="whitespace-pre">{displayed}</span>
                  <motion.span
                    aria-hidden
                    animate={shouldReduceMotion ? undefined : { opacity: [1, 1, 0, 0] }}
                    transition={{
                      duration: 0.95,
                      repeat: Infinity,
                      ease: 'linear',
                      times: [0, 0.5, 0.5, 1],
                    }}
                    className="ml-[0.06em] inline-block align-middle rounded-[2px] bg-amber-400"
                    style={{
                      width: '0.055em',
                      height: '0.82em',
                      boxShadow: '0 0 12px rgba(245,158,11,0.55)',
                    }}
                  />
                </span>
              </span>
              <span className="sr-only">{WORDS.join(', ')}</span>

              <LineReveal delay={0.18}>
                <span className="text-gray-400">that people love.</span>
              </LineReveal>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 sm:mt-10 max-w-xl text-base sm:text-lg text-gray-500 leading-relaxed"
            >
              A senior digital studio crafting AI-first websites, chatbots, voice agents and apps. Two-week sprints. No process theater.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68 }}
              className="mt-10 sm:mt-12 w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <motion.button
                ref={magneticRef}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-gray-900 text-white text-[15px] font-semibold rounded-full hover:bg-black transition-colors duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_12px_30px_-10px_rgba(15,15,15,0.45)] will-change-transform"
                style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), background-color 0.3s' }}
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" aria-hidden />
                <span className="relative">Start a project</span>
                <ArrowRightIcon className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
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
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-14 sm:mt-16 flex flex-col items-start text-left gap-3"
            >
              <div className="text-[14px] sm:text-[15px] font-medium text-gray-600">
                Trusted by <span className="font-semibold text-gray-900">120+</span> users
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3" aria-hidden="true">
                  <img className="w-10 h-10 rounded-full border-[2.5px] border-[#fafaf7] object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                  <img className="w-10 h-10 rounded-full border-[2.5px] border-[#fafaf7] object-cover shadow-sm" src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                  <img className="w-10 h-10 rounded-full border-[2.5px] border-[#fafaf7] object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/46.jpg" alt="" />
                  <img className="w-10 h-10 rounded-full border-[2.5px] border-[#fafaf7] object-cover shadow-sm" src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />
                  <img className="w-10 h-10 rounded-full border-[2.5px] border-[#fafaf7] object-cover shadow-sm" src="https://randomuser.me/api/portraits/men/85.jpg" alt="" />
                </div>
                <div className="flex gap-1 text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Three.js orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT }}
            className="lg:col-span-5 relative w-full aspect-square max-w-[22rem] sm:max-w-[24rem] md:max-w-[27rem] lg:max-w-[32rem] xl:max-w-[35rem] mx-auto lg:mx-0 lg:ml-auto"
          >
            {/* Amber glow behind orb */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(245,158,11,0.22), rgba(245,158,11,0.05) 55%, transparent 75%)',
              }}
            />
            <HeroCanvas reducedMotion={shouldReduceMotion} />
            <HeroMessages />
          </motion.div>
        </div>
      </div>

      {/* Bottom editorial ribbon */}
      <div className="relative z-10 container mx-auto px-6 pb-8 sm:pb-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
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
