import React from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import LatestWork from './components/LatestWork';
import Testimonials from './components/Testimonials';
import ResumeCTA from './components/ResumeCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row font-sans">
      {/* Fixed Sticky Left Sidebar */}
      <Sidebar />

      {/* Main Scrollable Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-black overflow-x-clip">
        {/* Hero Header */}
        <Hero />

        {/* Scrolling Infinite Marquee */}
        <Marquee />

        {/* Overlapping Fanned-Out Case Studies */}
        <LatestWork />

        {/* Recommendations Section */}
        <Testimonials />

        {/* Curriculum Vitae Download CTA */}
        <ResumeCTA />

        {/* Modern Minimal Footer */}
        <footer className="w-full py-8 px-6 md:px-12 border-t border-neutral-950 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <div>
            <span>© 2026 SOUITA CHARAF. ALL ARCHITECTURAL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/Souitaaa" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">GITHUB</a>
            <span>•</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">LINKEDIN</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
