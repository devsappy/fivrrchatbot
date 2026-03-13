import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;