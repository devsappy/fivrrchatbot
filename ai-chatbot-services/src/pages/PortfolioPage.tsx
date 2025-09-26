import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PortfolioPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Support Bot',
      category: 'retail',
      client: 'FashionHub',
      image: 'https://via.placeholder.com/400x300',
      description: 'AI chatbot handling 10,000+ customer queries daily',
      results: ['70% reduction in support tickets', '95% customer satisfaction', '24/7 availability'],
      technologies: ['GPT-4', 'React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Healthcare Assistant',
      category: 'healthcare',
      client: 'MedCare Plus',
      image: 'https://via.placeholder.com/400x300',
      description: 'Medical appointment scheduling and symptom checker bot',
      results: ['50% faster appointment booking', '80% accurate symptom analysis', 'HIPAA compliant'],
      technologies: ['Claude AI', 'Vue.js', 'Python', 'PostgreSQL']
    },
    {
      id: 3,
      title: 'Banking Virtual Assistant',
      category: 'finance',
      client: 'SecureBank',
      image: 'https://via.placeholder.com/400x300',
      description: 'Secure banking chatbot for account management',
      results: ['90% query resolution rate', 'PCI DSS compliant', '40% cost reduction'],
      technologies: ['Custom LLM', 'Angular', 'Java', 'Oracle DB']
    },
    {
      id: 4,
      title: 'Education Tutor Bot',
      category: 'education',
      client: 'LearnSmart Academy',
      image: 'https://via.placeholder.com/400x300',
      description: 'Personalized learning assistant for students',
      results: ['30% improvement in grades', '85% student engagement', 'Multi-language support'],
      technologies: ['GPT-3.5', 'React Native', 'Firebase', 'TensorFlow']
    },
    {
      id: 5,
      title: 'Real Estate Assistant',
      category: 'realestate',
      client: 'PropertyPro',
      image: 'https://via.placeholder.com/400x300',
      description: 'Property search and virtual tour scheduling bot',
      results: ['60% more qualified leads', '24/7 property inquiries', 'CRM integration'],
      technologies: ['Groq', 'Next.js', 'Supabase', 'Stripe']
    },
    {
      id: 6,
      title: 'HR Recruitment Bot',
      category: 'corporate',
      client: 'TalentFlow',
      image: 'https://via.placeholder.com/400x300',
      description: 'Automated candidate screening and interview scheduling',
      results: ['75% faster hiring process', '85% candidate satisfaction', 'ATS integration'],
      technologies: ['Claude', 'TypeScript', 'AWS Lambda', 'DynamoDB']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'retail', name: 'Retail' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'finance', name: 'Finance' },
    { id: 'education', name: 'Education' },
    { id: 'realestate', name: 'Real Estate' },
    { id: 'corporate', name: 'Corporate' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our successful AI chatbot implementations across various industries
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-white text-black'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl font-bold text-white uppercase tracking-wider">{project.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{project.client}</p>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Key Results:</h4>
                  <ul className="space-y-1">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's create an AI chatbot that transforms your business
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-lg font-medium transition-all duration-200"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;