import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useMobileDetect from '../hooks/useMobileDetect';

const faqs = [
    {
        question: "What specific services does Chatterify offer?",
        answer: "We specialize in four premium digital tracks: Full-Stack Web Development, AI Chatbot Integration, Conversational Voice Agents, and High-End Video Editing. From building custom SAAS platforms to automating your entire customer support wing with AI, we build tools that scale businesses."
    },
    {
        question: "How can AI chatbots improve my business metrics?",
        answer: "Our AI chatbots do more than answer FAQs—they act as autonomous sales reps. They qualify leads 24/7, route complex tickets to humans, integrate natively with your CRM to book appointments, and can reduce overhead support volume by up to 70% while improving average response times to sub-seconds."
    },
    {
        question: "Can your AI agents integrate with my existing tech stack?",
        answer: "Absolutely. We build headless and API-first. Our solutions natively plug into Salesforce, HubSpot, Shopify, WhatsApp, Slack, Zapier, and custom internal dashboards. We adapt our integration to flow directly into your team's current daily workflows smoothly."
    },
    {
        question: "What is the typical timeline for a Web Development project?",
        answer: "Timelines depend strictly on project scope. A high-converting landing page takes 1-2 weeks. A complete 6-page corporate architecture roughly takes 3-4 weeks. Complex, custom full-stack web applications and E-commerce builds usually range from 6 to 12 weeks from initial design sprints to final deployment."
    },
    {
        question: "Do you provide ongoing support after deployment?",
        answer: "Yes. Technology requires iteration to stay sharp. We offer ongoing retainer packages for all our services to monitor uptime, add new requested features, retrain AI agents on new company data, and ensure your system stays fully aligned with modern security practices."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const { isMobile } = useMobileDetect();
    const noAnim = isMobile ? false : undefined;

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-[#FCFCFC] relative overflow-hidden" id="faq" style={{ zIndex: 10 }}>
            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-6xl">
                <motion.div
                    initial={noAnim ?? { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: isMobile ? 0 : 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                        Everything you need to know about partnering with Chatterify to scale your digital infrastructure.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={noAnim ?? { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: isMobile ? 0 : 0.5, delay: isMobile ? 0 : index * 0.1 }}
                            className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => toggleFaq(index)}
                            >
                                <span className="text-lg md:text-xl font-bold text-gray-900 pr-8">
                                    {faq.question}
                                </span>
                                <ChevronDownIcon
                                    className={`w-6 h-6 text-[#5227FF] transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-6 text-gray-600 font-medium leading-relaxed border-t border-gray-50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
