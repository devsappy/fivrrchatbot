import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { EnvelopeIcon, MapPinIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { validateEmail, validateRequired, FormErrors } from '../lib/utils';
import SEO, { pageSEO } from '../components/SEO';

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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldErrors: FormErrors = {};

    if (name === 'name' && !validateRequired(value)) {
      fieldErrors.name = 'Name is required';
    }
    if (name === 'email') {
      if (!validateRequired(value)) {
        fieldErrors.email = 'Email is required';
      } else if (!validateEmail(value)) {
        fieldErrors.email = 'Please enter a valid email address';
      }
    }
    if (name === 'message' && !validateRequired(value)) {
      fieldErrors.message = 'Project details are required';
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...fieldErrors }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validateRequired(formData.message)) {
      newErrors.message = 'Project details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        setErrors({});
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass = "w-full bg-transparent border-0 border-b-2 text-gray-900 px-0 py-2 focus:ring-0 transition-colors font-medium placeholder-gray-300";
  const inputNormal = `${inputBaseClass} border-gray-200 focus:border-amber-500`;
  const inputError = `${inputBaseClass} border-red-400 focus:border-red-500`;

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 bg-white font-sans relative overflow-x-hidden flex items-center">
      <SEO {...pageSEO.contact} />
      <div className="absolute bottom-0 left-0 w-full h-[45%] sm:h-[50%] lg:h-[55%] bg-[#0a0a0a] z-0 rounded-tr-[72px] sm:rounded-tr-[100px] lg:rounded-tr-[200px]"></div>
      
      <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-amber-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16 w-full">
        
        <div className="w-full lg:w-5/12 pt-2 sm:pt-8 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-5 sm:mb-6 leading-tight">
              Let's build <br />
              <span className="text-amber-500">something</span> <br />
              extraordinary.
            </h1>

            <p className="text-gray-600 lg:text-white/70 text-base sm:text-lg leading-relaxed max-w-md mb-10 sm:mb-12 font-medium">
              Fill out the form, and our team of AI and software experts will get back to you within 24 hours to schedule a deep-dive consultation.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <EnvelopeIcon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-gray-900 lg:text-white font-bold text-lg mb-1">Email directly</h4>
                  <a
                    href="mailto:chatterifyservice@gmail.com"
                    className="text-gray-600 lg:text-white/70 hover:text-amber-500 transition-colors font-medium break-all"
                  >
                    chatterifyservice@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <MapPinIcon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-gray-900 lg:text-white font-bold text-lg mb-1">Global Remote</h4>
                  <p className="text-gray-600 lg:text-white/70 font-medium">
                    Serving innovative startups and enterprises worldwide.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-7/12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-6 sm:p-8 md:p-14 w-full"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-8 sm:mb-10 text-center">Send us a message</h2>
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
                    <CheckCircleIcon className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Inquiry Received</h3>
                  <p className="text-gray-500 text-lg max-w-md leading-relaxed">
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
                  noValidate
                  className="space-y-6 sm:space-y-8"
                >
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium text-sm text-red-800">Something went wrong. Please email us directly instead!</span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={errors.name ? inputError : inputNormal}
                        placeholder="Rahul Sharma"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={errors.email ? inputError : inputNormal}
                        placeholder="rahul@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputNormal}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputNormal}
                        placeholder="Your Company Inc."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Service Needed</label>
                      <div className="relative">
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 px-0 py-2 focus:ring-0 focus:border-amber-500 transition-colors font-medium appearance-none"
                        >
                          <option value="" disabled hidden className="text-gray-300">Select a service...</option>
                          <option value="Custom Chatbot Development">Custom Chatbot Development</option>
                          <option value="Voice Agent Development">Voice Agent Development</option>
                          <option value="Website Overhaul">Website Overhaul</option>
                          <option value="Enterprise AI Solutions">Enterprise AI Solutions</option>
                          <option value="App Development">App Development</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Project Budget</label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 px-0 py-2 focus:ring-0 focus:border-amber-500 transition-colors font-medium appearance-none"
                        >
                          <option value="" disabled hidden className="text-gray-300">Target budget...</option>
                          <option value="< ₹5000">Less than ₹5000</option>
                          <option value="₹5000 - ₹20000">₹5000 - ₹20000</option>
                          <option value="₹20000 - ₹50000">₹20000 - ₹50000</option>
                          <option value="₹50000 - ₹100000">₹50000 - ₹100000</option>
                          <option value="> ₹100000">More than ₹100000</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none text-gray-400">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Project Details <span className="text-amber-500">*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      rows={1}
                      className={`w-full bg-transparent border-0 border-b-2 text-gray-900 px-0 py-2 focus:ring-0 transition-colors font-medium placeholder-gray-300 resize-y ${
                        errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'
                      }`}
                      placeholder="Tell us a little bit about your goals and vision..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 mt-10 ${
                      isSubmitting
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-amber-500 shadow-xl shadow-amber-500/20'
                    }`}
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
