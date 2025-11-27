import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Chatterify
            </h3>
            <p className="text-gray-400">
              Transform your business with cutting-edge conversational AI. Building intelligent chatbots that understand, engage, and convert.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <p className="text-gray-400 mb-4">
              Ready to transform your business with AI chatbots?
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Chatterify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;