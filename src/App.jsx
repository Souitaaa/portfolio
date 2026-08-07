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
import ThemeToggle from './components/ThemeToggle';
import LiquidBackground from './components/LiquidBackground';
import Loader from './components/Loader';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

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
      <ThemeToggle />
      {/* Main Scrollable Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-clip cursor-none [&_*]:cursor-none relative z-10">
        {/* Hero Header */}
        <Hero />

        {/* Scrolling Infinite Marquee */}
        <Marquee />

        {/* Overlapping Fanned-Out Case Studies */}
        <LatestWork />

        {/* Bento Grid Experience & Tech Stack */}
        <ExperienceBento />

        {/* Recommendations Section */}
        <Testimonials />

        {/* Space Game */}
        <SpaceGame />

        {/* Unified Bottom Section (Contact, Resume, Socials) */}
        <Footer />
      </main>
    </div>
  );
}
