import React from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon, AcademicCapIcon, BriefcaseIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const SaptarshiPortfolioPage: React.FC = () => {
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
                            src="/saptarshi.jpg"
                            alt="Saptarshi Chattopadhyay"
                            className="w-full h-full object-cover absolute inset-0 z-10"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <CommandLineIcon className="w-16 h-16 text-gray-800 stroke-[1.5] absolute z-0" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                        Saptarshi Chattopadhyay
                    </h1>
                    <p className="text-xl text-gray-500 font-medium">Frontend Developer & Creative Technologist</p>
                </motion.div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm mb-12"
                >
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                        Saptarshi Chattopadhyay is a Frontend Developer and Video Editor specializing in building visually immersive and highly interactive web experiences. His work combines modern frontend technologies with creative animation techniques to deliver engaging digital products and storytelling-driven interfaces.
                    </p>
                </motion.div>

                {/* Experience & Skills Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Experience */}
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
                            <h2 className="text-2xl font-bold text-gray-900">Experience & Skills</h2>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900">Frontend Developer & Video Editor</h3>
                            <p className="text-gray-500 font-semibold mb-3">Vibe Engine AI</p>
                            <p className="text-gray-600 leading-relaxed">
                                Designs and develops responsive web applications using React, focusing on scalable UI architecture and performance optimization. Integrates advanced animation and motion design using GSAP and Locomotive Scroll to create smooth, dynamic user experiences.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Immersive 3D Experiences</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Works with Three.js to build immersive 3D visualizations, implementing shaders, lighting systems, and interactive models to enhance digital storytelling and user engagement.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Video Editing & Multimedia</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Brings strong creative skills in video editing, having worked with international teams to produce engaging visual content for digital platforms. His work bridges design, development, and multimedia production.
                            </p>
                        </div>
                    </motion.div>

                    {/* Education & Philosophy Grid Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-8"
                    >
                        {/* Education */}
                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
                                    <AcademicCapIcon className="w-6 h-6 text-gray-900 stroke-2" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900">B.Tech in Electronics & Communication Eng.</h3>
                                <p className="text-gray-500 font-semibold mb-3">Institute of Engineering & Management, Kolkata</p>
                                <p className="text-gray-600 leading-relaxed">
                                    Currently pursuing his degree while continuously expanding his expertise in modern web technologies and creative development.
                                </p>
                            </div>
                        </div>

                        {/* Philosophy / Statement */}
                        <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl flex-1 flex flex-col justify-center text-center">
                            <CodeBracketIcon className="w-12 h-12 text-gray-400 mx-auto mb-4 stroke-1" />
                            <p className="text-lg text-gray-200 leading-relaxed font-medium italic">
                                "Crafting complete digital experiences by bridging design, development, and immersive multimedia production."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SaptarshiPortfolioPage;
