import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

export default function ResumeCTA() {
  return (
    <section className="w-full py-16 px-6 md:px-12 select-none border-t border-neutral-900/60 mb-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-r from-[#090909] to-[#121212] border border-neutral-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
      >
        {/* Subtle decorative background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent-red/5 blur-[80px] pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-accent-red mt-1">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black font-clash tracking-wide text-neutral-100">
              CURRICULUM VITAE
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm mt-2 max-w-md font-satoshi leading-relaxed">
              Explore a comprehensive roadmap of my academic projects, full technology stack, system administration works, and continuous education logs.
            </p>
          </div>
        </div>

        <a 
          href="/cv.pdf" 
          download="Souita_Charaf_Resume.pdf"
          className="flex items-center gap-3 bg-neutral-100 hover:bg-white text-black font-bold text-sm md:text-base rounded-full py-4 px-8 transition-all duration-300 shadow-xl shadow-black/30 hover:scale-[1.03] active:scale-[0.97]"
        >
          <Download size={18} />
          <span>Download Resume</span>
        </a>
      </motion.div>
    </section>
  );
}
