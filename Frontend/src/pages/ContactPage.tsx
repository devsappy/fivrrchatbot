import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { EnvelopeIcon, MapPinIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ContactPage: React.FC = () => {
  const location = useLocation();
  const preSelectedService = location.state?.service || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preSelectedService,
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        service: formData.service || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message,
        to_email: EMAILJS_CONFIG.TO_EMAIL
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      setSubmitStatus('success');

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col md:flex-row bg-white font-sans overflow-hidden">

      {/* Left Side: Dark Hero Section */}
      <div className="w-full md:w-5/12 bg-[#0a0a0a] text-white p-10 md:p-16 lg:p-24 flex flex-col justify-center relative">
        {/* Subtle texture/gradient */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-md"
        >
          <div className="w-12 h-1 bg-amber-500 mb-8 rounded-full"></div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Let's build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">something</span> <br />
            extraordinary.
          </h1>

          <p className="text-gray-400 text-lg mb-16 leading-relaxed">
            Fill out the form, and our team of AI and software experts will get back to you within 24 hours to schedule a deep-dive consultation.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/5 p-3 rounded-xl border border-white/10">
                <EnvelopeIcon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-1">Email directly</h4>
                <a href="mailto:chatterifyservice@gmail.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                  chatterifyservice@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-white/5 p-3 rounded-xl border border-white/10">
                <MapPinIcon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg mb-1">Global Remote</h4>
                <p className="text-gray-400">
                  Serving innovative startups and enterprises worldwide.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Clean Bright Form */}
      <div className="w-full md:w-7/12 bg-white p-10 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl w-full mx-auto"
        >
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-50 border border-gray-100 p-12 rounded-3xl flex flex-col items-center text-center shadow-lg shadow-gray-200/50"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                  <CheckCircleIcon className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Inquiry Received</h3>
                <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                  Thank you for reaching out! A specialist from Chatterify will review your request and contact you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {submitStatus === 'error' && (
                  <div className="p-5 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-4">
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-red-800">Something went wrong. Please email us directly instead!</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Your Name <span className="text-amber-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder-gray-400 shadow-sm"
                      placeholder="Rahul Sharma"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address <span className="text-amber-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder-gray-400 shadow-sm"
                      placeholder="rahul@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder-gray-400 shadow-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder-gray-400 shadow-sm"
                      placeholder="Your Company Inc."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Service Needed</label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium shadow-sm"
                      >
                        <option value="" disabled hidden className="text-gray-400">Select a service...</option>
                        <option value="Custom Chatbot Development">Custom Chatbot Development</option>
                        <option value="Voice Agent Development">Voice Agent Development</option>
                        <option value="Website Overhaul">Website Overhaul</option>
                        <option value="Enterprise AI Solutions">Enterprise AI Solutions</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Project Budget</label>
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium shadow-sm"
                      >
                        <option value="" disabled hidden className="text-gray-400">Target budget...</option>
                        <option value="< ₹5000">Less than ₹5000</option>
                        <option value="₹5000 - ₹20000">₹5000 - ₹20000</option>
                        <option value="₹20000 - ₹50000">₹20000 - ₹50000</option>
                        <option value="₹50000 - ₹100000">₹50000 - ₹100000</option>
                        <option value="> ₹100000">More than ₹100000</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Project Details <span className="text-amber-500">*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-medium placeholder-gray-400 resize-none shadow-sm"
                    placeholder="Tell us a little bit about your goals and vision..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 w-full md:w-auto mt-4 ${isSubmitting
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0a0a0a] text-white hover:bg-amber-500 shadow-xl shadow-gray-200'
                    }`}
                >
                  {isSubmitting ? 'Sending Request...' : (
                    <>
                      <span>Submit Request</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;