import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type Slot = {
  // Tailwind classes for position — flush to orb on mobile, floaty on lg+
  positionClass: string;
  side: 'left' | 'right';
  delay: number;
  // Hide on very small screens to reduce clutter
  hideBelow?: 'sm';
};

const SLOTS: Slot[] = [
  { positionClass: 'top-[2%] left-0 lg:-left-[10%]',    side: 'left',  delay: 0.8 },
  { positionClass: 'top-[14%] right-0 lg:-right-[8%]',  side: 'right', delay: 1.4, hideBelow: 'sm' },
  { positionClass: 'bottom-[22%] left-0 lg:-left-[12%]', side: 'left', delay: 2.0, hideBelow: 'sm' },
  { positionClass: 'bottom-[6%] right-0 lg:-right-[4%]', side: 'right', delay: 2.6 },
];

type Msg = { text: string; avatar: string; name: string };

const MESSAGES: Msg[] = [
  { text: 'wish my site loaded like this', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Ava' },
  { text: "why can't ours feel like this", avatar: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'Jai' },
  { text: 'this is art, not code ✨',       avatar: 'https://randomuser.me/api/portraits/women/68.jpg', name: 'Mia' },
  { text: 'finally — a form that works',   avatar: 'https://randomuser.me/api/portraits/men/46.jpg', name: 'Leo' },
  { text: 'imagine owning this',           avatar: 'https://randomuser.me/api/portraits/women/26.jpg', name: 'Zoe' },
  { text: '0ms feels illegal',             avatar: 'https://randomuser.me/api/portraits/men/85.jpg', name: 'Kai' },
  { text: 'no cookie banner. bliss.',      avatar: 'https://randomuser.me/api/portraits/women/12.jpg', name: 'Noa' },
  { text: 'can they build mine?',          avatar: 'https://randomuser.me/api/portraits/men/71.jpg', name: 'Ben' },
  { text: 'buttery checkout',              avatar: 'https://randomuser.me/api/portraits/women/5.jpg',  name: 'Rae' },
  { text: "what's their stack?",           avatar: 'https://randomuser.me/api/portraits/men/18.jpg', name: 'Dev' },
  { text: 'scrolling just to scroll',      avatar: 'https://randomuser.me/api/portraits/women/90.jpg', name: 'Ivy' },
  { text: 'we needed this yesterday',      avatar: 'https://randomuser.me/api/portraits/men/54.jpg', name: 'Max' },
];

const CYCLE_MS = 3600;
const SLOT_OFFSET_MS = 900;

const pickMessage = (slotIdx: number, tick: number): Msg => {
  const offset = slotIdx * 3 + tick * SLOTS.length;
  return MESSAGES[offset % MESSAGES.length];
};

const HeroMessages: React.FC = () => {
  const reduce = useReducedMotion() ?? false;
  const [ticks, setTicks] = useState<number[]>(() => SLOTS.map(() => 0));

  useEffect(() => {
    if (reduce) return;
    const timeouts: number[] = [];
    const intervals: number[] = [];
    SLOTS.forEach((_, i) => {
      const to = window.setTimeout(() => {
        const iv = window.setInterval(() => {
          setTicks((prev) => {
            const next = prev.slice();
            next[i] = next[i] + 1;
            return next;
          });
        }, CYCLE_MS);
        intervals.push(iv);
      }, i * SLOT_OFFSET_MS);
      timeouts.push(to);
    });
    return () => {
      timeouts.forEach((t) => window.clearTimeout(t));
      intervals.forEach((i) => window.clearInterval(i));
    };
  }, [reduce]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {SLOTS.map((slot, i) => {
        const msg = pickMessage(i, ticks[i]);
        const reversed = slot.side === 'right';
        const hideCls = slot.hideBelow === 'sm' ? 'hidden sm:block' : '';
        return (
          <div
            key={i}
            className={`absolute ${slot.positionClass} ${hideCls}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={msg.text + i}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: ticks[i] === 0 ? slot.delay : 0,
                }}
                className="will-change-transform"
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -4, 0] }}
                  transition={{
                    duration: 4 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={[
                    'flex items-end gap-1.5 sm:gap-2',
                    reversed ? 'flex-row-reverse' : '',
                  ].join(' ')}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={msg.avatar}
                      alt=""
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border-[2px] border-[#fafaf7] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_-10px_rgba(15,15,15,0.3)]"
                      draggable={false}
                      loading="lazy"
                    />
                    {/* online dot */}
                    <span
                      className={[
                        'absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 border-[2px] border-[#fafaf7]',
                        reversed ? '-left-0.5 -bottom-0.5' : '-right-0.5 -bottom-0.5',
                      ].join(' ')}
                    />
                  </div>

                  {/* Bubble */}
                  <div
                    className={[
                      'relative select-none whitespace-nowrap',
                      'px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl',
                      'bg-white/95 backdrop-blur-sm',
                      'border border-gray-900/10',
                      'text-[11px] sm:text-[12.5px] font-medium text-gray-800',
                      'shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_24px_-12px_rgba(15,15,15,0.25)]',
                      // tail pointing toward avatar
                      'after:content-[""] after:absolute after:w-2 after:h-2 sm:after:w-2.5 sm:after:h-2.5',
                      'after:bg-white/95 after:border after:border-gray-900/10',
                      'after:rotate-45 after:-bottom-1',
                      reversed ? 'after:right-3 rounded-br-sm' : 'after:left-3 rounded-bl-sm',
                    ].join(' ')}
                  >
                    <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400 leading-none mb-0.5 sm:mb-1">
                      {msg.name}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default HeroMessages;
