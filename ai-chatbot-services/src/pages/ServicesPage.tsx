import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const detailedServices = [
    {
      title: 'Custom Chatbot Development',
      icon: '',
      price: 'From $2,999',
      duration: '2-4 weeks',
      features: [
        'Custom AI model training',
        'Multi-language support',
        'Integration with existing systems',
        'Custom UI/UX design',
        '3 months support included'
      ],
      description: 'Get a fully customized AI chatbot tailored to your business needs.'
    },
    {
      title: 'Chatbot Integration',
      icon: '',
      price: 'From $999',
      duration: '1 week',
      features: [
        'Platform integration (WhatsApp, Facebook, etc.)',
        'API setup and configuration',
        'Testing and optimization',
        'Documentation',
        '1 month support'
      ],
      description: 'Seamlessly integrate AI chatbots into your existing platforms.'
    },
    {
      title: 'Enterprise Solutions',
      icon: '',
      price: 'Custom Quote',
      duration: '4-12 weeks',
      features: [
        'Scalable architecture',
        'Advanced security features',
        'Custom AI training',
        'Dedicated support team',
        'SLA guarantee'
      ],
      description: 'Complete enterprise-grade chatbot solutions for large organizations.'
    },
    {
      title: 'Maintenance & Support',
      icon: '',
      price: 'From $499/month',
      duration: 'Ongoing',
      features: [
        '24/7 monitoring',
        'Regular updates',
        'Performance optimization',
        'Bug fixes',
        'Priority support'
      ],
      description: 'Keep your chatbot running smoothly with our maintenance plans.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our range of professional AI chatbot services designed to transform your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {detailedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-5xl mb-4 block">{service.icon}</span>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  <p className="text-gray-300 mt-2">{service.description}</p>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <div>
                  <p className="text-3xl font-bold text-white">{service.price}</p>
                  <p className="text-sm text-gray-400">Starting price</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-white">{service.duration}</p>
                  <p className="text-sm text-gray-400">Delivery time</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/contact', { state: { service: service.title } })}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white py-3 rounded-lg font-medium transition-all duration-200"
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your specific requirements and create the perfect chatbot for your business
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
          >
            Schedule a Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;