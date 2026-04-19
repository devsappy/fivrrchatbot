import React from 'react';
import SEO, { pageSEO } from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import CoreValues from '../components/CoreValues';
import Explore from '../components/Explore';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <SEO {...pageSEO.home} />
      <Hero />
      <About />
      <Services />
      <CoreValues />
      <Explore />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;