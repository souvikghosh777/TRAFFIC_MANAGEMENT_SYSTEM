import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../styles/Home.css';
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import StatsSection from '../sections/StatsSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';
import Footer from '../sections/Footer';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;