import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO, { pageSEO } from '../components/SEO';
import {
  ComputerDesktopIcon,
  ChatBubbleLeftEllipsisIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  RocketLaunchIcon,
  StarIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Full Stack Web Development',
      icon: ComputerDesktopIcon,
      description: 'Custom, responsive, and secure web applications built for scale.',
      pricing: [
        { type: 'Landing Page', price: '₹5,000 – ₹12,000' },
        { type: 'Business Website (4-6 pages)', price: '₹12,000 – ₹30,000' },
        { type: 'E-commerce Website', price: '₹25,000 – ₹80,000' },
        { type: 'Custom Web Application', price: '₹30,000 – ₹1,20,000+' }
      ],
      addons: ['Login system', 'Payment gateway', 'Admin dashboard', 'Custom backend'],
      note: 'Additional charges apply for custom add-on features',
      detailsRoute: '/services/web-development'
    },
    {
      title: 'Chatbot Integration',
      icon: ChatBubbleLeftEllipsisIcon,
      description: 'Intelligent chatbots to automate your customer support and engagement.',
      pricing: [
        { type: 'Basic Website Chatbot', price: '₹5,000 – ₹12,000' },
        { type: 'AI Chatbot with Automation', price: '₹12,000 – ₹30,000' },
        { type: 'Advanced AI Chatbot (API + LLM)', price: '₹30,000 – ₹70,000' }
      ],
      addons: ['Monthly Maintenance: ₹1,000 - ₹5,000'],
      note: '',
      detailsRoute: '/services/chatbot-integration'
    },
    {
      title: 'AI Voice Agents',
      icon: MicrophoneIcon,
      description: 'AI-powered voice assistants and call automation systems for businesses.',
      pricing: [
        { type: 'Basic Voice Bot', price: '₹10,000 – ₹25,000' },
        { type: 'AI Voice Call Agent', price: '₹25,000 – ₹60,000' },
        { type: 'Advanced AI Voice Automation', price: '₹60,000 – ₹1,50,000' }
      ],
      addons: ['Monthly Service: ₹3,000 - ₹10,000'],
      note: '',
      detailsRoute: '/services/voice-agents'
    },
    {
      title: 'Video Editing',
      icon: VideoCameraIcon,
      description: 'Professional video editing for business, marketing, and social media.',
      pricing: [
        { type: 'Short Reels / Shorts', price: '₹300 – ₹800' },
        { type: 'YouTube Video', price: '₹1,000 – ₹3,000' },
        { type: 'Professional Content', price: '₹3,000 – ₹8,000' },
        { type: 'Business Promotional Video', price: '₹5,000 – ₹20,000' }
      ],
      addons: [],
      note: '',
      detailsRoute: '/services/video-editing'
    },
    {
      title: 'App Development',
      icon: DevicePhoneMobileIcon,
      description: 'High-performance mobile apps for Android and iOS — cross-platform and native.',
      pricing: [
        { type: 'Basic App (3-5 screens)', price: '₹15,000 – ₹35,000' },
        { type: 'E-Commerce / Hybrid App', price: '₹35,000 – ₹80,000' },
        { type: 'Enterprise / Custom App', price: '₹80,000 – ₹2,00,000+' }
      ],
      addons: ['Push Notifications', 'In-App Purchases', 'Admin Dashboard', 'Custom API Integration'],
      note: '',
      detailsRoute: '/services/app-development'
    }
  ];

  const packages = [
    {
      title: 'Starter Package',
      icon: SparklesIcon,
      price: '₹10,000',
      badge: 'Startup Friendly',
      color: 'bg-green-50 text-green-700 border-green-200',
      iconColor: 'text-green-600',
      features: [
        'Landing Page Website',
        'Basic Chatbot',
        '2 Reels Editing'
      ]
    },
    {
      title: 'Business Package',
      icon: RocketLaunchIcon,
      price: '₹25,000',
      badge: 'Most Popular',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      iconColor: 'text-blue-600',
      features: [
        'Business Website',
        'Chatbot Integration',
        '5 Edited Videos'
      ]
    },
    {
      title: 'Premium Package',
      icon: StarIcon,
      price: '₹60,000+',
      badge: 'Comprehensive',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconColor: 'text-indigo-600',
      features: [
        'Custom Web App',
        'AI Chatbot',
        'Voice Agent',
        'Video Editing Package',
        'Mobile App (MVP)'
      ]
    },
    {
      title: 'Monthly Tech Package',
      icon: WrenchScrewdriverIcon,
      price: '₹8k–₹20k',
      priceSuffix: '/mo',
      badge: 'Recurring Support',
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      iconColor: 'text-orange-600',
      features: [
        'Website maintenance',
        'Chatbot monitoring',
        'Minor updates',
        'Priority support'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#FCFCFC] text-gray-900">
      <SEO {...pageSEO.services} />
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 border border-blue-100 mb-6 font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Special discounted pricing available for our first 10 clients!
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Services & Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Transparent pricing for high-quality digital solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Individual Services & Pricing */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col h-full"
            >
              <div className="mb-6">
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-black stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed font-medium">{service.description}</p>
              </div>

              {/* Pricing Table */}
              <div className="flex-1 bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-4">Pricing Tiers</h4>
                <div className="space-y-4">
                  {service.pricing.map((tier) => (
                    <div key={tier.type} className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                      <span className="text-gray-800 font-medium text-sm md:text-base pr-4">{tier.type}</span>
                      <span className="text-black font-semibold text-sm md:text-base whitespace-nowrap">{tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addons / Details */}
              {(service.addons.length > 0 || service.note) && (
                <div className="mb-8">
                  {service.addons.length > 0 && (
                    <>
                      <h4 className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-3 text-center sm:text-left">
                        {service.title === 'Web Development (Full Stack)' ? 'Additional Features' : 'Ongoing Services'}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-3 justify-center sm:justify-start">
                        {service.addons.map((addon) => (
                          <span key={addon} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                            {addon}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {service.note && (
                    <p className="text-xs text-gray-500 font-medium mt-2 text-center sm:text-left">* {service.note}</p>
                  )}
                </div>
              )}

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                {('detailsRoute' in service) && service.detailsRoute && (
                  <button
                    onClick={() => navigate(service.detailsRoute as string)}
                    className="w-full sm:w-1/2 bg-white border-2 border-black text-black py-4 rounded-xl font-bold transition-all duration-300 shadow-sm hover:bg-gray-50 transform hover:-translate-y-0.5"
                  >
                    Learn More
                  </button>
                )}
                <button
                  onClick={() => navigate('/contact', { state: { service: service.title } })}
                  className={`w-full ${('detailsRoute' in service) && service.detailsRoute ? 'sm:w-1/2' : ''} bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-md transform hover:-translate-y-0.5`}
                >
                  Request a Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Startup Packages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Startup Friendly Packages</h2>
            <p className="text-lg text-gray-600 font-medium">Bundled solutions to kickstart your digital presence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => {
              const isPopular = pkg.badge === 'Most Popular';
              return (
                <motion.div
                  key={pkg.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={[
                    'group relative rounded-[28px] p-8 flex flex-col transition-all duration-300',
                    isPopular
                      ? 'bg-gray-900 text-white border border-gray-900 shadow-[0_24px_60px_-24px_rgba(15,15,15,0.45)] lg:-mt-2'
                      : 'bg-white border border-gray-200/70 hover:border-gray-300 hover:shadow-[0_14px_40px_-14px_rgba(0,0,0,0.12)] hover:-translate-y-1',
                  ].join(' ')}
                >
                  {/* Top row: tier number + badge */}
                  <div className="flex items-center justify-between mb-10">
                    <span
                      className={`text-[11px] font-semibold tracking-[0.22em] uppercase ${
                        isPopular ? 'text-amber-400' : 'text-gray-400'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {pkg.badge && (
                      <span
                        className={[
                          'px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                          isPopular
                            ? 'bg-amber-400 text-gray-900'
                            : 'bg-gray-50 text-gray-600 border border-gray-200',
                        ].join(' ')}
                      >
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-bold mb-3 tracking-tight ${
                      isPopular ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {pkg.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-8">
                    <span
                      className={`text-[38px] leading-none font-black tracking-[-0.02em] ${
                        isPopular ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {pkg.price}
                    </span>
                    {pkg.priceSuffix && (
                      <span
                        className={`text-sm font-semibold ${
                          isPopular ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {pkg.priceSuffix}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className={`h-px mb-6 ${isPopular ? 'bg-white/10' : 'bg-gray-100'}`} />

                  {/* Features */}
                  <ul className="flex-1 space-y-3.5 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center ${
                            isPopular
                              ? 'bg-amber-400/15 text-amber-400'
                              : 'bg-amber-400/10 text-amber-600'
                          }`}
                        >
                          <svg className="w-[11px] h-[11px]" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span
                          className={`text-[14px] leading-[1.5] font-medium ${
                            isPopular ? 'text-gray-200' : 'text-gray-700'
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => navigate('/contact', { state: { service: pkg.title } })}
                    className={[
                      'relative w-full py-3.5 rounded-full font-semibold text-[14px] inline-flex items-center justify-center gap-2 transition-all duration-300',
                      isPopular
                        ? 'bg-amber-400 text-gray-900 hover:bg-amber-300 shadow-[0_10px_24px_-8px_rgba(245,158,11,0.55)]'
                        : 'bg-gray-900 text-white hover:bg-black',
                    ].join(' ')}
                  >
                    Select Package
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gray-50 border border-gray-100 text-gray-900 rounded-3xl p-12 shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Need Something Else?</h2>
          <p className="text-xl mb-8 text-gray-600 font-medium max-w-2xl mx-auto">
            We adapt to your specific requirements to create the perfect digital product for your business.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-md transform hover:-translate-y-1"
          >
            Let's Discuss Your Project
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;
