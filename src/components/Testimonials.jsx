import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, X } from 'lucide-react';

const testimonials = [
  {
    name: "Ayyoub Gaougaou",
    role: "Inmate",
    company: "",
    quote: "Sharaf is an incredibly talented engineer. His ability to architect scalable backend systems and seamlessly integrate them with modern frontends is truly impressive. He's a reliable team player who always delivers high-quality code.",
    image: "/images/ayyoub.jpg"
  },
  {
    name: "Hajar Charouk",
    role: "Inmate",
    company: "",
    quote: "Sharaf is an incredible collaborator. His ability to understand requirements and translate them into robust, performant code makes him a true asset to the team.",
    image: "/images/hajar.png",
    initials: "HC"
  },
  {
    name: "Aya Hormat-allah",
    role: "Inmate",
    company: "",
    quote: "A deeply analytical mind with a proactive approach. Sharaf brings fresh perspectives and technically sound solutions to complex engineering challenges.",
    image: "/images/aya.png",
    initials: "AH"
  },
  {
    name: "Ayoub Abdenour",
    role: "Inmate",
    company: "",
    quote: "Sharaf is a powerhouse of productivity and technical knowledge. His ability to quickly adapt to new challenges and deliver flawless solutions consistently impresses everyone he works with.",
    image: "/images/ayoub2.jpg"
  },
  {
    name: "Mohamed Amine Amir",
    role: "Inmate",
    company: "",
    quote: "Working with Sharaf is always a great experience. He has a deep understanding of complex algorithms and system design. His solutions are always optimized, clean, and highly performant.",
    image: "/images/amine.jpg"
  },
  {
    name: "Mohamed Boumlik",
    role: "Inmate",
    company: "",
    quote: "Sharaf possesses a rare combination of technical brilliance and great communication skills. He tackles difficult problems with ease and consistently elevates the technical standards of any project he works on.",
    image: "/images/boumlik.jpg"
  },
  {
    name: "Halima El Maqass",
    role: "Inmate",
    company: "",
    quote: "Sharaf's dedication to quality and teamwork is unmatched. His ability to deliver fast and reliable solutions makes him a valuable addition to any project.",
    image: "/images/halima.jpeg",
    initials: "HEM"
  },
  {
    name: "Montassir Bouifraden",
    role: "Inmate",
    company: "",
    quote: "An outstanding developer with a keen eye for detail. Sharaf's expertise in C++ and Node.js makes him an invaluable asset. He consistently writes elegant, maintainable code and is always eager to learn new technologies.",
    image: "/images/montassir.jpg"
  },
  {
    name: "Saoussan Alilech",
    role: "Inmate",
    company: "",
    quote: "Working with Sharaf is an absolute pleasure. He has a unique talent for solving complex problems efficiently and always delivers high-quality, scalable solutions.",
    image: "/images/saoussan.jpg",
    initials: "SA"
  },
  {
    name: "Mehdi Zzine",
    role: "Inmate",
    company: "",
    quote: "Sharaf brings a level of dedication and technical acumen that is hard to find. His code is always robust, and his problem-solving skills make him a fantastic asset to any engineering team.",
    image: "/images/mehdi.jpg"
  },
  {
    name: "Bouchra Chikhaoui",
    role: "Inmate",
    company: "",
    quote: "Sharaf is an exceptional developer who brings both technical brilliance and a great collaborative spirit to the team. His work is always top-notch.",
    image: "/images/bouchra.jpg",
    initials: "BC"
  },
  {
    name: "Mohammed Amine Manaoui",
    role: "Inmate",
    company: "",
    quote: "A phenomenal developer who truly understands modern web architectures. Sharaf's work is always scalable and secure, making him an absolute pleasure to collaborate with on complex projects.",
    image: "/images/mohammed.jpg"
  },
];

export default function Testimonials() {
  const [selectedId, setSelectedId] = useState(null);

  const displayTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-16 px-6 md:px-12 select-none border-t border-neutral-200 dark:border-neutral-900/60 mt-12 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-accent-red font-mono text-xs md:text-sm font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={12} /> COOLEST PEOPLE I WORKED WITH
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-clash mt-2 tracking-tight text-black dark:text-white transition-colors duration-300">
            RECOMMENDATIONS.
          </h2>
        </div>
        <p className="text-neutral-500 text-xs md:text-sm mt-4 md:mt-0 font-mono">
          [ {testimonials.length} TESTIMONIALS ]
        </p>
      </div>

      <div className="overflow-hidden relative w-full -mx-6 md:-mx-12 px-6 md:px-12 py-4">
        {/* Left and Right Fade */}
        <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-neutral-50 dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-neutral-50 dark:from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 lg:gap-8">
          {displayTestimonials.map((t, index) => (
            <motion.div
              layoutId={`card-${index}`}
            key={index}
            onClick={() => setSelectedId(index)}
            whileHover={{ scale: 1.05 }}
            className="relative flex flex-col justify-between bg-white dark:bg-background-card border border-neutral-200 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800 p-6 sm:p-8 rounded-3xl transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-2xl dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.08)] z-0 hover:z-10 cursor-pointer w-[320px] sm:w-[400px] shrink-0"
          >
            <div className="absolute top-6 right-8 text-neutral-200/50 dark:text-neutral-800/50 pointer-events-none transition-colors duration-300 z-0">
              <Quote size={60} strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed font-satoshi italic transition-colors duration-300">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-4 mt-8 border-t border-neutral-200 dark:border-neutral-900/60 pt-6 transition-colors duration-300">
              {t.image ? (
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border border-neutral-200 dark:border-neutral-800 shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center font-clash font-bold text-base text-neutral-600 dark:text-neutral-300 transition-colors duration-300 shrink-0">
                  {t.initials}
                </div>
              )}
              <div>
                <h4 className="text-sm md:text-base font-bold font-clash text-neutral-800 dark:text-neutral-200 transition-colors duration-300">{t.name}</h4>
                <p className="text-[10px] md:text-xs text-neutral-500 font-mono mt-0.5 uppercase tracking-wider">
                  {t.role}{t.company ? ` • ${t.company}` : ''}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 sm:p-8">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative bg-white dark:bg-background-card border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl rounded-3xl p-8 sm:p-12 shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-full text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                  {displayTestimonials[selectedId].image ? (
                    <img src={displayTestimonials[selectedId].image} alt={displayTestimonials[selectedId].name} className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800 shrink-0 shadow-lg" />
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center font-clash font-bold text-4xl text-neutral-600 dark:text-neutral-300 shrink-0 shadow-lg">
                      {displayTestimonials[selectedId].initials}
                    </div>
                  )}
                  <div className="text-center sm:text-left pt-2 sm:pt-4">
                    <h3 className="text-2xl sm:text-3xl font-bold font-clash text-neutral-800 dark:text-neutral-200">{displayTestimonials[selectedId].name}</h3>
                    <p className="text-sm text-neutral-500 font-mono mt-2 uppercase tracking-wider">
                      {displayTestimonials[selectedId].role}{displayTestimonials[selectedId].company ? ` • ${displayTestimonials[selectedId].company}` : ''}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-neutral-200/50 dark:text-neutral-800/50 pointer-events-none z-0">
                    <Quote size={80} strokeWidth={1} />
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 text-lg sm:text-xl leading-relaxed font-satoshi italic relative z-10">
                    "{displayTestimonials[selectedId].quote}"
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
