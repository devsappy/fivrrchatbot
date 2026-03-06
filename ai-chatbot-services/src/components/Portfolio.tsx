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
    <section id="portfolio" className="py-16 md:py-24 lg:py-32 bg-[#FCFCFC] relative overflow-hidden">
      {/* Background element */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[500px] lg:h-[600px] bg-gray-50 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[200px] md:w-[400px] lg:w-[500px] h-[200px] md:h-[400px] lg:h-[500px] bg-gray-50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className=" mb-20" >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gray-300"></div>
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Our Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Portfolio
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl font-medium">
            Transformative digital solutions that deliver real business impact across industries.
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
              <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 shadow-sm">
                {/* Project Image/Preview */}
                <div className="relative h-64 bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: selectedProject === index ? 1.05 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className="text-gray-400 font-bold text-2xl mb-2 uppercase tracking-wider">{project.category}</div>
                      <div className="text-gray-600 font-medium text-xl">{project.client}</div>
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-gray-400 text-sm font-semibold">{project.id}</span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 font-medium">{project.description}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-lg md:text-2xl font-bold text-gray-900">
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize font-medium">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 md:px-3 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-700 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Case Study Link */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-black hover:text-gray-600 font-semibold transition-colors"
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
        <div className=" mt-12 md:mt-20 grid grid-cols-3 gap-4 md:gap-8 p-6 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm" >
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2 tracking-tight">5+</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">Projects</div>
          </div>
          <div className="text-center border-x border-gray-100">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2 tracking-tight">80%</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2 tracking-tight">50+</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">Users</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;