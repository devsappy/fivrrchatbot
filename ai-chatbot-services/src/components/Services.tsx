import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: '01',
    title: 'Custom Development',
    subtitle: 'Tailored AI Solutions',
    description: 'Build bespoke chatbots designed specifically for your business needs',
    color: 'from-gray-700 to-gray-900'
  },
  {
    id: '02',
    title: 'Integration Services',
    subtitle: 'Seamless Connectivity',
    description: 'Connect AI chatbots with your existing systems and platforms',
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: '03',
    title: 'AI Training',
    subtitle: 'Smart Learning',
    description: 'Train models on your data for accurate, context-aware responses',
    color: 'from-gray-800 to-black'
  },
  {
    id: '04',
    title: 'Support & Maintenance',
    subtitle: '24/7 Assistance',
    description: 'Continuous monitoring, updates, and optimization of your chatbot',
    color: 'from-gray-700 to-gray-900'
  }
];

const Services: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Removed gradient at top - Hero section already handles the transition */}

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] bg-gray-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/50"></div>
            <span className="text-gray-500 uppercase tracking-wider text-sm">What We Offer</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6">
            Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl">
            End-to-end AI chatbot solutions that transform how businesses interact with their customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative"
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <div className="mb-4 sm:mb-0">
                      <span className="text-gray-600 text-sm">{service.id}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">{service.title}</h3>
                      <p className="text-gray-400 mt-1 text-sm md:text-base">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6">
                    {service.description}
                  </p>

                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-white font-medium"
                  >
                    <span>Learn More</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.button>
                </div>

                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/20 via-gray-600/20 to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
              Let's discuss how our AI solutions can help you achieve your goals
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform"
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