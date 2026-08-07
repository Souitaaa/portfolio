import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function TestimonialsHeader({ count }) {
  const textToType = "about me";

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
      <div>
        <span className="text-accent-red font-mono text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2">
          <Sparkles size={12} /> COOLEST PEOPLE I WORKED WITH
        </span>
        <h2 className="text-5xl md:text-7xl tracking-tight text-white transition-colors duration-300">
          Word on the street{" "}
          <span className="relative inline-block">
            {/* Invisible placeholder to maintain width and prevent layout shift */}
            <span className="opacity-0 italic">{textToType}</span>
            
            {/* Animated typewriter text */}
            <motion.span
              className="absolute inset-0 italic text-[#b854f5]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {textToType.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </span>
        </h2>
      </div>
      <p className="text-neutral-500 text-xs md:text-sm mt-4 md:mt-0 font-mono">
        [ {count} TESTIMONIALS ]
      </p>
    </div>
  );
}
