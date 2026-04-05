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
import { Cover } from '../components/ui/cover';
import LiquidEther from '../components/LiquidEther';

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
        <div className="bg-white text-gray-900 min-h-screen relative overflow-x-hidden">
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <LiquidEther
                    colors={['#5227FF', '#FF9FFC', '#B19EEF']}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={8}
                    iterationsPoisson={8}
                    resolution={0.25}
                    isBounce={false}
                    autoDemo
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            <div className="h-[80vh] flex flex-col items-center justify-center relative z-10 w-full px-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center w-full max-w-7xl mx-auto flex flex-col items-center justify-center"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 leading-tight">
                        Build amazing websites <br /> with <Cover>chatterify</Cover>
                    </h1>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 py-4 max-w-6xl relative z-10">

                {/* Tech Stack Pillars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={tech.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 shadow-lg flex flex-col h-full overflow-hidden"
                            >

                                <div className="relative z-10 bg-gray-50 border border-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gray-100 group-hover:border-gray-200 transition-all duration-500">
                                    <tech.icon className="w-8 h-8 text-gray-800 stroke-[1.5] group-hover:text-[#5227FF] transition-colors duration-500" />
                                </div>
                                <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-500">{tech.title}</h3>
                                <p className="relative z-10 text-gray-600 mb-6 leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-500">{tech.description}</p>
                                <ul className="relative z-10 space-y-3 pt-6 border-t border-gray-100 mt-auto group-hover:border-gray-200 transition-colors duration-500">
                                    {tech.features.map(feature => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-gray-400 stroke-2 mt-0.5 flex-shrink-0 group-hover:text-[#5227FF] transition-colors duration-500" />
                                            <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900 transition-colors duration-500">{feature}</span>
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
                    className="bg-white border border-gray-100 text-gray-900 rounded-3xl p-8 md:p-14 shadow-2xl mb-20 relative z-10"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">Investment Guide</h2>
                        <p className="text-gray-600 font-medium text-lg">Transparent pricing categories tailored for different scale realities</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-4">Base Topologies</h3>
                            <div className="space-y-6">
                                {pricingTiers.map(tier => (
                                    <div key={tier.type} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-300 transition-colors shadow-sm">
                                        <div>
                                            <p className="font-bold text-lg text-gray-900 mb-1">{tier.type}</p>
                                            <p className="text-sm text-gray-600 font-medium">{tier.desc}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                            <p className="font-black text-lg text-blue-600">{tier.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-4">Complex Add-ons</h3>
                            <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                                Certain sophisticated features fundamentally increase backend orchestration and integration effort. Expanding the base architecture with the following triggers custom expanded quotes:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {addons.map(addon => (
                                    <div key={addon} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                                        <CheckCircleIcon className="w-5 h-5 text-gray-400" />
                                        <span className="font-semibold text-gray-800">{addon}</span>
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
                    className="text-center bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 rounded-3xl p-12 shadow-2xl relative z-10"
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
