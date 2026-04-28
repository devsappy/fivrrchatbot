/* eslint-disable jsx-a11y/heading-has-content, jsx-a11y/alt-text, jsx-a11y/anchor-has-content */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Find the post by ID
    const post = blogPosts.find(p => p.id === Number(id));

    if (!post) {
        return (
            <div className="min-h-screen pt-32 pb-16 bg-white text-gray-900 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-4">Post not found</h1>
                <Link to="/blog" className="text-amber-600 hover:text-amber-700 font-medium">
                    Return to Blog
                </Link>
            </div>
        );
    }

    const toIsoDate = (d: string): string => {
        const parsed = new Date(d);
        return Number.isNaN(parsed.getTime()) ? d : parsed.toISOString().slice(0, 10);
    };
    const wordCount = post.content.trim().split(/\s+/).length;
    const url = `https://www.chatterify.in/blog/${post.id}`;
    const datePublishedIso = toIsoDate(post.date);

    return (
        <div className="min-h-screen pt-36 pb-16 bg-white text-gray-900">
            <SEO
                title={`${post.title} — Chatterify Blog`}
                description={post.excerpt}
                keywords={`${post.category}, ${post.title}, Chatterify blog, web development, AI, digital strategy`}
                canonicalPath={`/blog/${post.id}`}
                ogType="article"
                ogImage={post.image}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    '@id': `${url}#article`,
                    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
                    headline: post.title,
                    description: post.excerpt,
                    articleBody: post.content,
                    articleSection: post.category,
                    keywords: [post.category, 'web development', 'AI', 'digital strategy'].join(', '),
                    wordCount,
                    image: { '@type': 'ImageObject', url: post.image },
                    author: {
                        '@type': 'Organization',
                        name: 'Chatterify',
                        url: 'https://www.chatterify.in'
                    },
                    datePublished: datePublishedIso,
                    dateModified: datePublishedIso,
                    publisher: {
                        '@type': 'Organization',
                        name: 'Chatterify',
                        url: 'https://www.chatterify.in',
                        logo: { '@type': 'ImageObject', url: 'https://www.chatterify.in/logo.png' }
                    },
                    inLanguage: 'en'
                }}
            />
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-700 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-full font-medium mb-10 transition-all duration-300 text-sm">
                    <ArrowLeftIcon className="w-4 h-4" /> Back to Blog
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide inline-block mb-6">
                        {post.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-2 font-medium text-gray-900">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-gray-600" />
                            </div>
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-sm border border-gray-100">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="max-w-none text-gray-700 leading-relaxed text-lg prose prose-lg prose-amber">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6 tracking-tight" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight border-b border-gray-100 pb-2" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4" {...props} />,
                                h4: ({ node, ...props }) => <h4 className="text-lg font-bold text-gray-900 mt-8 mb-3 uppercase tracking-wider text-sm" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-6" {...props} />,
                                ul: ({ node, ...props }) => <ul className="my-6 ml-6 space-y-3 list-none" {...props} />,
                                li: ({ node, ...props }) => (
                                    <li className="flex items-start">
                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2.5 mr-3 flex-shrink-0"></span>
                                        <span {...props} />
                                    </li>
                                ),
                                img: ({ node, ...props }) => (
                                    <img className="w-full h-auto rounded-xl my-8 object-cover shadow-sm border border-gray-100 max-h-[500px]" {...props} />
                                ),
                                a: ({ node, ...props }) => <a className="text-amber-600 hover:text-amber-700 underline" {...props} />,
                                table: ({ node, ...props }) => (
                                    <div className="overflow-x-auto my-8">
                                        <table className="min-w-full text-left border-collapse border border-gray-200" {...props} />
                                    </div>
                                ),
                                th: ({ node, ...props }) => <th className="border border-gray-200 bg-gray-50 px-6 py-3 font-semibold text-gray-900" {...props} />,
                                td: ({ node, ...props }) => <td className="border border-gray-200 px-6 py-4" {...props} />,
                                pre: ({ node, ...props }) => (
                                    <div className="my-6 bg-gray-900 rounded-xl p-5 overflow-x-auto shadow-inner border border-gray-800 relative group">
                                        <div className="absolute top-0 right-0 px-3 py-1 bg-gray-800 text-xs text-gray-400 rounded-bl-lg rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity">Code</div>
                                        <pre className="text-sm font-mono text-gray-100 whitespace-pre" {...props} />
                                    </div>
                                ),
                                code: ({ node, className, children, ...props }: any) => {
                                    const match = /language-(\w+)/.exec(className || '')
                                    const isInline = !match && (!node?.position?.start?.line || node?.position?.start?.line === node?.position?.end?.line);
                                    if (isInline) {
                                        return <code className="bg-gray-100 text-red-500 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
                                    }
                                    return <code className={className} {...props}>{children}</code>
                                },
                                hr: ({ node, ...props }) => <hr className="my-10 border-t border-gray-200" {...props} />
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPostPage;
