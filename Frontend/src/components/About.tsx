import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge AI technology',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
    },
    {
      title: 'Excellence',
      description: 'Delivering exceptional quality in every project',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      ),
    },
    {
      title: 'Partnership',
      description: 'Building long-term relationships with our clients',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
    },
    {
      title: 'Growth',
      description: 'Helping businesses scale with intelligent automation',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
    },
    {
      title: 'Integrity',
      description: 'Transparent and honest in everything we do',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
    },
    {
      title: 'Speed',
      description: 'Rapid delivery without compromising quality',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden" style={{ zIndex: 10 }}>
      {/* Background elegant gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gray-100/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gray-100/30 rounded-full blur-3xl"></div>
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

        {/* Values Section - Infinite Marquee */}
        <div className="mt-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 text-center mb-4 tracking-tight"
          >
            Our Core Values
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 text-center mb-14 text-lg"
          >
            The principles that drive everything we do
          </motion.p>
        </div>
      </div>

      {/* Full-width marquee outside container */}
      <div className="relative overflow-hidden py-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex marquee-scroll">
          {[...values, ...values, ...values, ...values].map((value, index) => (
            <div
              key={`val-${index}`}
              className="flex-shrink-0 w-[280px] md:w-[320px] mx-3 p-6 md:p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-500 group cursor-default"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-gray-800 group-hover:scale-105 transition-all duration-300">
                  {value.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900">{value.title}</h4>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed pl-[60px]">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer to close section properly */}
      <div className="pb-16"></div>
    </section>
  );
};

export default About;