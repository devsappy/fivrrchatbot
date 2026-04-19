import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = 'website',
  ogImage = 'https://www.chatterify.in/logo512.png',
  jsonLd,
}) => {
  const baseUrl = 'https://www.chatterify.in';
  const fullTitle = `${title} | Chatterify`;
  const canonicalUrl = canonicalPath ? `${baseUrl}${canonicalPath}` : baseUrl;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('title', fullTitle);
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:alt', `${title} — Chatterify`, true);

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:url', canonicalUrl);
    setMeta('twitter:image', ogImage);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    if (jsonLd) {
      const existingScript = document.getElementById('page-jsonld');
      if (existingScript) existingScript.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-jsonld';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('page-jsonld');
      if (script) script.remove();
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, jsonLd, fullTitle]);

  return null;
};

export const pageSEO: Record<string, SEOProps> = {
  home: {
    title: 'Chatterify — Web Development, AI Chatbots, Voice Agents & Digital Solutions India',
    description: 'India\'s top web development & digital services agency. Custom websites, AI chatbots, voice agents & video editing. Affordable pricing starting ₹5,000. Get a free quote!',
    keywords: 'web development India, website development, custom website, build website, AI chatbot, chatbot integration, voice agent, video editing, digital services, Chatterify',
    canonicalPath: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Chatterify — Web Development & Digital Solutions',
      description: 'India\'s top web development & digital services agency. Custom websites, AI chatbots, voice agents & video editing.',
      url: 'https://www.chatterify.in/',
      mainEntity: {
        '@type': 'Organization',
        name: 'Chatterify',
        url: 'https://www.chatterify.in'
      }
    }
  },
  services: {
    title: 'Services & Pricing — Web Development, Chatbots, Voice AI & Video Editing',
    description: 'Transparent pricing for web development (₹5K–₹1.2L), AI chatbots (₹5K–₹70K), voice agents (₹10K–₹1.5L), and video editing (₹300–₹20K). Startup-friendly packages available.',
    keywords: 'web development pricing, website cost India, chatbot pricing, AI chatbot cost, voice agent pricing, video editing rates, digital services pricing, Chatterify services',
    canonicalPath: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Chatterify Services & Pricing',
      description: 'Web development, AI chatbot, voice agent, and video editing services with transparent pricing.',
      url: 'https://www.chatterify.in/services',
      offers: [
        { '@type': 'Offer', name: 'Starter Package', price: '10000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Business Package', price: '25000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Premium Package', price: '60000', priceCurrency: 'INR' }
      ]
    }
  },
  webDevelopment: {
    title: 'Full Stack Web Development Services — React, Next.js, Node.js | Chatterify',
    description: 'Professional full stack web development services. Custom websites, web apps, e-commerce solutions built with React, Next.js, Node.js, MongoDB & more. Starting ₹5,000.',
    keywords: 'web development, full stack development, React development, Next.js development, Node.js, custom website, web application, e-commerce website, landing page, frontend development, backend development, Chatterify',
    canonicalPath: '/services/web-development',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Full Stack Web Development',
      description: 'Professional web development services using React, Next.js, Node.js, MongoDB, PostgreSQL.',
      provider: { '@type': 'Organization', name: 'Chatterify' },
      url: 'https://www.chatterify.in/services/web-development',
      serviceType: 'Web Development',
      areaServed: { '@type': 'Country', name: 'India' },
      offers: [
        { '@type': 'Offer', name: 'Landing Page Website', price: '5000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Business Website', price: '12000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'E-commerce Website', price: '25000', priceCurrency: 'INR' }
      ]
    }
  },
  chatbotIntegration: {
    title: 'AI Chatbot Integration Services — Website, WhatsApp, Custom Bots | Chatterify',
    description: 'Intelligent AI chatbot integration for websites, WhatsApp & social media. Automate customer support, capture leads 24/7. GPT-powered custom bots starting ₹5,000.',
    keywords: 'AI chatbot integration, chatbot development, website chatbot, WhatsApp chatbot, custom chatbot, customer support automation, lead capture bot, GPT chatbot, conversational AI, Chatterify',
    canonicalPath: '/services/chatbot-integration',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Chatbot Integration',
      description: 'Intelligent chatbot integration for websites and platforms with AI-powered automation.',
      provider: { '@type': 'Organization', name: 'Chatterify' },
      url: 'https://www.chatterify.in/services/chatbot-integration',
      serviceType: 'Chatbot Development',
      offers: [
        { '@type': 'Offer', name: 'Basic Website Chatbot', price: '5000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'AI Chatbot with Automation', price: '12000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Advanced AI Chatbot (API + LLM)', price: '30000', priceCurrency: 'INR' }
      ]
    }
  },
  voiceAgents: {
    title: 'AI Voice Agent Services — Inbound/Outbound Call Automation | Chatterify',
    description: 'Hyper-realistic AI voice agents for automating phone calls, appointment booking, and customer service. Built with ElevenLabs & Twilio. Starting ₹10,000.',
    keywords: 'AI voice agent, voice bot, phone automation, call center automation, voice assistant, AI calling, outbound calling, inbound automation, speech recognition, Chatterify',
    canonicalPath: '/services/voice-agents',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Voice Agents',
      description: 'AI-powered voice assistants for inbound and outbound call automation.',
      provider: { '@type': 'Organization', name: 'Chatterify' },
      url: 'https://www.chatterify.in/services/voice-agents',
      serviceType: 'Voice Automation',
      offers: [
        { '@type': 'Offer', name: 'Basic Voice Bot', price: '10000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'AI Voice Call Agent', price: '25000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Advanced AI Voice Automation', price: '60000', priceCurrency: 'INR' }
      ]
    }
  },
  videoEditing: {
    title: 'Professional Video Editing Services — YouTube, Reels, Marketing | Chatterify',
    description: 'High-retention video editing for YouTube, Instagram Reels, social media marketing & business promos. Professional edits starting ₹300. Fast turnaround.',
    keywords: 'video editing, YouTube video editing, Instagram Reels editing, promotional video, social media video, content creation, video post-production, marketing video, Chatterify',
    canonicalPath: '/services/video-editing',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Professional Video Editing',
      description: 'Video editing for YouTube, social media, marketing, and promotional content.',
      provider: { '@type': 'Organization', name: 'Chatterify' },
      url: 'https://www.chatterify.in/services/video-editing',
      serviceType: 'Video Editing',
      offers: [
        { '@type': 'Offer', name: 'Short Reels / Shorts', price: '300', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'YouTube Video', price: '1000', priceCurrency: 'INR' },
        { '@type': 'Offer', name: 'Professional Content', price: '3000', priceCurrency: 'INR' }
      ]
    }
  },
  about: {
    title: 'About Chatterify — Our Team, Mission & Digital Solutions',
    description: 'Meet the Chatterify team. We are a technology startup delivering modern web development, AI chatbots, voice agents & video editing services across India.',
    keywords: 'about Chatterify, web development team India, digital agency team, AI startup Kolkata, Chatterify team',
    canonicalPath: '/about',
  },
  contact: {
    title: 'Contact Us — Get a Free Quote for Web Development & AI Services',
    description: 'Contact Chatterify for custom web development, AI chatbot integration, voice agents & video editing. Get a free quote within 24 hours.',
    keywords: 'contact Chatterify, web development quote, chatbot development quote, hire web developer India, free consultation',
    canonicalPath: '/contact',
  },
  blog: {
    title: 'Blog — Web Development, AI & Digital Strategy Insights',
    description: 'Insights, tutorials, and updates from the Chatterify team on web development, AI chatbots, voice agents, and digital strategy.',
    keywords: 'web development blog, AI blog, chatbot tutorials, digital strategy, tech insights India, Chatterify blog',
    canonicalPath: '/blog',
  },
};

export default SEO;