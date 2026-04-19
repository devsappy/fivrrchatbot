import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO, { pageSEO } from '../components/SEO';

const BlogPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-36 pb-16 bg-[#FAFAFA] text-gray-900">
            <SEO {...pageSEO.blog} />
            <div className="container mx-auto px-6">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Insights, tutorials, and updates from the Chatterify team on AI, development, and digital strategy.
                    </p>
                </motion.div>

                {/* Featured Post (First Post) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-16"
                >
                    <Link to={`/blog/${blogPosts[0].id}`} className="group block">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 grid md:grid-cols-2 group-hover:-translate-y-1">
                            <div className="h-64 md:h-auto relative overflow-hidden">
                                <img
                                    src={blogPosts[0].image}
                                    alt={blogPosts[0].title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                                        {blogPosts[0].category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{blogPosts[0].date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>{blogPosts[0].readTime}</span>
                                    </div>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                                    {blogPosts[0].title}
                                </h2>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                    {blogPosts[0].excerpt}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-900">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <UserIcon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <span>{blogPosts[0].author}</span>
                                    </div>
                                    <span className="flex items-center gap-2 text-amber-600 font-semibold group-hover:translate-x-2 transition-transform">
                                        Read Article <ArrowRightIcon className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                        >
                            <Link to={`/blog/${post.id}`} className="group block h-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-2 hover:shadow-xl transition-all duration-300 h-full flex flex-col group-hover:-translate-y-2">
                                    <div className="h-48 rounded-xl overflow-hidden relative mb-4">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarIcon className="w-3.5 h-3.5" />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <ClockIcon className="w-3.5 h-3.5" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-900">
                                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <UserIcon className="w-3 h-3 text-gray-600" />
                                                </div>
                                                <span>{post.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-20 bg-black text-white rounded-3xl p-10 md:p-16 text-center shadow-xl relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full filter blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to our newsletter</h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            Get the latest articles, tutorials, and tech insights delivered straight to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 border-none"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default BlogPage;
