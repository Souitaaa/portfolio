import React from 'react';
import { Terminal, Code, Play, Cpu, Layers, ExternalLink, Sparkles, Users, LayoutDashboard } from 'lucide-react';
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
    color: "from-accent-red/20 via-accent-red/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(255,70,46,0.15)] border-accent-red/40",
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
    color: "from-accent-purple/20 via-accent-purple/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(114,99,230,0.15)] border-accent-purple/40",
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
    color: "from-accent-green/20 via-accent-green/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(133,194,7,0.15)] border-accent-green/40",
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
    color: "from-accent-blue/20 via-accent-blue/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(0,157,255,0.15)] border-accent-blue/40",
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
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.05)] border-white/20",
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
    color: "from-orange-500/20 via-orange-500/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(249,115,22,0.15)] border-orange-500/40",
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
    color: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    glow: "shadow-[0_0_40px_rgba(16,185,129,0.15)] border-emerald-500/40",
    border: "border-neutral-800",
    icon: LayoutDashboard,
    previewType: "dashboard",
    previewContent: <CrmPreview />
  }
];

const ProjectCard = ({ project, index }) => {
  const Icon = project.icon;

  // Stacking logic calculations
  // `top` defines where the card sticks when scrolling
  const topOffset = 100 + (index * 40); 
  const zIndex = index + 10;

  return (
    <div
      className="sticky w-full h-[450px] md:h-[500px] rounded-[32px] md:rounded-[48px] bg-[#0d0d0e] border border-neutral-800 shadow-2xl flex flex-col lg:flex-row overflow-hidden mb-12 transition-all duration-300"
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
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-between p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/40 backdrop-blur-sm">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 md:p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 text-neutral-300 shadow-inner">
                <Icon size={28} />
              </div>
              <div className="text-white/40 font-mono text-sm font-bold tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                {project.date}
              </div>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black font-clash text-white tracking-tight mb-4">
              {project.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded-full text-xs font-bold tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="mt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors duration-300 pointer-events-auto"
            >
              View Source <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Right Side: Visual Preview */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative flex items-center justify-center p-6 bg-black/60">
          <div className="w-full h-full max-h-[300px] border border-neutral-800/80 rounded-2xl md:rounded-3xl bg-[#090909] shadow-2xl overflow-hidden flex items-center justify-center relative">
            {project.previewContent}
          </div>
        </div>

      </div>
    </div>
  );
};

const ProjectNavMenu = ({ projects }) => {
  return (
    <div className="flex flex-col gap-6 w-full sticky top-[100px]">
      {projects.map((project, index) => {
        return (
          <div 
            key={index}
            className="flex flex-col border-b border-neutral-900/60 pb-6 last:border-0 relative opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <h4 className="text-lg md:text-xl font-clash font-bold tracking-wide text-neutral-300 hover:text-white transition-colors duration-300">
              {project.title}
            </h4>
            <p className="text-xs font-mono text-neutral-500 mt-1">
              {project.tags.join(" • ")}
            </p>
          </div>
        );
      })}

      {/* View All Projects Link */}
      <a 
        href="https://github.com/Souitaaa?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 pt-6 border-t border-neutral-800 flex items-center justify-between group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all duration-300 -ml-4"
      >
        <span className="text-sm font-bold tracking-widest uppercase font-mono text-neutral-400 group-hover:text-white transition-colors">
          View All Projects
        </span>
        <Sparkles size={18} className="text-neutral-500 group-hover:text-white transition-colors" />
      </a>
    </div>
  );
};

export default function LatestWork() {
  return (
    <section className="relative w-full bg-[#000000] py-24 md:py-32 font-inter select-none">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:20px_24px] opacity-50" />

        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-red/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-blue/5 blur-[150px]" />
      </div>

      {/* Content Wrapper - 3 Column Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row h-full px-6 md:px-12 gap-12">
        
        {/* Center Stage (70%) */}
        <div className="w-full lg:w-[70%] relative z-10">
          
          {/* Section Header */}
          <div className="relative z-10 w-full mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900/60 pb-6 shrink-0">
            <div>
              <span className="text-accent-red font-mono text-xs md:text-sm font-black uppercase tracking-[0.2em]">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-clash mt-1 tracking-tight text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                SELECTED PROJECTS.
              </h2>
            </div>
            <p className="text-neutral-500 text-xs md:text-sm mt-4 md:mt-0 font-mono bg-neutral-900/50 border border-neutral-800/40 rounded-full px-4 py-1.5 backdrop-blur-sm">
              [ SCROLL DECK ]
            </p>
          </div>

          {/* 3D Stacked Cards Container */}
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                index={index}
                project={project}
              />
            ))}
          </div>
        </div>

        {/* Right Navigation Menu (30%) */}
        <div className="hidden lg:block w-[30%] relative z-10 border-l border-neutral-900/60 pl-10">
          <ProjectNavMenu projects={projects} />
        </div>
        
      </div>
    </section>
  );
}
