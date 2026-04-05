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
    <section id="about" className="py-32 bg-white relative overflow-hidden" style={{ zIndex: 10 }}>
      {/* Background elegant gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="" >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gray-300"></div>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-semibold">About Us</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight"
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
                className="text-gray-900 inline-block"
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

            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
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
              className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 transform shadow-lg"
            >
              Work With Us
            </button>
          </div>

          {/* Right Stats Grid */}
          <div className=" grid grid-cols-3 gap-4 md:gap-6" >
            <div className="bg-[#FCFCFC] border border-gray-100 shadow-sm rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 md:mb-2">
                5+
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Projects</div>
            </div>

            <div className="bg-[#FCFCFC] border border-gray-100 shadow-sm rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 md:mb-2">
                80%
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Satisfaction</div>
            </div>

            <div className="bg-[#FCFCFC] border border-gray-100 shadow-sm rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 md:mb-2">
                50+
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">Users</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className=" mt-32" >
          <h3 className="text-4xl font-bold text-gray-900 text-center mb-16 tracking-tight">Our Core Values</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"


              >
                <h4 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;