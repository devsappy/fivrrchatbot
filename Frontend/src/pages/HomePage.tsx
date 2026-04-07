import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import CoreValues from '../components/CoreValues';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <CoreValues />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;