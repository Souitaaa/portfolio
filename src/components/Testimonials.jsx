import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: "John Doe",
    role: "Senior Engineering Manager",
    company: "Acme Corp",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    initials: "JD"
  },
  {
    name: "Sarah Smith",
    role: "Lead Product Designer",
    company: "Design Studio",
    quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    initials: "SS"
  },
  {
    name: "Alex Johnson",
    role: "Tech Lead",
    company: "Startup Lab",
    quote: "Mollis nunc sed id semper risus in hendrerit gravida rutrum. Elementum tempus egestas sed sed risus pretium. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Faucibus purus in massa tempor nec feugiat.",
    initials: "AJ"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full py-16 px-6 md:px-12 select-none border-t border-neutral-900/60 mt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-accent-red font-mono text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={12} /> COOLEST PEOPLE I WORKED WITH
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-clash mt-2 tracking-tight">
            RECOMMENDATIONS.
          </h2>
        </div>
        <p className="text-neutral-500 text-xs md:text-sm mt-4 md:mt-0 font-mono">
          [ 3 TESTIMONIALS ]
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative flex flex-col justify-between bg-background-card border border-neutral-900 hover:border-neutral-800 p-8 rounded-3xl transition-all duration-300"
          >
            <div className="absolute top-6 right-8 text-neutral-800 pointer-events-none">
              <Quote size={40} />
            </div>

            <div>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-satoshi italic">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8 border-t border-neutral-900/60 pt-6">
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center font-clash font-bold text-xs text-neutral-300">
                {t.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold font-clash text-neutral-200">{t.name}</h4>
                <p className="text-[10px] text-neutral-500 font-mono mt-0.5 uppercase tracking-wider">{t.role} • {t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
