import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      {/* Spacer to account for fixed Hero section */}
      <div className="h-screen"></div>
      <Services />
      <About />
      <Contact />
    </>
  );
};

export default HomePage;