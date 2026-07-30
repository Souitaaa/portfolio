import React from 'react';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import LatestWork from './components/LatestWork';
import ExperienceBento from './components/ExperienceBento';
import Testimonials from './components/Testimonials';
import SpaceGame from './components/SpaceGame';
import ResumeCTA from './components/ResumeCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import { useEffect } from 'react';

export default function App() {
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
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col font-sans transition-colors duration-300">
      <CustomCursor />
      <ThemeToggle />
      {/* Main Scrollable Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-black overflow-x-clip cursor-none [&_*]:cursor-none transition-colors duration-300">
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

        {/* Floating Call to Action */}
        <ResumeCTA />

        {/* Premium Dark Theme CTA Footer */}
        <Footer />
      </main>
    </div>
  );
}
