import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: 'Not provided',
        company: formData.company || 'Not provided',
        service: formData.projectType || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message,
        to_email: EMAILJS_CONFIG.TO_EMAIL
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      alert('Thank you for your interest! We\'ll get back to you within 24 hours.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Sorry, there was an error sending your message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden" style={{ zIndex: 10 }}>
      {/* Background element */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] lg:w-[600px] h-[300px] md:h-[500px] lg:h-[600px] bg-gray-50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gray-300"></div>
            <span className="text-gray-500 uppercase tracking-wider text-sm font-semibold">Get Started</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Let's Talk
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl font-medium">
            Ready to transform your business with modern solutions? Get in touch for a free consultation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#FCFCFC] border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-gray-400 transition-all placeholder-gray-400 text-sm md:text-base shadow-sm"
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#FCFCFC] border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-gray-400 transition-all placeholder-gray-400 text-sm md:text-base shadow-sm"
                    placeholder="rahul@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#FCFCFC] border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-gray-400 transition-all placeholder-gray-400 text-sm md:text-base shadow-sm"
                  placeholder="Your Company Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#FCFCFC] border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-gray-400 transition-all text-sm md:text-base shadow-sm"
                  >
                    <option value="">Select Type</option>
                    <option value="web-dev">Web Development</option>
                    <option value="chatbot">Chatbot Integration</option>
                    <option value="voice">Voice Agent</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2 font-medium">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#FCFCFC] border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-gray-400 transition-all text-sm md:text-base shadow-sm"
                  >
                    <option value="">Select Budget</option>
                    <option value="< ₹5000">Less than ₹5000</option>
                    <option value="₹5000 - ₹20000">₹5000 - ₹20000</option>
                    <option value="₹20000 - ₹50000">₹20000 - ₹50000</option>
                    <option value="₹50000 - ₹100000">₹50000 - ₹100000</option>
                    <option value="> ₹100000">More than ₹100000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">Project Details *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-[#FCFCFC] border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:border-gray-400 transition-all placeholder-gray-400 resize-none text-sm md:text-base shadow-sm"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 font-semibold rounded-full transition-all duration-300 shadow-md ${isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800 hover:-translate-y-1 transform'
                  }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="bg-[#FCFCFC] border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Quick Contact</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1 font-medium">Email</p>
                  <p className="text-xl text-gray-900 font-semibold">chatterifyservice@gmail.com</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1 font-medium">Response Time</p>
                  <p className="text-xl text-gray-900 font-semibold">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gray-50 border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">
                Why Work With Us?
              </h3>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-black stroke-[1.5] mt-0.5" />
                  <span>Custom solutions tailored to your business</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-black stroke-[1.5] mt-0.5" />
                  <span>Expert team with proven track record</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-black stroke-[1.5] mt-0.5" />
                  <span>Fast turnaround and reliable support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-black stroke-[1.5] mt-0.5" />
                  <span>Competitive pricing and transparent process</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default Contact;
