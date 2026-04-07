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

const Peanut = ({ color }: { color: string }) => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`h-[85%] aspect-square rounded-full ${color} relative left-4 md:left-5`} />
        <div className={`h-[85%] aspect-square rounded-full ${color} relative right-4 md:right-5`} />
    </div>
);

const Pill = ({ text, bg, textColor, rotation, innerColor, padding = "px-10 py-4 md:px-14 md:py-5" }: any) => (
    <div className={`w-max rounded-full flex items-center justify-center ${padding} relative overflow-hidden flex-shrink-0 ${bg} shadow-sm border border-black/5`} style={{ transform: rotation }}>
        {innerColor && <Peanut color={innerColor} />}
        <span className={`relative z-10 text-[40px] md:text-[56px] font-serif font-black tracking-tight leading-tight pt-1 ${textColor}`}>{text}</span>
    </div>
);

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
                        Build amazing websites <br /> with <span>chatterify</span>
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

                {/* Unlimited Design Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#F5F2EA] rounded-[40px] p-8 md:p-14 lg:p-20 mb-20 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10"
                >
                    {/* Left Side: Copy */}
                    <div className="lg:w-1/2 flex flex-col items-start gap-8 z-10 text-left">
                        <h2 className="text-[38px] md:text-6xl lg:text-[72px] font-serif font-black leading-[1.05] text-gray-900 tracking-tight">
                            Unlimited development for a fixed monthly fee
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-lg md:text-xl font-medium mt-2">
                            {[
                                'Pristine code quality',
                                'Unlimited revisions',
                                'Cancel anytime',
                                'No shadow costs'
                            ].map(text => (
                                <div key={text} className="flex items-center gap-3">
                                    <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="12" fill="#111111" />
                                        <path d="M7 12.5L10.5 16L17 8.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-gray-900 leading-none">{text}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-lg md:text-xl font-medium text-gray-900 mt-4">
                            Schedule a project kickoff <a href="/contact" className="text-[#4828FF] underline decoration-2 underline-offset-4 pointer-events-auto hover:text-[#3215D3] transition-colors">here</a>
                        </p>
                    </div>

                    {/* Right Side: Pills Layout */}
                    <div className="lg:w-1/2 relative w-full h-[400px] sm:h-[500px] flex items-center justify-center scale-75 sm:scale-90 md:scale-100 lg:scale-[0.85] xl:scale-100">
                        <div className="absolute top-[0%] left-[5%]">
                            <Pill text="Built" bg="bg-[#B5F942]" textColor="text-black" rotation="rotate(-10deg)" innerColor="bg-white" />
                        </div>
                        <div className="absolute top-[8%] right-[0%]">
                            <div className={`w-max rounded-full flex items-center justify-center px-10 py-4 md:px-14 md:py-5 relative shadow-sm border border-black/5 bg-[#FDFDFD]`} style={{ transform: "rotate(15deg)" }}>
                                <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#E5E0FF] left-4 md:left-6" />
                                <span className={`relative z-10 text-[40px] md:text-[56px] pt-1 font-serif font-black tracking-tight leading-tight text-black`}>for</span>
                            </div>
                        </div>
                        <div className="absolute top-[35%] left-[5%]">
                            <Pill text="the" bg="bg-[#4828FF]" textColor="text-white" rotation="rotate(-18deg)" innerColor="bg-[#111111]" />
                        </div>
                        <div className="absolute top-[52%] right-[5%]">
                            <Pill text="modern" bg="bg-[#EAE4D9]" textColor="text-black" rotation="rotate(19deg)" innerColor="bg-white" padding="px-6 py-2 md:px-8 md:py-3" />
                        </div>
                        <div className="absolute bottom-[-10%] left-[20%] z-20">
                            <Pill text="web" bg="bg-[#B5F942]" textColor="text-black" rotation="rotate(-5deg)" innerColor="bg-white" />
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
