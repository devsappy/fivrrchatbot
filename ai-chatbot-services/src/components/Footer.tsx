import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/contact') {
    return null;
  }

  return (
    <footer className="bg-[#FCFCFC] text-gray-900 border-t border-gray-100 py-12 relative" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 tracking-tight">
              Chatterify
            </h3>
            <p className="text-gray-600 font-medium">
              Transform your business with modern digital solutions. Building intelligent solutions that help you scale.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 font-medium">
              <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-black transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Get In Touch</h4>
            <p className="text-gray-600 mb-4 font-medium">
              Ready to transform your business with modern solutions?
            </p>
            <Link
              to="/contact"
              className="inline-block px-6 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Chatterify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;