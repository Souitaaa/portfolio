import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export default function ResumeCTA() {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 select-none border-t border-neutral-200 dark:border-neutral-900/60 mb-16 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="w-full bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-xl dark:shadow-none transition-colors duration-300"
      >
        {/* Subtle decorative background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-red-500/5 blur-[80px] pointer-events-none" />

        {/* The Glassy Spotlight Effect */}
        <div 
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(150,150,150,0.06), transparent 40%)`
          }}
        />

        <div className="flex items-start gap-5 relative z-10">
          {/* Glowing Icon */}
          <div className="relative mt-1">
            <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-md animate-pulse" />
            <div className="relative p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <FileText size={32} strokeWidth={1.5} />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-black font-clash tracking-wide text-black dark:text-neutral-100 transition-colors duration-300">
              CURRICULUM VITAE
            </h3>
            {/* Typography and Layout Polish */}
            <p className="text-neutral-600 dark:text-zinc-400 text-xs md:text-sm mt-3 max-w-lg font-satoshi leading-relaxed transition-colors duration-300">
              Explore a comprehensive roadmap of my academic projects, full technology stack, system administration works, and continuous education logs.
            </p>
          </div>
        </div>

        <a 
          href="/cv.pdf" 
          download="Souita_Charaf_Resume.pdf"
          className="group/btn relative z-10 flex items-center gap-3 bg-black dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-black font-bold text-sm md:text-base rounded-full py-4 px-8 transition-all duration-300 shadow-xl shadow-black/10 dark:shadow-black/30 hover:scale-[1.03] active:scale-[0.97] overflow-hidden"
        >
          {/* Animated Download Icon */}
          <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
            <Download size={20} className="absolute transition-transform duration-300 group-hover/btn:translate-y-[150%]" />
            <Download size={20} className="absolute -translate-y-[150%] transition-transform duration-300 group-hover/btn:translate-y-0" />
          </div>
          <span>Download Resume</span>
        </a>
      </motion.div>
    </section>
  );
}
