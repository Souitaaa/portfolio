import React, { useState } from 'react';
import { Download, Send, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [isHovering, setIsHovering] = useState(false);
  const [status, setStatus] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/souita404@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
          _subject: "New Contact Form Submission from Portfolio!"
        })
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer 
      className="relative bg-white/10 dark:bg-[#0a0a0a]/40 backdrop-blur-xl rounded-t-[2rem] md:rounded-t-[3rem] p-8 md:p-12 lg:p-24 overflow-hidden flex flex-col justify-between min-h-[70vh] cursor-none [&_*]:cursor-none mt-20 transition-colors duration-300 border-t border-neutral-200/50 dark:border-zinc-800/50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Content Container */}
      <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 relative z-10 w-full max-w-7xl mx-auto">
        
        {/* Left Column: Typography, Email, Socials, Resume */}
        <div className="flex-1 flex flex-col">
          {/* 'Available for Work' Badge */}
          <div className="inline-flex items-center gap-2 border border-zinc-700/60 bg-zinc-900/30 rounded-full px-4 py-1.5 w-fit mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <span className="text-zinc-400 text-sm font-medium">Available for work</span>
          </div>

          {/* Main Typography */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium text-black dark:text-zinc-300 mt-4 mb-8 tracking-tight leading-tight transition-colors duration-300 font-clash">
            Have a question?<br/>
            <span className="text-neutral-500 dark:text-neutral-500">You know what to do.</span>
          </h2>

          {/* Dancing Cat GIF */}
          <div className="w-24 h-24 md:w-32 md:h-32 mb-10 flex items-center justify-center pointer-events-none transition-all duration-300 z-0 relative">
            <img 
              src="https://media1.tenor.com/m/Rd0jrWH5JjgAAAAC/cat-scuba.gif" 
              alt="Dancing Scuba Cat" 
              className="w-full h-full object-cover drop-shadow-xl"
            />
          </div>

          {/* Download Resume Block */}
          <div className="w-full max-w-md bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-900 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-xl dark:shadow-none transition-colors duration-300 mb-12">
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-neutral-300 dark:bg-neutral-700 rounded-xl blur-sm opacity-50" />
                <div className="relative p-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-black dark:text-white">
                  <FileText size={24} strokeWidth={1.5} />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-black font-clash tracking-wide text-black dark:text-neutral-100 transition-colors duration-300 uppercase">
                  Curriculum Vitae
                </h3>
                <p className="text-neutral-500 dark:text-zinc-400 text-xs mt-1 font-satoshi transition-colors duration-300">
                  Explore my complete roadmap and technology stack.
                </p>
              </div>
            </div>

            <a 
              href="/cv.pdf" 
              download="Souita_Charaf_Resume.pdf"
              className="group/btn relative shrink-0 z-10 flex items-center justify-center w-full sm:w-12 h-12 bg-black dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-black rounded-xl sm:rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 overflow-hidden"
              aria-label="Download Resume"
            >
              <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                <Download size={20} className="absolute transition-transform duration-300 group-hover/btn:translate-y-[150%]" />
                <Download size={20} className="absolute -translate-y-[150%] transition-transform duration-300 group-hover/btn:translate-y-0" />
              </div>
            </a>
          </div>

          {/* Social Icon Buttons */}
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/in/souita-charaf" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-zinc-800/60 hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1 border border-neutral-300 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
              <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://instagram.com/itsmesharaf" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-zinc-800/60 hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1 border border-neutral-300 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
              <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://github.com/Souitaaa" target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-zinc-800/60 hover:bg-neutral-200 dark:hover:bg-zinc-700 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all hover:-translate-y-1 border border-neutral-300 dark:border-zinc-700/50 shadow-sm dark:shadow-none">
              <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="flex-1 w-full xl:max-w-xl">
          <div className="bg-white/80 dark:bg-zinc-900/50 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Subtle background glow inside form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full blur-[80px] pointer-events-none -z-10" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="John Doe"
                  className="w-full bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="john@example.com"
                  className="w-full bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans text-sm md:text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans resize-none text-sm md:text-base"
                />
              </div>

              <input type="text" name="_honey" style={{ display: 'none' }} />
              <input type="hidden" name="_captcha" value="false" />

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="mt-2 w-full bg-black dark:bg-white text-white dark:text-black font-bold font-clash uppercase tracking-widest text-sm px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 shadow-xl"
              >
                {status === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <>Sent Successfully <CheckCircle2 size={18} /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm mt-1 font-mono text-center">Something went wrong. Please try again or email directly.</p>
              )}
            </form>
          </div>
        </div>

      </div>



      {/* Back to Top */}
      <div className="relative z-10 mt-16 md:mt-24 w-full max-w-7xl mx-auto flex items-center justify-between border-t border-neutral-300 dark:border-zinc-800 pt-8">
        <span className="text-xs font-mono text-neutral-500">© 2026 SOUITA CHARAF</span>
        <button 
          onClick={scrollToTop}
          className="text-xs tracking-[0.2em] text-zinc-500 hover:text-black dark:hover:text-white font-medium transition-colors flex items-center gap-2"
        >
          ✦ BACK TO TOP
        </button>
      </div>
    </footer>
  );
}
