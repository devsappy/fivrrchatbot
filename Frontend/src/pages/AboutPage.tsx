import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, GlobeAltIcon, BoltIcon, ShieldCheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import SEO, { pageSEO } from '../components/SEO';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const capabilities = [
    {
      title: 'Web Development',
      description: 'Custom websites, web apps, e-commerce, and SaaS platforms built with React, Next.js, Node.js, and modern infrastructure.',
    },
    {
      title: 'AI Chatbots',
      description: 'Conversational AI for websites, WhatsApp, and Slack, integrated with CRMs and powered by GPT and Claude.',
    },
    {
      title: 'AI Voice Agents',
      description: 'Inbound and outbound voice automation built with ElevenLabs and Twilio for support, sales, and appointment booking.',
    },
    {
      title: 'Mobile Apps',
      description: 'Cross-platform iOS and Android applications using React Native and Flutter, with native modules where performance demands.',
    },
    {
      title: 'Video Editing',
      description: 'High-retention video for YouTube, Reels, and brand campaigns, edited with motion design and broadcast-quality finish.',
    },
    {
      title: 'Ongoing Support',
      description: 'Retainer engagements covering uptime monitoring, feature additions, AI retraining, and security maintenance.',
    },
  ];

  const howWeWork = [
    {
      icon: BoltIcon,
      title: 'Two-week sprints',
      description: 'Working software in your environment every fortnight. No big-bang reveals; no surprises at week 12.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Fixed-price clarity',
      description: 'Most engagements are scoped against a written deliverables list with milestone payments. No hidden hours.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Global delivery',
      description: 'Clients across the US, UK, Canada, Australia, UAE, Singapore, Germany, and India. Multi-currency invoicing.',
    },
    {
      icon: ArrowPathIcon,
      title: 'Long-term partnership',
      description: 'Most launches roll into a monthly retainer. We grow products with the teams that operate them.',
    },
  ];

  const milestones = [
    { year: '2024', event: 'Company Founded', description: 'Launched as a digital studio focused on AI-first web products and conversational automation.' },
    { year: '2025', event: 'Service Expansion', description: 'Added AI voice agents, mobile app development, and dedicated retainer support to the offering.' },
    { year: '2026', event: 'Global Reach', description: 'Operating across 8+ countries with multi-currency billing and round-the-clock client communication windows.' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-white text-gray-900">
      <SEO {...pageSEO.about} />
      <div className="container mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            About Chatterify
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Chatterify is a digital studio building custom websites, AI chatbots, voice agents, and mobile applications for businesses around the world. Headquartered in Kolkata, India, with clients across eight countries.
          </p>
        </motion.div>

        {/* Mission & Why */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#FCFCFC] border border-gray-100 p-8 rounded-2xl shadow-sm"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To deliver high-quality digital and AI-powered services at fair, transparent pricing &mdash; so that startups, creators, and established businesses can adopt modern technology without enterprise overhead.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#FCFCFC] border border-gray-100 p-8 rounded-2xl shadow-sm"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Chatterify</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Senior engineers on every project</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Two-week delivery sprints with weekly demos</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Fixed-price packages with no hidden fees</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">AI automation built in, not bolted on</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-black stroke-[1.5]" />
                <span className="text-gray-600 font-medium">Multi-currency invoicing in INR, USD, EUR, GBP</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">
            What we deliver
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Six capabilities, one studio. We take on projects end-to-end so handoffs and finger-pointing don&rsquo;t slow you down.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-[#FCFCFC] border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How we work */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">
            How we work
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            The operating principles behind every Chatterify engagement.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWork.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-[#FCFCFC] border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <h.icon className="w-8 h-8 text-black mb-4 stroke-[1.5]" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{h.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{h.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-[#FCFCFC] border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">120+</h3>
              <p className="text-base text-gray-600 font-medium">Projects Completed</p>
            </div>
            <div className="text-center bg-[#FCFCFC] border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">8+</h3>
              <p className="text-base text-gray-600 font-medium">Countries Served</p>
            </div>
            <div className="text-center bg-[#FCFCFC] border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">2&nbsp;weeks</h3>
              <p className="text-base text-gray-600 font-medium">Average Sprint Length</p>
            </div>
            <div className="text-center bg-[#FCFCFC] border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">4</h3>
              <p className="text-base text-gray-600 font-medium">Currencies Accepted</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 tracking-tight">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-8"
              >
                <div className="text-2xl font-bold text-gray-400 w-24 flex-shrink-0">{milestone.year}</div>
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
            <p className="text-gray-600">Committed to delivering the highest quality solutions on every engagement.</p>
          </div>
          <div className="text-center p-6 hover:bg-gray-50 rounded-2xl transition-colors">
            <div className="text-2xl font-bold text-gray-400 mb-4">02</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Integrity</h3>
            <p className="text-gray-600">Building trust through transparent pricing, honest scoping, and clear timelines.</p>
          </div>
          <div className="text-center p-6 hover:bg-gray-50 rounded-2xl transition-colors">
            <div className="text-2xl font-bold text-gray-400 mb-4">03</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">Pushing boundaries with AI-first architectures and modern engineering practice.</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-gray-50 border border-gray-100 text-gray-900 rounded-3xl p-12 shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-4 tracking-tight">Got a project in mind?</h2>
          <p className="text-xl mb-8 text-gray-600 font-medium">
            Tell us what you&rsquo;re building. We&rsquo;ll come back with a quote inside 48 hours.
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
