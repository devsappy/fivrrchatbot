import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO, { pageSEO } from '../components/SEO';
import {
    MicrophoneIcon,
    PhoneArrowUpRightIcon,
    Bars3CenterLeftIcon,
    ShieldCheckIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const VoiceAgentsPage: React.FC = () => {
    const navigate = useNavigate();

    const techStack = [
        {
            title: 'Conversational TTS & STT',
            icon: MicrophoneIcon,
            description: 'Ultra-realistic Text-to-Speech and highly accurate Speech-to-Text models that synthesize human emotion and recognize different accents flawlessly.',
            features: ['ElevenLabs Integration', 'Low-Latency Streaming', 'Natural Interruptions', 'Accent Recognition']
        },
        {
            title: 'Inbound / Outbound Automation',
            icon: PhoneArrowUpRightIcon,
            description: 'Fully autonomous SIP trunking implementations for making cold calls or answering inbound customer service inquiries at scale.',
            features: ['Twilio / Vapi.ai Integrations', 'Bulk Outbound Dialing', 'Real-time Call Transfers', 'Appointment Booking']
        },
        {
            title: 'Live Transcript & Analysis',
            icon: Bars3CenterLeftIcon,
            description: 'Automatic summarization of calls, lead scoring, and structured data extraction immediately after the phone call ends.',
            features: ['Call Summaries via Webhook', 'CRM Automatic Sync', 'Sentiment Analysis', 'Post-call SMS Trigger']
        },
        {
            title: 'Compliance & Security',
            icon: ShieldCheckIcon,
            description: 'Adherence to telecom compliance regulations, ensuring your automated voice operations run legally and securely without being flagged as spam.',
            features: ['DNC List Checking', 'Call Recording Compliance', 'Data Anonymization', 'Spam Registration']
        }
    ];

    const pricingTiers = [
        { type: 'Basic Voice Bot', price: '₹10,000 – ₹25,000', desc: 'Simple FAQ answering system via phone' },
        { type: 'AI Voice Call Agent', price: '₹25,000 – ₹60,000', desc: 'Outbound setter or inbound receptionist' },
        { type: 'Advanced AI Voice Automation', price: '₹60,000 – ₹1,50,000', desc: 'Custom enterprise voice orchestration' }
    ];

    const addons = ['CRM specific integrations', 'Custom voice cloning', 'Multi-language support', 'Monthly Service: ₹3,000 - ₹10,000'];

    return (
        <div className="min-h-screen pt-20 bg-[#FCFCFC] text-gray-900">
            <SEO {...pageSEO.voiceAgents} />
            <div className="container mx-auto px-6 py-16 max-w-6xl">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100 shadow-sm">
                        <MicrophoneIcon className="w-16 h-16 text-black stroke-[1.5]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                        Voice Agents
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-6 max-w-2xl mx-auto">
                        AI-Powered Voice Automation
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        Developing hyper-realistic AI-powered voice assistants capable of autonomously calling leads, booking appointments, and handling inbound customer service queries like a human.
                    </p>
                </motion.div>

                {/* Tech Stack Pillars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Voice Infrastructure</h2>
                        <p className="text-lg text-gray-600 font-medium">The technology powering our seamless AI calls</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col h-full"
                            >
                                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <tech.icon className="w-8 h-8 text-black stroke-[1.5]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{tech.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed font-medium">{tech.description}</p>
                                <ul className="space-y-3 pt-4 border-t border-gray-100 mt-auto">
                                    {tech.features.map(feature => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <CheckCircleIcon className="w-5 h-5 text-gray-400 stroke-2 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 font-medium text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Pricing & Addons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-black text-white rounded-3xl p-8 md:p-14 shadow-2xl mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-white">Investment Guide</h2>
                        <p className="text-gray-400 font-medium text-lg">Custom telephony architectures for any scale</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Telephony Categories</h3>
                            <div className="space-y-6">
                                {pricingTiers.map(tier => (
                                    <div key={tier.type} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <div>
                                            <p className="font-bold text-lg text-white mb-1">{tier.type}</p>
                                            <p className="text-sm text-gray-500 font-medium">{tier.desc}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                            <p className="font-black text-lg text-fuchsia-400">{tier.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Premium Tuning</h3>
                            <p className="text-gray-400 mb-6 font-medium leading-relaxed">
                                Voice AI requires massive ongoing cloud compute for ultra-low latency, and usually requires recurring subscription models:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {addons.map(addon => (
                                    <div key={addon} className="flex items-center gap-3 p-4 bg-gray-900 rounded-xl border border-gray-800">
                                        <CheckCircleIcon className="w-5 h-5 text-gray-500" />
                                        <span className="font-semibold text-gray-300 text-sm">{addon}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gray-50 border border-gray-100 text-gray-900 rounded-3xl p-12 shadow-sm"
                >
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Construct Your Voice AI</h2>
                    <p className="text-xl mb-8 text-gray-600 font-medium max-w-2xl mx-auto">
                        Ready to replace massive call-centers with flawless AI automation?
                    </p>
                    <button
                        onClick={() => navigate('/contact', { state: { service: 'Voice Agent Development' } })}
                        className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                    >
                        Schedule a Demo Read
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default VoiceAgentsPage;
