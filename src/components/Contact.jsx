import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState('');

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
    <section className="w-full py-24 px-6 md:px-12 relative z-10 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black font-clash text-black dark:text-white tracking-tight mb-4">
            Have a question? <span className="text-neutral-400 dark:text-neutral-500">Contact me!</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm uppercase tracking-widest">
            Let's build something great together.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-200 dark:bg-neutral-800 rounded-full blur-[100px] pointer-events-none -z-10 opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-200 dark:bg-neutral-800 rounded-full blur-[100px] pointer-events-none -z-10 opacity-50" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-bold font-mono text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="John Doe"
                className="w-full bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-bold font-mono text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="john@example.com"
                className="w-full bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-bold font-mono text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Message
              </label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-sans resize-none"
              />
            </div>

            {/* Hidden honeypot field to prevent spam */}
            <input type="text" name="_honey" style={{ display: 'none' }} />
            {/* Disable Captcha for smoother UX (optional) */}
            <input type="hidden" name="_captcha" value="false" />

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="mt-4 w-full md:w-auto self-start bg-black dark:bg-white text-white dark:text-black font-bold font-clash uppercase tracking-widest text-sm px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100"
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
              <p className="text-red-500 text-sm mt-2 font-mono">Something went wrong. Please try again or email directly.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
