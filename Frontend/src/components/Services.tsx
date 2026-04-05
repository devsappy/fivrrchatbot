import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: '01',
    title: 'Web Development (Full Stack)',
    subtitle: 'End-to-end Solutions',
    description: 'Designing and developing complete web applications including frontend, backend, databases, and deployment.',
    color: 'from-gray-700 to-gray-900',
    link: '/services/web-development'
  },
  {
    id: '02',
    title: 'Chatbot Integration',
    subtitle: 'Automated Support',
    description: 'Building intelligent chatbots for websites and platforms to automate customer support and engagement.',
    color: 'from-gray-600 to-gray-800',
    link: '/services/chatbot-integration'
  },
  {
    id: '03',
    title: 'Voice Agents',
    subtitle: 'AI-Powered Voice Automation',
    description: 'Developing AI-powered voice assistants and voice automation systems for businesses.',
    color: 'from-gray-800 to-black',
    link: '/services/voice-agents'
  },
  {
    id: '04',
    title: 'Video Editing',
    subtitle: 'Professional Content Creation',
    description: 'Professional video editing for marketing, social media, YouTube, and promotional content.',
    color: 'from-gray-700 to-gray-900',
    link: '/services/video-editing'
  }
];

const Services: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden" style={{ zIndex: 10 }}>
      {/* Background elements minimal */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gray-300"></div>
            <span className="text-gray-500 uppercase tracking-wider text-sm font-semibold">What We Offer</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl font-medium">
            End-to-end digital solutions that transform how businesses operate and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative"
            >
              <div className="relative bg-[#FCFCFC] border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <div className="mb-4 sm:mb-0">
                      <span className="text-gray-400 text-sm font-semibold tracking-wider">{service.id}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{service.title}</h3>
                      <p className="text-gray-500 mt-1 text-sm md:text-base font-medium">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => navigate(service.link)}
                    className="flex items-center gap-2 text-black font-semibold"
                  >
                    <span>Learn More</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section minimal */}
        <div className="mt-24 text-center">
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 md:p-14 max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-600 mb-8 md:mb-10 text-base md:text-lg max-w-2xl mx-auto">
              Let's discuss how our solutions can help you achieve your goals
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 transform shadow-lg"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;