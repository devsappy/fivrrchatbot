import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    DevicePhoneMobileIcon,
    Cog6ToothIcon,
    CloudIcon,
    RocketLaunchIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const AppDevelopmentPage: React.FC = () => {
    const navigate = useNavigate();

    const techStack = [
        {
            title: 'Cross-Platform Frameworks',
            icon: DevicePhoneMobileIcon,
            description: 'Build once, deploy everywhere. We use React Native and Flutter to create stunning apps that run natively on both Android and iOS from a single codebase, cutting development time and cost in half.',
            features: ['React Native', 'Flutter & Dart', 'Single Codebase for iOS & Android', 'Native-Like Performance']
        },
        {
            title: 'Native Performance',
            icon: Cog6ToothIcon,
            description: 'For apps that demand peak performance — complex animations, heavy computations, or deep OS integration — we build fully native with Swift (iOS) and Kotlin (Android) for uncompromised speed.',
            features: ['Swift & SwiftUI (iOS)', 'Kotlin & Jetpack Compose (Android)', 'Hardware & Sensor Access', 'Platform-Specific UI Optimization']
        },
        {
            title: 'Backend & Cloud APIs',
            icon: CloudIcon,
            description: 'Scalable cloud backends powered by Node.js, Firebase, or custom APIs that handle authentication, real-time data sync, push notifications, and complex business logic seamlessly.',
            features: ['Firebase & Supabase', 'REST & GraphQL APIs', 'Real-time Data Sync', 'Push Notifications & Auth']
        },
        {
            title: 'App Store Launch & CI/CD',
            icon: RocketLaunchIcon,
            description: 'End-to-end deployment pipeline — from TestFlight beta distribution to Play Store rollout. Automated builds, OTA updates, crash monitoring, and continuous delivery for rapid iteration.',
            features: ['App Store & Play Store Publishing', 'TestFlight & Beta Testing', 'Automated CI/CD Pipelines', 'Crash Analytics & OTA Updates']
        }
    ];

    const pricingTiers = [
        { type: 'Basic App (3-5 screens)', price: '₹15,000 – ₹35,000', desc: 'Simple informational or utility app' },
        { type: 'E-Commerce / Hybrid App', price: '₹35,000 – ₹80,000', desc: 'Shopping, booking, or marketplace app' },
        { type: 'Enterprise / Custom App', price: '₹80,000 – ₹2,00,000+', desc: 'Complex business logic and integrations' }
    ];

    const addons = ['Push Notifications', 'In-App Purchases', 'Admin Dashboard', 'Custom API Integration', 'App Store Optimization', 'Monthly Maintenance: ₹3,000 - ₹10,000'];

    return (
        <div className="min-h-screen pt-20 bg-[#FCFCFC] text-gray-900">
            <div className="container mx-auto px-6 py-16 max-w-6xl">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100 shadow-sm">
                        <DevicePhoneMobileIcon className="w-16 h-16 text-black stroke-[1.5]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                        App Development
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-6 border-b border-gray-200 pb-6 max-w-2xl mx-auto">
                        Cross-Platform Mobile Solutions
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        Building high-performance mobile applications for Android and iOS — from sleek MVPs to enterprise-grade platforms with complex backends, real-time features, and seamless UX.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Mobile Tech Architecture</h2>
                        <p className="text-lg text-gray-600 font-medium">The technology powering our world-class mobile apps</p>
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

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-black text-white rounded-3xl p-8 md:p-14 shadow-2xl mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-white">Investment Guide</h2>
                        <p className="text-gray-400 font-medium text-lg">Scalable pricing based on app complexity and features</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">App Categories</h3>
                            <div className="space-y-6">
                                {pricingTiers.map(tier => (
                                    <div key={tier.type} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                        <div>
                                            <p className="font-bold text-lg text-white mb-1">{tier.type}</p>
                                            <p className="text-sm text-gray-500 font-medium">{tier.desc}</p>
                                        </div>
                                        <div className="mt-4 sm:mt-0 text-left sm:text-right">
                                            <p className="font-black text-lg text-orange-400">{tier.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-6 text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-4">Features & Add-ons</h3>
                            <p className="text-gray-400 mb-6 font-medium leading-relaxed">
                                Mobile apps often require ongoing maintenance, store compliance updates, and feature additions post-launch:
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gray-50 border border-gray-100 text-gray-900 rounded-3xl p-12 shadow-sm"
                >
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Launch Your Mobile App</h2>
                    <p className="text-xl mb-8 text-gray-600 font-medium max-w-2xl mx-auto">
                        From idea to App Store — let's build an app your users will love on every device.
                    </p>
                    <button
                        onClick={() => navigate('/contact', { state: { service: 'App Development' } })}
                        className="bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-md transform hover:-translate-y-1"
                    >
                        Start Your App Project
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default AppDevelopmentPage;
