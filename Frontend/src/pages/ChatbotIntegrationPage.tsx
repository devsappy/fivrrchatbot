import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO, { pageSEO } from '../components/SEO';
import {
    ChatBubbleLeftEllipsisIcon,
    CpuChipIcon,
    WrenchScrewdriverIcon,
    ArrowTrendingUpIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const ChatbotIntegrationPage: React.FC = () => {
    const navigate = useNavigate();

    const techStack = [
        {
            title: 'Custom AI Models',
            icon: CpuChipIcon,
            description: 'Intelligent conversational agents trained on your specific business knowledge base, documentation, and historical data to provide accurate responses.',
            features: ['OpenAI Integration', 'Custom Vector Databases', 'RAG Architecture', 'Contextual Memory']
        },
        {
            title: 'Omnichannel Deployment',
            icon: ChatBubbleLeftEllipsisIcon,
            description: 'Deploy your AI assistant across all critical customer touchpoints seamlessly, maintaining context and user history across platforms.',
            features: ['Website Widget Integration', 'WhatsApp Automation', 'Facebook/Instagram DM', 'Slack/Teams Internal Tools']
        },
        {
            title: 'Analytics & Optimization',
            icon: ArrowTrendingUpIcon,
            description: 'Monitor chatbot performance, view conversation transcripts, and analyze drop-off points to continually refine your automated responses.',
            features: ['Conversation Analytics', 'Fallback Tracking', 'User Sentiment Analysis', 'Automated Retraining']
        },
        {
            title: 'Handoff Architecture',
            icon: WrenchScrewdriverIcon,
            description: 'Sophisticated fallback mechanisms that smoothly transition conversations from AI to human agents when complex situations arise.',
            features: ['Human-in-the-loop (HITL)', 'Ticket Generation', 'Context Preservation', 'Agent Dashboards']
        }
    ];

    const pricingTiers = [
        { type: 'Basic Website Chatbot', price: '₹5,000 – ₹12,000', desc: 'Rule-based FAQ bot for websites' },
        { type: 'AI Chatbot with Automation', price: '₹12,000 – ₹30,000', desc: 'Lead capture and context-aware responses' },
        { type: 'Advanced AI Chatbot (API + LLM)', price: '₹30,000 – ₹70,000', desc: 'Custom fine-tuned GPT agents' },
    ];

    const addons = ['WhatsApp Integration', 'Custom Knowledge Base Training', 'Advanced Analytics Dashboard', 'Monthly Maintenance: ₹1,000 - ₹5,000'];

    return (
        <div className="min-h-screen pt-20 bg-[#FCFCFC] text-gray-900">
            <SEO {...pageSEO.chatbotIntegration} />
            <div className="container mx-auto px-6 py-16 max-w-6xl">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100 shadow-sm">
                        <ChatBubbleLeftEllipsisIcon className="w-16 h-16 text-black stroke-[1.5]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                        Chatbot Integration
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-6 max-w-2xl mx-auto">
                        Automated Support
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        Building intelligent chatbots for websites and platforms to automate customer support, capture leads, and increase organic engagement.
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
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">AI Chat Architecture</h2>
                        <p className="text-lg text-gray-600 font-medium">How we engineer automated conversational systems</p>
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
                        <p className="text-gray-400 font-medium text-lg">Scalable pricing depending on AI complexity</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Base Integrations</h3>
                            <div className="space-y-6">
                                {pricingTiers.map(tier => (
                                    <div key={tier.type} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <div>
                                            <p className="font-bold text-lg text-white mb-1">{tier.type}</p>
                                            <p className="text-sm text-gray-500 font-medium">{tier.desc}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                            <p className="font-black text-lg text-emerald-400">{tier.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Maintenance & Add-ons</h3>
                            <p className="text-gray-400 mb-6 font-medium leading-relaxed">
                                Chatbots often require continuous fine-tuning, training data updates, and platform compliance adjustments:
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
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Automate Your Support</h2>
                    <p className="text-xl mb-8 text-gray-600 font-medium max-w-2xl mx-auto">
                        Ready to deploy an intelligent bot that handles clients 24/7?
                    </p>
                    <button
                        onClick={() => navigate('/contact', { state: { service: 'Chatbot Integration' } })}
                        className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                    >
                        Start Your Chatbot Project
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default ChatbotIntegrationPage;
