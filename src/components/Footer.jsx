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
      className="relative bg-[#0a0a0a] rounded-t-[3rem] p-12 md:p-24 overflow-hidden flex flex-col justify-between min-h-[70vh] cursor-none [&_*]:cursor-none mt-20"
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
        <h2 className="text-5xl md:text-7xl font-medium text-zinc-300 mt-8 mb-12 max-w-2xl tracking-tight leading-tight">
          You know what to do.
        </h2>

        {/* Email & Copy */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-16">
          <a 
            href={`mailto:${email}`}
            className="text-3xl md:text-5xl text-white font-medium hover:text-zinc-300 transition-colors"
          >
            {email}
          </a>
          <button 
            onClick={handleCopy}
            className="w-14 h-14 bg-zinc-800/60 hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-95 border border-zinc-700/50"
            aria-label="Copy email address"
          >
            {copied ? <Check className="w-6 h-6 text-green-500" /> : <Copy className="w-6 h-6" />}
          </button>
        </div>

        {/* Social Icon Buttons */}
        <div className="flex items-center gap-4 mb-16 md:mb-0">
          <a href="#" className="w-14 h-14 bg-zinc-800/60 hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:-translate-y-1 border border-zinc-700/50">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className="w-14 h-14 bg-zinc-800/60 hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:-translate-y-1 border border-zinc-700/50">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="w-14 h-14 bg-zinc-800/60 hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:-translate-y-1 border border-zinc-700/50">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
          </a>
        </div>

      </div>

      {/* Dancing Cat GIF (Right Side) */}
      <div className="absolute right-8 top-16 md:right-24 md:top-32 w-32 h-32 md:w-48 md:h-48 hidden lg:flex items-center justify-center pointer-events-none opacity-80 mix-blend-screen">
        <img 
          src="https://media1.tenor.com/m/Rd0jrWH5JjgAAAAC/cat-scuba.gif" 
          alt="Dancing Scuba Cat" 
          className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
        />
      </div>

      {/* Back to Top */}
      <div className="relative z-10 mt-auto pt-16 md:pt-24 w-full max-w-7xl mx-auto flex">
        <button 
          onClick={scrollToTop}
          className="text-xs tracking-[0.2em] text-zinc-500 hover:text-white font-medium transition-colors flex items-center gap-2 group"
        >
          ✦ BACK TO TOP
        </button>
      </div>
    </footer>
  );
}
