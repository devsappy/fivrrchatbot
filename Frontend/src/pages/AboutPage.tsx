import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CommandLineIcon, BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import SEO, { pageSEO } from '../components/SEO';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Rajatava Ghosh',
      role: 'Developer',
      bio: 'AI & Machine Learning Engineer',
      icon: CommandLineIcon,
      image: '/rajatava.jpg',
      portfolioRoute: '/team/rajatava'
    },
    {
      name: 'Dipanjan Chowdhury',
      role: 'Developer',
      bio: 'Web Development Specialist',
      icon: CommandLineIcon,
      image: '/dipanjan.jpg',
      portfolioRoute: '/team/dipanjan'
    },
    {
      name: 'Saptarshi Chattopadhyay',
      role: 'Developer',
      bio: 'Frontend & Creative Technologist',
      icon: CommandLineIcon,
      image: '/saptarshi.jpg',
      portfolioRoute: '/team/saptarshi'
    },
    {
      name: 'Debojyoti Bannerjee',
      role: 'Management',
      bio: 'Strategic Operations',
      icon: BriefcaseIcon
    },
    {
      name: 'Hrishikesh Bhowmick',
      role: 'Management',
      bio: 'Project Director',
      icon: BriefcaseIcon
    }
  ];

  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'Started with a vision to democratize AI' }
  ];

  return (
    <div className="min-h-screen pt-20 bg-white text-gray-900">
      <SEO {...pageSEO.about} />
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            About Chatterify
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Chatterify (chatterify.in) is a technology startup focused on delivering modern digital solutions for businesses and individuals at reasonable prices. Our goal is to help organizations build strong online presence, automate communication, and create engaging digital content.
          </p>
        </motion.div>

        {/* Mission & Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#FCFCFC] border border-gray-100 p-8 rounded-2xl shadow-sm"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our mission is to provide high-quality digital and AI-powered services at affordable prices so that startups, creators, and businesses can leverage modern technology without heavy costs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#FCFCFC] border border-gray-100 p-8 rounded-2xl shadow-sm"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Chatterify</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Affordable pricing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Modern technology solutions</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Skilled full-stack development team</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">AI automation with chatbots and voice agents</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Creative video editing services</span>
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
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-6 bg-[#FCFCFC] border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="mb-4 flex justify-center text-black relative mx-auto w-16 h-16 md:w-20 md:h-20">
                  {'image' in member && member.image ? (
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-100 shadow-sm relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover absolute inset-0 z-10"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                      <member.icon className="w-full h-full stroke-1 absolute z-0 p-2 text-gray-800" />
                    </div>
                  ) : (
                    <member.icon className="w-16 h-16 stroke-1" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm mb-6">{member.bio}</p>
                <button
                  onClick={() => member.portfolioRoute ? navigate(member.portfolioRoute) : alert('Portfolio coming soon!')}
                  className={`mt-auto mx-auto px-6 py-2 border rounded-full text-sm font-semibold transition-colors duration-300 shadow-sm ${member.portfolioRoute
                    ? 'border-gray-200 text-gray-700 hover:bg-black hover:text-white hover:border-black'
                    : 'border-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-50'
                    }`}
                >
                  View Portfolio
                </button>
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
            <div className="text-center bg-[#FCFCFC] border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">5+</h3>
              <p className="text-xl text-gray-600 font-medium">Projects Completed</p>
            </div>
            <div className="text-center bg-[#FCFCFC] border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">80%</h3>
              <p className="text-xl text-gray-600 font-medium">Client Satisfaction</p>
            </div>
            <div className="text-center bg-[#FCFCFC] border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-xl text-gray-600 font-medium">Active Users</p>
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
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
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
                <div className="text-2xl font-bold text-gray-400 w-24">{milestone.year}</div>
                <div className="flex-1 bg-[#FCFCFC] border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
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
          <div className="text-center p-6 hover:bg-gray-50 rounded-2xl transition-colors">
            <div className="text-2xl font-bold text-gray-400 mb-4">01</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              Committed to delivering the highest quality solutions
            </p>
          </div>
          <div className="text-center p-6 hover:bg-gray-50 rounded-2xl transition-colors">
            <div className="text-2xl font-bold text-gray-400 mb-4">02</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
            <p className="text-gray-600">
              Building trust through transparency and honesty
            </p>
          </div>
          <div className="text-center p-6 hover:bg-gray-50 rounded-2xl transition-colors">
            <div className="text-2xl font-bold text-gray-400 mb-4">03</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              Pushing boundaries with cutting-edge technology
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-gray-50 border border-gray-100 text-gray-900 rounded-3xl p-12 shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Join Us on Our Journey</h2>
          <p className="text-xl mb-8 text-gray-600 font-medium">
            Let's build the future of digital solutions together
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:-translate-y-1 transform"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;