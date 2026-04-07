import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ComputerDesktopIcon,
  ChatBubbleLeftEllipsisIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

/* ─── Data ─────────────────────────────────────────────── */

const services = [
  {
    title: 'Full Stack Web Development',
    icon: ComputerDesktopIcon,
    tag: 'Web',
    description: 'Custom, responsive, and secure web applications built for scale and performance.',
    pricing: [
      { type: 'Landing Page', price: '₹5,000 – ₹12,000' },
      { type: 'Business Website (4–6 pages)', price: '₹12,000 – ₹30,000' },
      { type: 'E-commerce Website', price: '₹25,000 – ₹80,000' },
      { type: 'Custom Web Application', price: '₹30,000 – ₹1,20,000+' },
    ],
    addons: ['Login system', 'Payment gateway', 'Admin dashboard', 'Custom backend'],
    note: 'Additional charges apply for custom add-on features',
    detailsRoute: '/services/web-development',
  },
  {
    title: 'Chatbot Integration',
    icon: ChatBubbleLeftEllipsisIcon,
    tag: 'AI',
    description: 'Intelligent chatbots to automate customer support and boost engagement 24/7.',
    pricing: [
      { type: 'Basic Website Chatbot', price: '₹5,000 – ₹12,000' },
      { type: 'AI Chatbot with Automation', price: '₹12,000 – ₹30,000' },
      { type: 'Advanced AI Chatbot (API + LLM)', price: '₹30,000 – ₹70,000' },
    ],
    addons: ['Monthly Maintenance: ₹1,000 – ₹5,000'],
    note: '',
    detailsRoute: '/services/chatbot-integration',
  },
  {
    title: 'AI Voice Agents',
    icon: MicrophoneIcon,
    tag: 'Voice',
    description: 'AI-powered voice assistants and call automation systems for modern businesses.',
    pricing: [
      { type: 'Basic Voice Bot', price: '₹10,000 – ₹25,000' },
      { type: 'AI Voice Call Agent', price: '₹25,000 – ₹60,000' },
      { type: 'Advanced AI Voice Automation', price: '₹60,000 – ₹1,50,000' },
    ],
    addons: ['Monthly Service: ₹3,000 – ₹10,000'],
    note: '',
    detailsRoute: '/services/voice-agents',
  },
  {
    title: 'Video Editing',
    icon: VideoCameraIcon,
    tag: 'Creative',
    description: 'Professional video editing for business, marketing, and social media growth.',
    pricing: [
      { type: 'Short Reels / Shorts', price: '₹300 – ₹800' },
      { type: 'YouTube Video', price: '₹1,000 – ₹3,000' },
      { type: 'Professional Content', price: '₹3,000 – ₹8,000' },
      { type: 'Business Promotional Video', price: '₹5,000 – ₹20,000' },
    ],
    addons: [],
    note: '',
    detailsRoute: '/services/video-editing',
  },
];

const packages = [
  {
    title: 'Starter',
    price: '₹10,000',
    badge: 'Startup Friendly',
    featured: false,
    features: ['Landing Page Website', 'Basic Chatbot', '2 Reels Editing'],
  },
  {
    title: 'Business',
    price: '₹25,000',
    badge: 'Most Popular',
    featured: true,
    features: ['Business Website', 'Chatbot Integration', '5 Edited Videos'],
  },
  {
    title: 'Premium',
    price: '₹60,000+',
    badge: 'Comprehensive',
    featured: false,
    features: ['Custom Web App', 'AI Chatbot', 'Voice Agent', 'Video Editing Package'],
  },
  {
    title: 'Monthly',
    price: '₹8k–₹20k',
    suffix: '/mo',
    badge: 'Recurring Support',
    featured: false,
    features: ['Website maintenance', 'Chatbot monitoring', 'Minor updates', 'Priority support'],
  },
];

const steps = [
  {
    number: '01',
    icon: MagnifyingGlassIcon,
    title: 'Discovery Call',
    body: 'We understand your goals, audience, and technical requirements in a focused 30-minute session.',
  },
  {
    number: '02',
    icon: PencilSquareIcon,
    title: 'Proposal & Design',
    body: 'You receive a detailed proposal, timeline, and mockups before a single line of code is written.',
  },
  {
    number: '03',
    icon: RocketLaunchIcon,
    title: 'Build & Launch',
    body: 'We build, test, and deploy — with regular updates so you are never in the dark.',
  },
];

/* ─── Animation ─────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

/* ─── Service Card ──────────────────────────────────────── */

const ServiceCard: React.FC<{ service: typeof services[0]; index: number }> = ({ service, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-black/10 transition-shadow duration-300"
    >
      {/* Media backgrounds */}
      {service.tag === 'Web' && (
        <>
          <video src="/webdevelopment.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </>
      )}
      {service.tag === 'AI' && (
        <>
          <video src="/chatbot.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </>
      )}
      {service.tag === 'Voice' && (
        <>
          <img src="/voiceagent.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </>
      )}
      {service.tag === 'Creative' && (
        <>
          <video src="/videoediting.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </>
      )}

      {/* Top bar */}
      <div className="relative h-1 w-full bg-white/40" />

      <div className="relative p-8 flex flex-col flex-1 text-white">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/15 border border-white/20">
            <service.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-black tracking-[0.18em] uppercase mt-1 text-white/50">
            {service.tag}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 leading-tight text-white">{service.title}</h3>
        <p className="text-sm leading-relaxed mb-6 text-white/60">{service.description}</p>

        {/* Pricing table */}
        <div className="flex-1 rounded-2xl p-5 mb-6 bg-white/10 border border-white/10">
          <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-4 text-white/40">
            Pricing Tiers
          </p>
          <div className="space-y-3">
            {service.pricing.map((tier) => (
              <div
                key={tier.type}
                className="flex items-center justify-between gap-4 py-2 border-b last:border-0 last:pb-0 border-white/10"
              >
                <span className="text-sm font-medium text-white/70">{tier.type}</span>
                <span className="text-sm font-bold whitespace-nowrap text-white">{tier.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Addons */}
        {service.addons.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] font-black tracking-[0.15em] uppercase mb-3 text-white/40">
              Add-ons
            </p>
            <div className="flex flex-wrap gap-2">
              {service.addons.map((a) => (
                <span key={a} className="px-3 py-1 text-xs font-semibold rounded-full bg-white/15 text-white/80">
                  {a}
                </span>
              ))}
            </div>
            {service.note && <p className="text-xs mt-2 text-white/40">* {service.note}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-3">
          <button
            onClick={() => navigate(service.detailsRoute)}
            className="flex-1 py-3 rounded-xl border-2 border-white/40 text-white text-sm font-bold transition-all duration-200 hover:bg-white hover:text-black"
          >
            Learn More
          </button>
          <button
            onClick={() => navigate('/contact', { state: { service: service.title } })}
            className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-bold transition-colors hover:bg-white/90"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Page ──────────────────────────────────────────────── */

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-gray-900">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-black text-white pt-36 pb-28 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white/80 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Special pricing for our first 10 clients
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6"
          >
            Services &<br />
            <span className="text-white/40">Pricing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl font-medium leading-relaxed"
          >
            Transparent pricing for high-quality digital solutions — from landing pages to full
            AI automation systems, built to grow with your business.
          </motion.p>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">What we build</h2>
          <p className="text-gray-500 font-medium">Four core services, one team, zero compromises.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── How We Work ───────────────────────────────────── */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">How we work</h2>
            <p className="text-white/40 font-medium max-w-xl mx-auto">
              A simple, transparent process from first call to final launch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-black p-10 flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black text-white/10 leading-none">{step.number}</span>
                  <div className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Bundled packages</h2>
          <p className="text-gray-500 font-medium">
            Everything you need to launch, grow, and scale — bundled together.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`relative rounded-3xl p-7 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                pkg.featured
                  ? 'bg-black text-white border-black shadow-2xl shadow-black/20'
                  : 'bg-white text-gray-900 border-gray-200 hover:shadow-xl hover:shadow-black/8'
              }`}
            >
              <span
                className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                  pkg.featured ? 'bg-white text-black' : 'bg-black text-white'
                }`}
              >
                {pkg.badge}
              </span>

              <div className="mt-4 mb-6">
                <h3 className={`text-lg font-bold mb-4 ${pkg.featured ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.title}
                </h3>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-black leading-none ${pkg.featured ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.price}
                  </span>
                  {pkg.suffix && (
                    <span className={`text-sm font-bold mb-1 ${pkg.featured ? 'text-white/50' : 'text-gray-400'}`}>
                      {pkg.suffix}
                    </span>
                  )}
                </div>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircleIcon
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.featured ? 'text-white/50' : 'text-gray-400'}`}
                      strokeWidth={2}
                    />
                    <span className={`text-sm font-medium ${pkg.featured ? 'text-white/70' : 'text-gray-600'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/contact', { state: { service: pkg.title } })}
                className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 group ${
                  pkg.featured
                    ? 'bg-white text-black hover:bg-[#F5F2EA]'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Get Started
                <ArrowRightIcon
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  strokeWidth={2}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-black rounded-3xl px-10 py-20 text-center text-white relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
              Have something<br />specific in mind?
            </h2>
            <p className="text-white/40 text-lg font-medium mb-10 max-w-xl mx-auto">
              We adapt to your exact requirements — no cookie-cutter solutions, just the right
              product for your business.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:bg-[#F5F2EA] transition-colors group"
            >
              Let's discuss your project
              <ArrowRightIcon
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default ServicesPage;
