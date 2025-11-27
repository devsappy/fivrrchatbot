import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge AI technology'
    },
    {
      title: 'Excellence',
      description: 'Delivering exceptional quality in every project'
    },
    {
      title: 'Partnership',
      description: 'Building long-term relationships with our clients'
    },
    {
      title: 'Growth',
      description: 'Helping businesses scale with intelligent automation'
    }
  ];

  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden" style={{ zIndex: 10 }}>
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gray-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="" >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/50"></div>
              <span className="text-gray-500 uppercase tracking-wider text-sm">About Us</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-white mb-8"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                We Build
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white inline-block"
              >
                The Future
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="inline-block"
              >
                of Communication
              </motion.span>
            </motion.h2>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              We specialize in creating intelligent conversational experiences
              that transform how businesses interact with their customers through
              cutting-edge AI technology.
            </p>

            <p className="text-lg text-gray-500 mb-10">
              Our team of expert developers and AI specialists work together
              to build custom chatbot solutions that deliver measurable results
              and drive business growth.
            </p>

            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform"
            >
              Work With Us
            </button>
          </div>

          {/* Right Stats Grid */}
          <div className=" grid grid-cols-3 gap-4 md:gap-6" >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                5+
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Projects</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                80%
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Satisfaction</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                50+
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Users</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className=" mt-32" >
          <h3 className="text-4xl font-bold text-white text-center mb-16">Our Core Values</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className=" text-center"
                
                
              >
                <h4 className="text-2xl font-bold text-white mb-3">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;