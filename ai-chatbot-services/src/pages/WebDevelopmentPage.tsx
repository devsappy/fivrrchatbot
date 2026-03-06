import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ComputerDesktopIcon,
    ServerStackIcon,
    CircleStackIcon,
    CloudArrowUpIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const WebDevelopmentPage: React.FC = () => {
    const navigate = useNavigate();

    const techStack = [
        {
            title: 'Frontend Development',
            icon: ComputerDesktopIcon,
            description: 'Responsive, highly-interactive user interfaces built with modern frameworks like React and Next.js, meticulously styled using Tailwind CSS for a pristine aesthetic.',
            features: ['React & Next.js', 'Complex UI/UX Implementation', 'State Management', 'Framer Motion & GSAP Animations']
        },
        {
            title: 'Backend Systems',
            icon: ServerStackIcon,
            description: 'Robust and secure server-side logic engineered to handle data seamlessly and support complex application architecture and operations.',
            features: ['Node.js & Express', 'RESTful API Design', 'Authentication & Authorization', 'Serverless Functions']
        },
        {
            title: 'Database Architecture',
            icon: CircleStackIcon,
            description: 'Optimized, scalable database schemas engineered for velocity, data integrity, and complex queries across massive datasets.',
            features: ['MongoDB & NoSQL', 'PostgreSQL & SQL', 'Prisma ORM', 'Redis Caching']
        },
        {
            title: 'Deployment & CI/CD',
            icon: CloudArrowUpIcon,
            description: 'Reliable cloud deployments using containerization to ensure your infrastructure scales automatically with increasing global traffic.',
            features: ['AWS & Vercel', 'Docker Containerization', 'Automated Testing', 'Continuous Integration']
        }
    ];

    const pricingTiers = [
        { type: 'Landing Page', price: '₹5,000 – ₹12,000', desc: 'High-converting single page layout' },
        { type: 'Business Website (4-6 pages)', price: '₹12,000 – ₹30,000', desc: 'Informational architecture for businesses' },
        { type: 'E-commerce Website', price: '₹25,000 – ₹80,000', desc: 'Full digital storefront and cart systems' },
        { type: 'Custom Web Application', price: '₹30,000 – ₹1,20,000+', desc: 'Bespoke complex software tools' }
    ];

    const addons = ['Login systems', 'Payment gateways', 'Admin dashboards', 'Custom backends'];

    return (
        <div className="min-h-screen pt-20 bg-[#FCFCFC] text-gray-900">
            <div className="container mx-auto px-6 py-16 max-w-6xl">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100 shadow-sm">
                        <ComputerDesktopIcon className="w-16 h-16 text-black stroke-[1.5]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                        Web Development
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-6 max-w-2xl mx-auto">
                        End-to-end Solutions
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        Designing and developing complete web applications including pristine frontends, resilient backends, highly optimized databases, and seamless scalable deployment.
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
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Full Stack Architecture</h2>
                        <p className="text-lg text-gray-600 font-medium">From the initial pixel to database clusters, we engineer every layer</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 shadow-sm"
                            >
                                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <tech.icon className="w-8 h-8 text-black stroke-[1.5]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{tech.title}</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed font-medium">{tech.description}</p>
                                <ul className="space-y-3 pt-4 border-t border-gray-100">
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
                        <p className="text-gray-400 font-medium text-lg">Transparent pricing categories tailored for different scale realities</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Base Topologies</h3>
                            <div className="space-y-6">
                                {pricingTiers.map(tier => (
                                    <div key={tier.type} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <div>
                                            <p className="font-bold text-lg text-white mb-1">{tier.type}</p>
                                            <p className="text-sm text-gray-500 font-medium">{tier.desc}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                            <p className="font-black text-lg text-blue-400">{tier.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Complex Add-ons</h3>
                            <p className="text-gray-400 mb-6 font-medium leading-relaxed">
                                Certain sophisticated features fundamentally increase backend orchestration and integration effort. Expanding the base architecture with the following triggers custom expanded quotes:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {addons.map(addon => (
                                    <div key={addon} className="flex items-center gap-3 p-4 bg-gray-900 rounded-xl border border-gray-800">
                                        <CheckCircleIcon className="w-5 h-5 text-gray-500" />
                                        <span className="font-semibold text-gray-300">{addon}</span>
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
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Ready to Develop?</h2>
                    <p className="text-xl mb-8 text-gray-600 font-medium max-w-2xl mx-auto">
                        Let's translate your vision into robust code and deploy it to the world.
                    </p>
                    <button
                        onClick={() => navigate('/contact', { state: { service: 'Web Development (Full Stack)' } })}
                        className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                    >
                        Start Your Web Project
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default WebDevelopmentPage;
