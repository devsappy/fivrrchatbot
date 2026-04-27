import React, { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { projects, categories, type Project } from '../data/templates';
import SEO, { pageSEO } from '../components/SEO';

const TemplatesPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  // useLayoutEffect: fires before paint so Header's hiddenByModal state flips
  // in the same frame the modal appears — no one-frame gap where the pill
  // nav is still visible on top of the opening modal.
  useLayoutEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    window.dispatchEvent(new CustomEvent('preview-modal-toggle', { detail: { open: Boolean(activeProject) } }));
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('preview-modal-toggle', { detail: { open: false } }));
    };
  }, [activeProject]);

  const openPreview = (project: Project) => setActiveProject(project);
  const closePreview = () => setActiveProject(null);

  return (
    <div className="min-h-screen pt-20 bg-[#FCFCFC] text-gray-900">
      <SEO {...pageSEO.templates} />
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 mb-6 font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Our Work
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Projects we've<br />built & delivered
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Real projects, real results. Click on any project to see the live website in action.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Showcase grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => openPreview(project)}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 shadow-sm cursor-pointer flex flex-col"
            >
              {/* Iframe preview */}
              <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                <iframe
                  src={project.url}
                  title={project.title}
                  className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none border-0"
                  loading="lazy"
                  tabIndex={-1}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full font-semibold text-sm shadow-lg">
                    <EyeIcon className="w-4 h-4" /> Preview
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-medium">No projects in this category yet.</div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
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
                <h3 className="text-lg font-bold text-gray-900">{activeProject.title}</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-300"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" /> Open
                  </a>
                  <button
                    onClick={closePreview}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
                    aria-label="Close preview"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-gray-50">
                <iframe
                  src={activeProject.url}
                  title={activeProject.title}
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplatesPage;
