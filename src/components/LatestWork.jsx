import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { Terminal, Code, Play, Cpu, Layers, ExternalLink, Sparkles, Users, LayoutDashboard, X } from 'lucide-react';
import IrcPreview from './previews/IrcPreview';
import Cub3dPreview from './previews/Cub3dPreview';
import SoLongPreview from './previews/SoLongPreview';
import MinishellPreview from './previews/MinishellPreview';
import InceptionPreview from './previews/InceptionPreview';
import PhilosophersPreview from './previews/PhilosophersPreview';
import CrmPreview from './previews/CrmPreview';

const projects = [
  {
    title: "ft_irc",
    description: "An Internet Relay Chat server built in C++98. Direct TCP/IP socket streams, channel multiplexing, and IRC command parsing.",
    tags: ["C++98", "Network"],
    date: "2026",
    github: "https://github.com/Souitaaa/ft_irc.git",
    demoVideoUrl: "/videos/ft_irc_demo.mp4",
    color: "from-neutral-400/20 via-neutral-400/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20",
    border: "border-neutral-800",
    icon: Terminal,
    previewType: "terminal",
    previewContent: <IrcPreview />
  },
  {
    title: "Cub3d",
    description: "A 3D raycasting engine written in C. Integrates custom DDA algorithms, texture projections, and MiniLibX graphics buffers.",
    tags: ["C", "Graphics"],
    date: "2025",
    github: "https://github.com/Souitaaa/Cub3d.git",
    color: "from-neutral-500/20 via-neutral-500/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20",
    border: "border-neutral-800",
    icon: Code,
    previewType: "graphics",
    previewContent: <Cub3dPreview />
  },
  {
    title: "so_long",
    description: "An animated 2D top-down maze-based game written in C. Sprite mappings, clean map parsers, and custom physics frames.",
    tags: ["C", "Game Dev"],
    date: "2025",
    github: "https://github.com/Souitaaa/so_long.git",
    color: "from-neutral-600/20 via-neutral-600/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20",
    border: "border-neutral-800",
    icon: Play,
    previewType: "game",
    previewContent: <SoLongPreview />
  },
  {
    title: "minishell",
    description: "A complete Unix command-line shell written in C. Pipe streams, redirections, env variable parsers, and signal triggers.",
    tags: ["C", "POSIX"],
    date: "2025",
    github: "https://github.com/Souitaaa/minishell.git",
    color: "from-neutral-300/20 via-neutral-300/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20",
    border: "border-neutral-800",
    icon: Cpu,
    previewType: "terminal",
    previewContent: <MinishellPreview />
  },
  {
    title: "Inception",
    description: "Docker-based virtualization infrastructure project. Implements multi-container services with secure SSL certificates.",
    tags: ["Docker", "DevOps"],
    date: "2026",
    github: "https://github.com/Souitaaa/inception.git",
    color: "from-neutral-700/20 via-neutral-700/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20",
    border: "border-neutral-800",
    icon: Layers,
    previewType: "infrastructure",
    previewContent: <InceptionPreview />
  },
  {
    title: "Philosophers",
    description: "A concurrent programming simulation exploring the Dining Philosophers problem using C threads and mutexes.",
    tags: ["C", "Concurrency"],
    date: "2025",
    github: "https://github.com/Souitaaa/Philosophers.git",
    color: "from-neutral-400/20 via-neutral-400/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20",
    border: "border-neutral-800",
    icon: Users,
    previewType: "simulation",
    previewContent: <PhilosophersPreview />
  },
  {
    title: "Mycel CRM",
    description: "A comprehensive Customer Relationship Management platform built for freelancers to track clients, invoices, and project boards.",
    tags: ["React", "TypeScript", "Fullstack"],
    date: "2026",
    github: "https://github.com/solacode-SC/Mycel-Freelancer-CRM.git",
    color: "from-neutral-500/20 via-neutral-500/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.1)] border-white/20",
    border: "border-neutral-800",
    icon: LayoutDashboard,
    previewType: "dashboard",
    previewContent: <CrmPreview />
  }
];

const ProjectCard = ({ project, index, openVideoModal }) => {
  const Icon = project.icon;

  // Stacking logic calculations
  // `top` defines where the card sticks when scrolling
  const topOffset = 100 + (index * 40); 
  const zIndex = index + 10;

  return (
    <div
      className="sticky w-full h-[450px] md:h-[500px] rounded-[32px] md:rounded-[48px] bg-white dark:bg-[#0d0d0e] border border-neutral-200 dark:border-neutral-800 shadow-xl dark:shadow-2xl flex flex-col lg:flex-row overflow-hidden mb-12 transition-all duration-300"
      style={{
        top: `${topOffset}px`,
        zIndex: zIndex,
      }}
    >
      {/* Background ambient gradient light inside each card */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 pointer-events-none z-0`} />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        
        {/* Left Side: Info */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-between p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-sm transition-colors duration-300">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 md:p-4 bg-white/40 dark:bg-background-inner/50 backdrop-blur-md rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 relative z-10 text-neutral-600 dark:text-neutral-300 shadow-inner">
                <Icon size={28} />
              </div>
              <div className="text-neutral-500 dark:text-white/40 font-mono text-sm font-bold tracking-widest bg-neutral-100/50 dark:bg-white/5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/5">
                {project.date}
              </div>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black font-clash text-black dark:text-white tracking-tight mb-4 transition-colors duration-300">
              {project.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded-full text-xs font-bold tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-sans line-clamp-3 transition-colors duration-300">
              {project.description}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto pointer-events-auto">
            <motion.button
              onClick={() => openVideoModal(project)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              Live Demo <Play size={14} fill="currentColor" />
            </motion.button>

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-transparent border border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
            >
              Source <Code size={14} />
            </motion.a>
          </div>
        </div>

        {/* Right Side: Visual Preview */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative flex items-center justify-center p-6 bg-neutral-100/60 dark:bg-black/60 transition-colors duration-300">
          <div className="w-full h-full max-h-[300px] border border-neutral-300/80 dark:border-neutral-800/80 rounded-2xl md:rounded-3xl bg-white dark:bg-[#090909] shadow-xl dark:shadow-2xl overflow-hidden flex items-center justify-center relative transition-colors duration-300">
            {project.previewContent}
          </div>
        </div>

      </div>
    </div>
  );
};

const ProjectNavMenu = ({ projects, indicatorHeight, activeIndex }) => {
  return (
    <div className="flex flex-col w-full sticky top-[100px]">
      <div className="relative pl-10">
        
        {/* Timeline Track - Continuous Line */}
        <div className="absolute left-[8px] top-[10px] bottom-[30px] w-[2px] bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-black dark:bg-white rounded-full shadow-[0_0_12px_rgba(0,0,0,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.7)]"
            style={{ height: indicatorHeight }}
          />
        </div>

        {/* Project List */}
        <div className="flex flex-col gap-6 w-full">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={index}
                className={`flex flex-col border-b border-neutral-200 dark:border-neutral-900/60 pb-6 last:border-0 relative transition-all duration-500 group ${isActive ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
              >
                {/* Subtle base dot for all items */}
                <div className="absolute -left-[35px] top-[10px] w-[8px] h-[8px] rounded-full z-10 bg-transparent border border-neutral-400 dark:border-neutral-600 transition-colors duration-300" />

                {/* The glowing Motion Dot that snaps to the active item */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTimelineDot"
                    className="absolute -left-[38px] top-[7px] w-[14px] h-[14px] rounded-full z-20 bg-black dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}

                <h4 className={`text-lg md:text-xl font-clash font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-black dark:text-white translate-x-2' : 'text-neutral-700 dark:text-neutral-400'}`}>
                  {project.title}
                </h4>
                <p className={`text-xs font-mono mt-1 transition-all duration-300 ${isActive ? 'text-neutral-500 translate-x-2' : 'text-neutral-600 dark:text-neutral-600'}`}>
                  {project.tags.join(" • ")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Projects Link */}
      <a 
        href="https://github.com/Souitaaa?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between group cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/5 p-4 rounded-xl transition-all duration-300 -ml-4"
      >
        <span className="text-sm font-bold tracking-widest uppercase font-mono text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">
          View All Projects
        </span>
        <Sparkles size={18} className="text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
      </a>
    </div>
  );
};

export default function LatestWork() {
  const containerRef = useRef(null);
  const [activeVideoProject, setActiveVideoProject] = useState(null);

  useEffect(() => {
    if (activeVideoProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveVideoProject(null);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeVideoProject]);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (projects.length - 1));
    if (index < 0) index = 0;
    if (index >= projects.length) index = projects.length - 1;
    setActiveIndex(index);
  });

  const indicatorHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full bg-white dark:bg-[#000000] py-24 md:py-32 font-inter select-none transition-colors duration-300">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden dark:block">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:20px_24px] opacity-50" />

        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-neutral-500/5 blur-[150px]" />
      </div>

      {/* Content Wrapper - 3 Column Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row h-full px-6 md:px-12 gap-12">
        
        {/* Center Stage (70%) */}
        <div className="w-full lg:w-[70%] relative z-10">
          
          {/* Section Header */}
          <div className="relative z-10 w-full mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 dark:border-neutral-900/60 pb-6 shrink-0 transition-colors duration-300">
            <div>
              <span className="text-accent-red font-mono text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-clash mt-1 tracking-tight text-black dark:text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-100 dark:to-neutral-400">
                SELECTED PROJECTS.
              </h2>
            </div>
            <p className="text-neutral-500 text-xs md:text-sm mt-4 md:mt-0 font-mono bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800/40 rounded-full px-4 py-1.5 backdrop-blur-sm transition-colors duration-300">
              [ SCROLL DECK ]
            </p>
          </div>

          {/* 3D Stacked Cards Container */}
          <div className="relative z-10 w-full max-w-4xl mx-auto" ref={containerRef}>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                index={index}
                project={project}
                openVideoModal={setActiveVideoProject}
              />
            ))}
          </div>
        </div>

        {/* Right Navigation Menu (30%) */}
        <div className="hidden lg:block w-[30%] relative z-10 pl-10 transition-colors duration-300">
          <ProjectNavMenu projects={projects} indicatorHeight={indicatorHeight} activeIndex={activeIndex} />
        </div>
        
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideoProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
              onClick={() => setActiveVideoProject(null)} 
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm z-10">
                <div className="flex flex-col">
                  <h3 className="text-white font-clash font-bold text-xl md:text-2xl">{activeVideoProject.title} — Live Demo</h3>
                  <span className="text-neutral-400 font-mono text-xs mt-1">
                    {activeVideoProject.demoVideoUrl ? "Recorded Session" : "Interactive Preview"}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideoProject(null)}
                  className="p-2 bg-neutral-800/50 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Video Player or Interactive Preview */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                {activeVideoProject.demoVideoUrl ? (
                  <video
                    src={activeVideoProject.demoVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full p-4 md:p-8 flex items-center justify-center bg-[#090909]">
                    {activeVideoProject.previewContent}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
