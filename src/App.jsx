import React from 'react';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import LatestWork from './components/LatestWork';
import ExperienceBento from './components/ExperienceBento';
import TechStackOrbit from './components/TechStackOrbit';
import Testimonials from './components/Testimonials';
import SpaceGame from './components/SpaceGame';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LiquidBackground from './components/LiquidBackground';
import Loader from './components/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import DevOffDutySection from './components/DevOffDutySection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  return (
    <div className="min-h-screen text-black dark:text-white flex flex-col font-sans transition-colors duration-300 relative">
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>
      <LiquidBackground />
      <CustomCursor />
      
      {/* Main Scrollable Content */}
      <main className="flex-1 flex flex-col min-w-0 cursor-none [&_*]:cursor-none relative z-10">
        {/* Hero Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <Hero />
        </motion.div>

        {/* Scrolling Infinite Marquee */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 1, ease: "easeOut" }}>
          <Marquee />
        </motion.div>

        {/* Overlapping Fanned-Out Case Studies */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <LatestWork />
        </motion.div>

        {/* Bento Grid Experience & Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <ExperienceBento />
        </motion.div>

        {/* Recommendations Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <Testimonials />
        </motion.div>

        {/* Space Game */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <SpaceGame />
        </motion.div>

        {/* Dev / Off-Duty Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <DevOffDutySection />
        </motion.div>

        {/* Unified Bottom Section (Contact, Resume, Socials) */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5%" }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <Footer />
        </motion.div>
      </main>
    </div>
  );
}
