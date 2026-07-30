import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Terminal as TerminalIcon, GitCommit, Code2, Database, Layout, Server, Cpu } from 'lucide-react';

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const BentoCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl bg-white/80 dark:bg-[rgba(255,255,255,0.03)] border border-neutral-200 dark:border-white/10 backdrop-blur-md shadow-xl dark:shadow-2xl transition-all duration-500 hover:shadow-[inset_0_0_80px_rgba(0,0,0,0.02)] dark:hover:shadow-[inset_0_0_80px_rgba(255,255,255,0.02)] group ${className}`}
    >
      {/* Subtle hover gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 w-full h-full p-8">
        {children}
      </div>
    </motion.div>
  );
};

export default function ExperienceBento() {
  return (
    <section className="w-full bg-neutral-50 dark:bg-black py-24 md:py-32 px-6 md:px-12 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background for the section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden dark:block">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-neutral-900/40 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-neutral-500 dark:text-neutral-500 font-mono text-xs md:text-sm font-black uppercase tracking-[0.2em]">
            BACKGROUND & EXPERTISE
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-clash mt-2 tracking-tight text-black dark:text-white transition-colors duration-300">
            EXPERIENCE.
          </h2>
        </motion.div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* 1. The Terminal Card (Wide) */}
          <BentoCard delay={0.1} className="md:col-span-3 lg:col-span-2 row-span-2">
            <div className="flex flex-col h-full bg-neutral-100/50 dark:bg-transparent rounded-2xl p-4 md:p-0 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-6 border-b border-neutral-300 dark:border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-xs font-mono text-neutral-500">sharaf@backend-arch ~</span>
              </div>
              
              <div className="flex-1 font-mono text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                <div className="mb-4">
                  <span className="text-accent-blue">{'>'}</span> <span className="text-neutral-500">whoami</span>
                </div>
                <div className="text-neutral-800 dark:text-neutral-400 mb-6">
                  <TypewriterText text="I am a Software Engineer specializing in scalable backend architectures and full-stack applications. I build robust systems using C, C++, Node.js, and modern frontend frameworks." />
                  <span className="animate-pulse ml-1 text-black dark:text-white">_</span>
                </div>
                
                <div className="mb-2">
                  <span className="text-accent-blue">{'>'}</span> <span className="text-neutral-500">cat skills.txt | grep core</span>
                </div>
                <div className="text-accent-green">
                  [ System Architecture ] [ Network Programming ]<br/>
                  [ DevOps ] [ UI/UX Integration ]
                </div>
              </div>
            </div>
          </BentoCard>

          {/* 2. The Featured Skills Card (Tall) */}
          <BentoCard delay={0.2} className="md:col-span-1 lg:col-span-1 row-span-3 flex flex-col">
            <h3 className="text-xl font-clash font-bold mb-8 text-black dark:text-white transition-colors duration-300">Featured Skills</h3>
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              
              <div className="group/skill">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors">System Architecture</span>
                  <span className="text-xs font-mono text-accent-blue">95%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-900/50 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '95%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="bg-accent-blue h-full rounded-full shadow-[0_0_10px_rgba(0,157,255,0.8)]" 
                  />
                </div>
              </div>

              <div className="group/skill">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors">C / C++</span>
                  <span className="text-xs font-mono text-accent-purple">90%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-900/50 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="bg-accent-purple h-full rounded-full shadow-[0_0_10px_rgba(114,99,230,0.8)]" 
                  />
                </div>
              </div>

              <div className="group/skill">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors">React & Node.js</span>
                  <span className="text-xs font-mono text-accent-green">85%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-900/50 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                    className="bg-accent-green h-full rounded-full shadow-[0_0_10px_rgba(39,201,63,0.8)]" 
                  />
                </div>
              </div>

              <div className="group/skill">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-neutral-700 dark:text-neutral-300 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors">Docker & DevOps</span>
                  <span className="text-xs font-mono text-accent-red">80%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-900/50 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="bg-accent-red h-full rounded-full shadow-[0_0_10px_rgba(255,95,86,0.8)]" 
                  />
                </div>
              </div>

            </div>
          </BentoCard>

          {/* 3. The Tech Orbit Card (Square) */}
          <BentoCard delay={0.3} className="md:col-span-2 lg:col-span-1 row-span-1">
            <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">Tech Stack</h3>
            <div className="w-full h-full flex flex-col justify-center overflow-hidden relative">
              {/* Fade masks for marquee */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-[#080808] to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-[#080808] to-transparent z-10" />
              
              <div className="flex gap-4 animate-[marquee_20s_linear_infinite] w-max">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
                      <Layout size={14} /> React
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
                      <Server size={14} /> NestJS
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
                      <Code2 size={14} /> TypeScript
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
                      <Cpu size={14} /> C/C++
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-700 dark:text-neutral-300 transition-colors duration-300">
                      <Database size={14} /> Docker
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 4. Stats/GitHub Card (Square) */}
          <BentoCard delay={0.4} className="md:col-span-1 lg:col-span-1 row-span-1">
             <div className="flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Activity</h3>
                  <GitCommit size={16} className="text-neutral-600" />
                </div>
                
                <div className="flex-1 flex flex-col justify-end">
                  <div className="text-3xl font-clash font-black text-black dark:text-white mb-2 transition-colors duration-300">1.2k+</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Contributions last year</div>
                  
                  {/* Abstract Graph */}
                  <div className="grid grid-cols-7 gap-1.5 mt-4">
                    {Array.from({ length: 14 }).map((_, i) => {
                      const isActive = Math.random() > 0.4;
                      return (
                        <div 
                          key={i} 
                          className={`w-full aspect-square rounded-sm ${isActive ? 'bg-accent-green/60' : 'bg-neutral-200 dark:bg-neutral-800'}`}
                        />
                      )
                    })}
                  </div>
                </div>
             </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
