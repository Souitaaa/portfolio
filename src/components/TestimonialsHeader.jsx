import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function TestimonialsHeader({ count }) {
  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const words = "Word on the street".split(" ");

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative w-full pb-6">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/3 w-[300px] h-[200px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10 hidden dark:block" />

      <motion.div 
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="relative z-10"
      >
        <motion.div variants={itemVars} className="flex items-center gap-2 mb-6">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-red/10 dark:bg-accent-red/20 text-accent-red">
            <Sparkles size={12} />
          </span>
          <span className="text-accent-red font-mono text-xs md:text-sm font-black uppercase tracking-[0.2em]">
            COOLEST PEOPLE I WORKED WITH
          </span>
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter text-black dark:text-white transition-colors duration-300 flex flex-wrap items-baseline gap-x-3 md:gap-x-5 leading-[0.9]">
          {words.map((word, index) => (
            <motion.span key={index} variants={itemVars} className="inline-block">
              {word}
            </motion.span>
          ))}
          
          <motion.span 
            variants={itemVars}
            className="relative inline-block mt-2 md:mt-0"
          >
            {/* The glow effect behind "about me" */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-2xl opacity-20 dark:opacity-40"
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* The actual text */}
            <span className="relative inline-block italic font-sans text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 dark:from-purple-500 dark:to-fuchsia-400 pr-4">
              about me
            </span>
          </motion.span>
        </h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="mt-8 md:mt-0 flex items-center gap-4 shrink-0"
      >
        <div className="h-[1px] w-12 bg-neutral-300 dark:bg-neutral-800 hidden md:block" />
        <p className="text-neutral-500 text-xs md:text-sm font-mono tracking-widest uppercase flex items-center gap-2 bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800/40 rounded-full px-4 py-2 backdrop-blur-sm">
          [ {count} TESTIMONIALS ]
        </p>
      </motion.div>
    </div>
  );
}
