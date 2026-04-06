import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111113] text-white py-12 relative border-t border-gray-700/50" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">
              Chatterify
            </h3>
            <p className="text-gray-400 font-medium">
              Transform your business with modern digital solutions. Building intelligent solutions that help you scale.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 font-medium">
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Get In Touch</h4>
            <p className="text-gray-400 mb-4 font-medium">
              Ready to transform your business with modern solutions?
            </p>
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-sm hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Chatterify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;