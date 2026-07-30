import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function AnimatedFooter() {
  const footerRef = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Scale dot from huge (100x) down to normal size (1x) as user scrolls into footer
  const dotScale = useTransform(scrollYProgress, [0.2, 0.9], [100, 1]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const letterAnim = {
    hidden: { y: "100%" },
    show: {
      y: "0%",
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  };

  const textClass = "font-sans font-black lowercase text-[18vw] leading-none text-[#0055FF] tracking-tighter inline-block";

  return (
    <footer ref={footerRef} className="w-full bg-[#0a0a0a] pt-24 pb-12 px-10 flex flex-col relative border-t border-zinc-900 overflow-hidden">
      {/* Top Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-16 max-w-[1400px] mx-auto w-full z-10 mb-20"
      >
        <div className="md:col-span-5 lg:col-span-6">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight max-w-sm">
            email me before i redesign this site again out of boredom.
          </h2>
        </div>
        
        <div className="md:col-span-2 lg:col-span-2 flex flex-col">
          <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6">Explore</h3>
          <div className="flex flex-col gap-y-3 font-medium">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">HOME</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">WORK</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">JUNK</a>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-2 flex flex-col">
          <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-6">Socials</h3>
          <div className="flex flex-col gap-y-3 font-medium">
            <a href="mailto:sitraj539@gmail.com" className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className="w-4 h-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              sitraj539@gmail.com
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
               sitra
            </a>
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-2 flex flex-col items-start md:items-end">
          <button 
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="group flex items-center gap-4 cursor-pointer pointer-events-auto h-fit"
          >
            <span className="text-white text-xl font-medium group-hover:text-zinc-300 transition-colors">Contact me</span>
            <div className={`w-12 h-12 rounded-full bg-[#FFB800] text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-transform duration-300 ${isContactOpen ? 'rotate-90' : 'group-hover:scale-110'}`}>
              <ArrowUpRight size={24} strokeWidth={2.5} />
            </div>
          </button>

          <AnimatePresence>
            {isContactOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden w-full"
              >
                <div className="flex flex-col gap-4 mt-6 w-full min-w-[240px] md:min-w-[300px]">
                  <div className="flex flex-col gap-1.5">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:border-[#0055FF] outline-none pb-2 text-[13px] font-normal transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:border-[#0055FF] outline-none pb-2 text-[13px] font-normal transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <textarea 
                      placeholder="Message" 
                      rows={3}
                      className="w-full bg-transparent border-b border-zinc-800 text-white placeholder-zinc-600 focus:border-[#0055FF] outline-none pb-2 text-[13px] font-normal transition-colors resize-none"
                    />
                  </div>
                  <button className="mt-2 w-full py-2.5 bg-white text-black text-[13px] font-semibold rounded hover:bg-[#0055FF] hover:text-white transition-all duration-300">
                    Send Message
                  </button>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-900 w-full">
                    <a href="#" className="text-[11px] text-zinc-500 hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="text-[11px] text-zinc-500 hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="text-[11px] text-zinc-500 hover:text-white transition-colors">Email</a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Copyright */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full max-w-[1400px] mx-auto z-10 pl-2"
      >
        <div className="text-xs text-zinc-600 tracking-wide font-medium">
          souitaart@2026
        </div>
      </motion.div>

      {/* Giant Typography Reveal */}
      <div className="w-full flex items-end justify-center mt-12 select-none pointer-events-none w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="flex justify-center w-full"
        >
          {['s', 'o', 'u'].map((letter, index) => (
            <span key={index} className="overflow-hidden inline-block">
              <motion.span variants={letterAnim} className={textClass}>{letter}</motion.span>
            </span>
          ))}
          
          {/* i with custom dot animation */}
          <div className="relative flex flex-col justify-end">
            {/* Dot of the 'i', animated by scroll */}
            <motion.div 
              style={{ scale: dotScale, transformOrigin: 'center' }}
              className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[2vw] h-[2vw] rounded-full bg-white z-20 flex items-center justify-center shadow-2xl"
            >
              <div className="w-[1vw] h-[1vw] bg-blue-600 rounded-full" />
            </motion.div>
            {/* Stem of the 'i' (using dotless i 'ı'), properly masked */}
            <span className="overflow-hidden inline-block">
              <motion.span variants={letterAnim} className={textClass}>ı</motion.span>
            </span>
          </div>

          {['t', 'a'].map((letter, index) => (
            <span key={index} className="overflow-hidden inline-block">
              <motion.span variants={letterAnim} className={textClass}>{letter}</motion.span>
            </span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
