import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    // Only apply on desktop
    if (window.innerWidth < 1024) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative w-full flex flex-col items-center pt-12 md:pt-20 pb-10 px-6 md:px-12 select-none font-inter overflow-hidden">
      {/* Premium background radial glowing spotlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-neutral-300/10 dark:bg-white/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-neutral-400/10 dark:bg-neutral-500/5 blur-[110px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1400px] w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10"
      >
        <div className="flex-1 lg:max-w-2xl z-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-neutral-800 dark:bg-neutral-200" />
            <span className="text-neutral-800 dark:text-neutral-200 font-mono text-xs md:text-sm font-black uppercase tracking-[0.3em] inline-block">
              HELLO, I AM SOUITA CHARAF
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[100px] font-black leading-[0.85] tracking-tighter uppercase font-outfit select-none relative mb-12">
            CRAFTING DIGITAL <br />
            <span className="relative inline-block mt-2">
              <span className="absolute inset-0 bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-200 dark:from-white dark:via-neutral-300 dark:to-neutral-500 blur-xl opacity-30 animate-pulse" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 via-neutral-400 to-neutral-200 dark:from-white dark:via-neutral-300 dark:to-neutral-500">
                EXPERIENCES.
              </span>
            </span>
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-lg max-w-xl font-medium leading-relaxed font-sans">
            A multi-disciplinary Software Engineer and Frontend Developer studying at 1337 (42 Network). 
            I merge intuitive design systems with high-performance code to build digital architectures 
            that feel as premium and effortless as they are robust.
          </p>
        </div>

        {/* 3D Interactive Image Container */}
        <motion.div 
          className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-square lg:aspect-[4/5] flex-shrink-0 z-10"
          style={{ perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Abstract Floating Elements Behind */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-neutral-400/20 to-neutral-600/20 dark:from-white/10 dark:to-white/5 backdrop-blur-2xl rounded-full border border-white/10 z-0" 
          />
          <motion.div 
            animate={{ y: [10, -10, 10], x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-neutral-500/20 to-transparent backdrop-blur-xl border border-white/10 z-20"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY }}
            className="w-full h-full relative z-10 group"
          >
            {/* Geometric Creative Shape Container */}
            <div 
              className="w-full h-full relative overflow-hidden bg-neutral-900/50 backdrop-blur-md shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-white/30"
              style={{
                clipPath: "polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)",
              }}
            >
              <img 
                src="/images/dev_jail.jpg" 
                alt="Souita Charaf" 
                className="w-full h-full object-cover object-center mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Scanline overlay for that tech aesthetic */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5) 1px, transparent 1px, transparent 4px)`
                }}
              />
              
              {/* Dark gradient fade at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-[15%] w-4 h-[2px] bg-white/50 -translate-y-1/2 group-hover:bg-white transition-colors" />
            <div className="absolute top-[15%] left-0 w-[2px] h-4 bg-white/50 -translate-x-1/2 group-hover:bg-white transition-colors" />
            
            <div className="absolute bottom-0 right-[15%] w-4 h-[2px] bg-white/50 translate-y-1/2 group-hover:bg-white transition-colors" />
            <div className="absolute bottom-[15%] right-0 w-[2px] h-4 bg-white/50 translate-x-1/2 group-hover:bg-white transition-colors" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
