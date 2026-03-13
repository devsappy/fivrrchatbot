import React from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon, AcademicCapIcon, BriefcaseIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const RajatavaPortfolioPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-20 bg-[#FCFCFC] text-gray-900">
            <div className="container mx-auto px-6 py-16 max-w-5xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                        <img
                            src="/rajatava.jpg"
                            alt="Rajatava Ghosh"
                            className="w-full h-full object-cover absolute inset-0 z-10"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <CommandLineIcon className="w-16 h-16 text-gray-800 stroke-[1.5] absolute z-0" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                        Rajatava Ghosh
                    </h1>
                    <p className="text-xl text-gray-500 font-medium">AI & Machine Learning Engineer</p>
                </motion.div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm mb-12"
                >
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                        Rajatava Ghosh is an AI Software Developer and Machine Learning Engineer specializing in building intelligent systems, AI agents, and scalable backend architectures. His expertise lies in Generative AI, Natural Language Processing (NLP), and machine learning optimization, with a strong focus on developing practical AI solutions for real-world applications.
                    </p>
                </motion.div>

                {/* Experience & Skills Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Recent Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
                                <BriefcaseIcon className="w-6 h-6 text-gray-900 stroke-2" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Current Roles</h2>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900">AI Software Developer</h3>
                            <p className="text-gray-500 font-semibold mb-3">Vibe Engine</p>
                            <p className="text-gray-600 leading-relaxed">
                                Contributes to the development of Generative Engine Optimization (GEO) systems and builds advanced AI applications such as chatbots and voice agents. His work involves designing backend systems that power intelligent automation platforms.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900">AI Software Engineer</h3>
                            <p className="text-gray-500 font-semibold mb-3">AI VC</p>
                            <p className="text-gray-600 leading-relaxed">
                                Develops custom AI agents capable of performing tasks like landing page generation, web scraping, and lead generation. Responsibilities include planning system architecture, building end-to-end AI solutions, and integrating advanced APIs (OpenAI, Gemini, LinkedIn).
                            </p>
                        </div>
                    </motion.div>

                    {/* Past Experience & Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-8"
                    >
                        {/* Past Experience */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
                                    <AcademicCapIcon className="w-6 h-6 text-gray-900 stroke-2" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Past Experience</h2>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Machine Learning Engineer</h3>
                                <p className="text-gray-500 font-semibold mb-3">Neugence Technology</p>
                                <p className="text-gray-600 leading-relaxed">
                                    Built machine learning pipelines, fine-tuned open-source large language models such as T5, and developed interactive ML applications using Streamlit.
                                </p>
                            </div>
                        </div>

                        {/* Philosophy / Technical Focus Statement */}
                        <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl flex-1 flex flex-col justify-center text-center">
                            <CodeBracketIcon className="w-12 h-12 text-gray-400 mx-auto mb-4 stroke-1" />
                            <p className="text-lg text-gray-200 leading-relaxed font-medium italic">
                                "With strong technical skills in Redis, OpenAI APIs, and AI system design, focusing on building efficient AI-driven software that powers modern automation, intelligent chat systems, and next-generation digital products."
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default RajatavaPortfolioPage;
