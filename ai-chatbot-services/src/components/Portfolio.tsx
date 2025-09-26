import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: '01',
    title: 'E-Commerce Assistant',
    client: 'TechMart',
    category: 'Retail',
    description: 'AI-powered shopping assistant that increased conversion rates by 45%',
    image: '/api/placeholder/800/600',
    tech: ['React', 'Node.js', 'GPT-4'],
    metrics: {
      conversion: '+45%',
      satisfaction: '98%',
      queries: '10K+/day'
    }
  },
  {
    id: '02',
    title: 'Healthcare Companion',
    client: 'MediCare Plus',
    category: 'Healthcare',
    description: 'HIPAA-compliant virtual health assistant serving 50,000+ patients',
    image: '/api/placeholder/800/600',
    tech: ['Vue.js', 'Python', 'Claude AI'],
    metrics: {
      time: '-60%',
      accuracy: '95%',
      patients: '50K+'
    }
  },
  {
    id: '03',
    title: 'Banking Assistant',
    client: 'FinanceFirst',
    category: 'Finance',
    description: 'Secure banking chatbot handling complex financial transactions',
    image: '/api/placeholder/800/600',
    tech: ['Angular', 'Java', 'Custom NLP'],
    metrics: {
      security: '100%',
      uptime: '99.9%',
      transactions: '1M+'
    }
  },
  {
    id: '04',
    title: 'Learning Companion',
    client: 'EduTech Pro',
    category: 'Education',
    description: 'Personalized AI tutor improving student performance by 40%',
    image: '/api/placeholder/800/600',
    tech: ['Next.js', 'FastAPI', 'LangChain'],
    metrics: {
      performance: '+40%',
      engagement: '85%',
      students: '100K+'
    }
  }
];

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-amber-50 via-white to-amber-50 relative overflow-hidden">
      {/* Background gradient with royal gold accents */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[500px] lg:h-[600px] bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[200px] md:w-[400px] lg:w-[500px] h-[200px] md:h-[400px] lg:h-[500px] bg-yellow-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className=" mb-20" >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-600"></div>
            <span className="text-gray-700 uppercase tracking-wider text-sm">Our Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black mb-6">
            Portfolio
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
            Transformative AI solutions that deliver real business impact across industries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className=" group cursor-pointer"
              
              
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
            >
              <div className="relative bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl overflow-hidden hover:bg-white/95 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Project Image/Preview */}
                <div className="relative h-64 bg-gradient-to-br from-amber-600/80 to-yellow-600/80 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: selectedProject === index ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className="text-white font-bold text-2xl mb-2">{project.category}</div>
                      <div className="text-gray-300 font-medium text-xl">{project.client}</div>
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-white/80 text-sm font-medium">{project.id}</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-2">{project.title}</h3>
                  <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">{project.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-lg md:text-2xl font-bold text-black">
                          {value}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 md:px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs text-amber-900 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Case Study Link */}
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium"
                  >
                    <span>View Case Study</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results Section */}
        <div className=" mt-12 md:mt-20 grid grid-cols-3 gap-4 md:gap-8 p-6 md:p-8 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl shadow-xl" >
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1 md:mb-2">5+</div>
            <div className="text-xs md:text-sm text-gray-600">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1 md:mb-2">80%</div>
            <div className="text-xs md:text-sm text-gray-600">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1 md:mb-2">50+</div>
            <div className="text-xs md:text-sm text-gray-600">Users</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;