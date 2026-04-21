import React, { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { blogPosts } from '../data/blogPosts';
import { projects } from '../data/templates';

interface TemplateSample {
  title: string;
  url: string;
}

const templateSamples: TemplateSample[] = projects
  .slice(0, 3)
  .map(({ title, url }) => ({ title, url }));

const Explore: React.FC = () => {
  const [activeSample, setActiveSample] = useState<TemplateSample | null>(null);
  const featuredPosts = blogPosts.slice(0, 3);

  // useLayoutEffect (not useEffect) so the event fires BEFORE paint. Otherwise
  // there's a 1-frame gap where the modal is already on screen but the Header
  // hasn't been told to hide yet — visible as a pill nav that flashes then
  // slides up once the modal is already covering the page.
  useLayoutEffect(() => {
    document.body.style.overflow = activeSample ? 'hidden' : '';
    window.dispatchEvent(new CustomEvent('preview-modal-toggle', { detail: { open: Boolean(activeSample) } }));
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('preview-modal-toggle', { detail: { open: false } }));
    };
  }, [activeSample]);

  return (
    <section className="py-20 bg-[#FCFCFC] relative" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 mb-6 font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Explore
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Our projects &<br />latest insights
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            A quick look at what we build and what we write about.
          </p>
        </motion.div>

        {/* Templates Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Our Templates
            </h3>
            <Link
              to="/templates"
              onClick={() => window.scrollTo(0, 0)}
              className="hidden md:inline-flex items-center gap-2 text-gray-700 hover:text-black font-semibold text-sm transition-colors"
            >
              View all <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6 pb-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {templateSamples.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setActiveSample(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveSample(item);
                }}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 shadow-sm cursor-pointer flex flex-col flex-shrink-0 w-[78%] max-w-[300px] snap-start md:w-auto md:max-w-none md:flex-shrink"
              >
                <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                  <iframe
                    src={item.url}
                    title={item.title}
                    className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-0"
                    loading="lazy"
                    tabIndex={-1}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-semibold text-xs shadow-lg">
                      <EyeIcon className="w-4 h-4" /> Preview
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3 md:px-5 md:py-4">
                  <span className="text-sm md:text-base font-semibold text-gray-900">{item.title}</span>
                </div>
              </motion.div>
            ))}

            {/* View all card — dark theme on mobile, dashed on desktop */}
            <Link
              to="/templates"
              onClick={() => window.scrollTo(0, 0)}
              className="group rounded-2xl flex items-center justify-center p-8 transition-all duration-300 flex-shrink-0 w-[78%] max-w-[300px] snap-start md:w-auto md:max-w-none md:flex-shrink bg-gray-900 text-white md:bg-white md:text-gray-900 md:border md:border-dashed md:border-gray-300 md:hover:border-black md:hover:bg-gray-50 md:hover:-translate-y-1 min-h-[220px]"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white text-gray-900 md:bg-gray-900 md:text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
                <span className="font-semibold">View all templates</span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Blog Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Latest blog posts
            </h3>
            <Link
              to="/blog"
              onClick={() => window.scrollTo(0, 0)}
              className="hidden md:inline-flex items-center gap-2 text-gray-700 hover:text-black font-semibold text-sm transition-colors"
            >
              View all <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6 pb-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex-shrink-0 w-[78%] max-w-[300px] snap-start md:w-auto md:max-w-none md:flex-shrink"
              >
                <Link
                  to={`/blog/${post.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group block h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2 md:mb-3 font-medium">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h4 className="text-sm md:text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
                      {post.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* View all card */}
            <Link
              to="/blog"
              onClick={() => window.scrollTo(0, 0)}
              className="group rounded-2xl flex items-center justify-center p-8 transition-all duration-300 flex-shrink-0 w-[78%] max-w-[300px] snap-start md:w-auto md:max-w-none md:flex-shrink bg-gray-900 text-white md:bg-white md:text-gray-900 md:border md:border-dashed md:border-gray-300 md:hover:border-black md:hover:bg-gray-50 md:hover:-translate-y-1 min-h-[220px]"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white text-gray-900 md:bg-gray-900 md:text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
                <span className="font-semibold">View all articles</span>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {activeSample && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSample(null)}
            className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">{activeSample.title}</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={activeSample.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" /> Open
                  </a>
                  <button
                    onClick={() => setActiveSample(null)}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                    aria-label="Close preview"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-50">
                <iframe
                  src={activeSample.url}
                  title={activeSample.title}
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Explore;
