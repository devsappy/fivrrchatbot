import React from 'react';
import { motion } from 'framer-motion';
import { CommandLineIcon, AcademicCapIcon, BriefcaseIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const DipanjanPortfolioPage: React.FC = () => {
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
                            src="/dipanjan.jpg"
                            alt="Dipanjan Chowdhury"
                            className="w-full h-full object-cover absolute inset-0 z-10"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                        <CommandLineIcon className="w-16 h-16 text-gray-800 stroke-[1.5] absolute z-0" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                        Dipanjan Chowdhury
                    </h1>
                    <p className="text-xl text-gray-500 font-medium">Full Stack Developer</p>
                </motion.div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm mb-12"
                >
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                        Dipanjan Chowdhury is a passionate Full Stack Developer specializing in building modern, scalable, and responsive web applications. He focuses on creating clean user interfaces and efficient backend systems that enhance usability and performance. His technical stack includes MongoDB, TypeScript, and Tailwind CSS, enabling him to develop fast and visually refined web experiences.
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
                            <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Full Stack Developer</h3>
                            <p className="text-gray-500 font-semibold mb-3">Vibe Engine AI</p>
                            <p className="text-gray-600 leading-relaxed">
                                Currently contributing as a Full Stack Developer, working on developing responsive user interfaces, improving platform usability, and collaborating with teams to implement new features using modern development workflows.
                            </p>
                        </div>
                    </motion.div>

                    {/* Education & Activities */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
                                <AcademicCapIcon className="w-6 h-6 text-gray-900 stroke-2" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Education & Growth</h2>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Problem Solving & DSA</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Alongside professional development, he actively strengthens his problem-solving skills through Data Structures and Algorithms (DSA) using Java, aiming to build efficient and scalable systems.
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">IEEE Computer Society</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Former student member, participating in technical workshops, hackathons, and collaborative projects that explore emerging technologies in computer science.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Philosophy / Footer Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-xl text-center"
                >
                    <CodeBracketIcon className="w-12 h-12 text-gray-400 mx-auto mb-6 stroke-1" />
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium italic">
                        "Bringing curiosity, strong technical foundations, and a continuous learning mindset to every project, contributing to innovative solutions in modern web development."
                    </p>
                </motion.div>

            </div>
        </div>
    );
};

export default DipanjanPortfolioPage;
