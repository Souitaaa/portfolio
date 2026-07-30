import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col items-start pt-12 md:pt-20 pb-10 px-6 md:px-12 select-none overflow-hidden font-inter">
      {/* Premium background radial glowing spotlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-blue/5 blur-[110px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-accent-red" />
          <span className="text-accent-red font-mono text-xs md:text-sm font-black uppercase tracking-[0.3em] inline-block">
            HELLO, I AM SOUITA CHARAF
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[110px] font-black leading-[0.85] tracking-tighter uppercase font-outfit select-none relative">
          CRAFTING DIGITAL <br />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-accent-red via-accent-purple to-accent-blue blur-xl opacity-30 animate-pulse" />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-accent-red via-accent-purple to-accent-blue">
              EXPERIENCES.
            </span>
          </span>
        </h1>

        <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-2xl mt-8 font-medium leading-relaxed font-sans">
          A multi-disciplinary Software Engineer and Frontend Developer studying at 1337 (42 Network). 
          I merge intuitive design systems with high-performance code to build digital architectures 
          that feel as premium and effortless as they are robust.
        </p>
      </motion.div>
    </section>
  );
}
