import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function Footer() {
  const [isHovering, setIsHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "souita404@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative bg-neutral-100 dark:bg-[#0a0a0a] rounded-t-[2rem] md:rounded-t-[3rem] p-8 md:p-24 overflow-hidden flex flex-col justify-between min-h-[70vh] cursor-none [&_*]:cursor-none mt-20 transition-colors duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col relative z-10 w-full max-w-7xl mx-auto">
        
        {/* 'Available for Work' Badge */}
        <div className="inline-flex items-center gap-2 border border-zinc-700/60 bg-zinc-900/30 rounded-full px-4 py-1.5 w-fit mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
          <span className="text-zinc-400 text-sm font-medium">Available for work</span>
        </div>

        {/* Main Typography */}
        <h2 className="text-4xl md:text-7xl font-medium text-black dark:text-zinc-300 mt-8 mb-12 max-w-2xl tracking-tight leading-tight transition-colors duration-300">
          You know what to do.
        </h2>

        {/* Email & Copy */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-16">
          <a 
            href={`mailto:${email}`}
            className="text-xl sm:text-3xl md:text-5xl text-black dark:text-white font-medium hover:text-neutral-600 dark:hover:text-zinc-300 transition-colors duration-300 break-all"
          >
            {email}
          </a>
          <button 
            onClick={handleCopy}
            className="w-14 h-14 bg-white dark:bg-zinc-800/60 hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all active:scale-95 border border-neutral-300 dark:border-zinc-700/50 shadow-sm dark:shadow-none"
            aria-label="Copy email address"
          >
            {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
          </button>
        </div>

        {/* Social Icon Buttons */}
        <div className="flex items-center gap-4 mb-16 md:mb-0">
          <a href="https://linkedin.com/in/souita-charaf" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white dark:bg-zinc-800/60 hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1 border border-neutral-300 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://instagram.com/itsmesharaf" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white dark:bg-zinc-800/60 hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1 border border-neutral-300 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://github.com/Souitaaa" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white dark:bg-zinc-800/60 hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1 border border-neutral-300 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>

      </div>

      {/* Dancing Cat GIF (Right Side) */}
      <div className="absolute right-4 top-24 sm:right-8 sm:top-24 md:right-24 md:top-32 w-16 h-16 sm:w-32 sm:h-32 md:w-48 md:h-48 flex items-center justify-center pointer-events-none opacity-80 mix-blend-multiply dark:mix-blend-screen transition-all duration-300">
        <img 
          src="https://media1.tenor.com/m/Rd0jrWH5JjgAAAAC/cat-scuba.gif" 
          alt="Dancing Scuba Cat" 
          className="w-full h-full object-cover rounded-[1rem] md:rounded-[2rem] shadow-2xl"
        />
      </div>

      {/* Back to Top */}
      <div className="relative z-10 mt-auto pt-16 md:pt-24 w-full max-w-7xl mx-auto flex">
        <button 
          onClick={scrollToTop}
          className="text-xs tracking-[0.2em] text-zinc-500 hover:text-black dark:hover:text-white font-medium transition-colors flex items-center gap-2 group"
        >
          ✦ BACK TO TOP
        </button>
      </div>
    </footer>
  );
}
