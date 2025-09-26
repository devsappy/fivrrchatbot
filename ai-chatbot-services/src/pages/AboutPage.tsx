import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Rajatava Ghosh',
      role: 'CEO & Founder',
      bio: 'Expert in AI/ML',
      icon: ''
    },
    {
      name: 'Saptarshi Chattopadhyay',
      role: 'CTO & Lead Developer',
      bio: 'Web Development Specialist',
      icon: ''
    },
    {
      name: 'Tuhin Basu',
      role: 'Head of Operations',
      bio: 'Project Management Expert',
      icon: ''
    }
  ];

  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'Started with a vision to democratize AI' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're on a mission to revolutionize customer interactions through intelligent AI chatbots
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              To empower businesses of all sizes with intelligent, accessible, and affordable AI chatbot solutions
              that enhance customer experiences and drive growth.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Democratize AI technology</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Deliver exceptional customer experiences</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Foster innovation and continuous improvement</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 mb-4">
              To become the global leader in AI chatbot solutions, creating a world where every business
              can leverage the power of conversational AI to better serve their customers.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Lead industry innovation</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Set new standards for AI ethics</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Build lasting partnerships</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-gray-300 font-medium mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-5xl font-bold text-white mb-2">5+</h3>
              <p className="text-xl text-gray-300">Projects Completed</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-5xl font-bold text-white mb-2">80%</h3>
              <p className="text-xl text-gray-300">Client Satisfaction</p>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="text-5xl font-bold text-white mb-2">50+</h3>
              <p className="text-xl text-gray-300">Active Users</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-8"
              >
                <div className="text-2xl font-bold text-gray-300 w-24">{milestone.year}</div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">01</div>
            <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
            <p className="text-gray-300">
              Committed to delivering the highest quality solutions
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">02</div>
            <h3 className="text-xl font-bold text-white mb-2">Integrity</h3>
            <p className="text-gray-300">
              Building trust through transparency and honesty
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4">03</div>
            <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
            <p className="text-gray-300">
              Pushing boundaries with cutting-edge technology
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's build the future of customer interactions together
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;