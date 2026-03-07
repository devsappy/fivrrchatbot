import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    VideoCameraIcon,
    FilmIcon,
    ScissorsIcon,
    EyeIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const VideoEditingPage: React.FC = () => {
    const navigate = useNavigate();

    const techStack = [
        {
            title: 'Dynamic Short-Form',
            icon: ScissorsIcon,
            description: 'Highly engaging Instagram Reels, YouTube Shorts, and TikToks designed with retention hacking techniques—subtitles, zooms, and sound effects.',
            features: ['Alex Hormozi Style Captions', 'B-Roll Sourcing', 'Fast-paced Jump Cuts', 'Viral Hook Construction']
        },
        {
            title: 'Long-Form YouTube',
            icon: VideoCameraIcon,
            description: 'Cinematic long-form edits tailored to the YouTube algorithm to maximize AVD (Average View Duration) and click-through rates.',
            features: ['Narrative Pacing', 'Color Grading', 'Custom Lower Thirds', 'A/B Thumbnail Ideation']
        },
        {
            title: 'Promotional & Corporate',
            icon: FilmIcon,
            description: 'Sleek, highly professional video content perfect for website landing pages, Facebook Ads campaigns, or corporate documentation.',
            features: ['Motion Graphics', 'Royalty-Free Music', 'Brand Kit Alignment', 'Voiceover Integration']
        },
        {
            title: 'Visual Storytelling',
            icon: EyeIcon,
            description: 'Turning raw chaotic footage into a compelling storyline that resonates emotionally with your targeted viewer demographic.',
            features: ['Script Doctoring', 'Audio Sweetening', 'Visual Effects (VFX)', 'Multi-cam Syncing']
        }
    ];

    const pricingTiers = [
        { type: 'Short Reels / Shorts', price: '₹300 – ₹800', desc: 'Per vertical video (< 60s)' },
        { type: 'Standard YouTube Video', price: '₹1,000 – ₹3,000', desc: '10-20 minute standard edits' },
        { type: 'Professional Content', price: '₹3,000 – ₹8,000', desc: 'Highly edited cinematic pieces' },
        { type: 'Business Promotional', price: '₹5,000 – ₹20,000', desc: 'Custom ads and commercial edits' }
    ];

    const addons = ['Custom Motion Graphics', 'Raw Footage Processing', 'Rush Delivery', 'Thumbnail Creation'];

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
                        <VideoCameraIcon className="w-16 h-16 text-black stroke-[1.5]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                        Video Editing
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-6 max-w-2xl mx-auto">
                        Professional Content Creation
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        Professional video editing for modern marketing, social media algorithms, YouTube retention, and promotional content. High-retention edits guaranteed.
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
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Editing Philosophy</h2>
                        <p className="text-lg text-gray-600 font-medium">How we construct videos that capture extreme attention</p>
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
                        <p className="text-gray-400 font-medium text-lg">Clear per-project and retainer rates</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Editing Tiers</h3>
                            <div className="space-y-6">
                                {pricingTiers.map(tier => (
                                    <div key={tier.type} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <div>
                                            <p className="font-bold text-lg text-white mb-1">{tier.type}</p>
                                            <p className="text-sm text-gray-500 font-medium">{tier.desc}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                            <p className="font-black text-lg text-teal-400">{tier.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Production Add-ons</h3>
                            <p className="text-gray-400 mb-6 font-medium leading-relaxed">
                                We also offer auxiliary services to boost algorithm performance and click-through metrics:
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
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Ignite Your Content</h2>
                    <p className="text-xl mb-8 text-gray-600 font-medium max-w-2xl mx-auto">
                        Let's take your raw footage and turn it into viral-ready masterpieces.
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                    >
                        Request Video Editing
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default VideoEditingPage;
