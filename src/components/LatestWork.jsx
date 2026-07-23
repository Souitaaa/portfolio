import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Code, Play, Cpu, Layers, ExternalLink, Sparkles } from 'lucide-react';

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
    previewContent: (
      <div className="flex flex-col gap-2 text-[10px] md:text-xs font-mono leading-relaxed select-text p-4 w-full">
        <div className="text-neutral-600">// Booting IRC server on port 6667...</div>
        <div><span className="text-accent-red">➜</span> <span className="text-neutral-300">[SOCKET]</span> Bind successful. Listening...</div>
        <div><span className="text-accent-red">➜</span> <span className="text-accent-green">client_1</span> joined channel <span className="text-accent-purple">#42network</span></div>
        <div><span className="text-neutral-500">client_1:</span> <span className="text-neutral-300">"hello world!"</span></div>
      </div>
    )
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
    previewContent: (
      <div className="w-full h-full relative flex flex-col justify-between p-4 font-mono">
        <div className="flex justify-between text-[10px] md:text-xs text-neutral-500">
          <span>fov: 60°</span>
          <span className="text-accent-purple animate-pulse">RENDER_ACTIVE</span>
        </div>
        <div className="flex-1 flex items-end justify-center pb-4">
          <div className="w-full h-24 flex items-end gap-2 justify-center">
            {[3, 6, 11, 15, 22, 27, 32, 27, 22, 15, 11, 6, 3].map((h, i) => (
              <div 
                key={i} 
                style={{ height: `${h * 3}px` }} 
                className="w-2 md:w-3 bg-gradient-to-t from-accent-purple/20 via-accent-purple/60 to-accent-purple rounded-full shadow-[0_0_10px_rgba(114,99,230,0.3)]"
              />
            ))}
          </div>
        </div>
        <div className="text-[10px] md:text-xs text-neutral-600 text-center uppercase tracking-widest">[ray_matrix_ok]</div>
      </div>
    )
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
    previewContent: (
      <div className="w-full h-full flex flex-col justify-between p-4">
        <div className="flex justify-between text-[10px] md:text-xs font-mono text-neutral-500">
          <span className="text-accent-green font-bold">moves: 014</span>
          <span>collect: 3/3</span>
        </div>
        <div className="grid grid-cols-6 gap-2 p-2 flex-1 items-center justify-center">
          {Array(18).fill(0).map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-md md:rounded-lg border ${
                i === 4 ? 'bg-accent-green/80 border-accent-green shadow-[0_0_12px_rgba(133,194,7,0.6)] animate-pulse' : 
                i === 11 ? 'bg-accent-red/80 border-accent-red shadow-[0_0_12px_rgba(255,70,46,0.5)]' : 
                'border-neutral-900 bg-neutral-950'
              }`} 
            />
          ))}
        </div>
      </div>
    )
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
    previewContent: (
      <div className="flex flex-col gap-2 text-[10px] md:text-xs font-mono leading-relaxed select-text p-4 w-full">
        <div><span className="text-accent-blue">sharaf_shell$</span> <span className="text-neutral-300">cat config.json | grep "host"</span></div>
        <div className="text-neutral-500">"host": "127.0.0.1",</div>
        <div><span className="text-accent-blue">sharaf_shell$</span> <span className="text-neutral-300">echo $STATUS</span></div>
        <div className="text-accent-green">SUCCESS (0)</div>
        <div><span className="text-accent-blue">sharaf_shell$</span> <span className="text-accent-blue animate-pulse">▋</span></div>
      </div>
    )
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
    previewContent: (
      <div className="w-full h-full flex flex-col justify-center gap-4 p-4 font-mono text-[10px] md:text-xs text-neutral-400">
        <div className="flex justify-around items-center gap-2">
          <div className="p-2 md:p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg flex flex-col items-center">
            <span className="text-accent-blue font-bold">Nginx</span>
            <span className="text-[8px] md:text-[10px] text-neutral-500">Port 443</span>
          </div>
          <div className="text-neutral-800">►</div>
          <div className="p-2 md:p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg flex flex-col items-center">
            <span className="text-accent-purple font-bold">WordPress</span>
            <span className="text-[8px] md:text-[10px] text-neutral-500">FPM</span>
          </div>
          <div className="text-neutral-800">►</div>
          <div className="p-2 md:p-3 bg-neutral-900/80 border border-neutral-800 rounded-lg flex flex-col items-center">
            <span className="text-accent-green font-bold">MariaDB</span>
            <span className="text-[8px] md:text-[10px] text-neutral-500">Port 3306</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-[8px] md:text-[10px] text-accent-green">
          <span className="w-2 h-2 bg-accent-green rounded-full animate-ping"></span>
          <span>DOCKER CONTAINERS SECURED</span>
        </div>
      </div>
    )
  }
];

const ProjectCard = ({ project, index, scrollYProgress, totalProjects }) => {
  const Icon = project.icon;

  // Map the 0-1 scroll progress to a 0 to (totalProjects - 1) active index.
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, totalProjects - 1]);

  // Use array-based transforms to define exact states for each relative position
  const scale = useTransform(
    activeIndex,
    [index - 3, index - 2, index - 1, index, index + 1],
    [0.85, 0.9, 0.95, 1, 0.9] // Cards behind scale down; animating out scales slightly back
  );

  const y = useTransform(
    activeIndex,
    [index - 3, index - 2, index - 1, index, index + 0.3, index + 1],
    [-120, -80, -40, 0, -200, -1000] // Cards behind translate up slightly; active card slides up and away fast
  );

  const opacity = useTransform(
    activeIndex,
    [index, index + 0.3, index + 1],
    [1, 0, 0] // Active card fades out as it animates up
  );

  const overlayOpacity = useTransform(
    activeIndex,
    [index - 3, index - 2, index - 1, index],
    [0.7, 0.5, 0.3, 0] // Background cards have darker overlays, front card has none
  );

  // Z-index ensures natural stacking: card 0 is on top initially, card 4 is on the bottom
  const zIndex = totalProjects - index;

  return (
    <motion.div
      className="absolute top-0 w-full h-[450px] md:h-[500px] rounded-[32px] md:rounded-[48px] bg-[#0d0d0e] border border-neutral-800 shadow-2xl flex flex-col lg:flex-row overflow-hidden will-change-transform"
      style={{
        scale,
        y,
        opacity,
        zIndex,
        transformOrigin: "bottom center"
      }}
    >
      {/* Background ambient gradient light inside each card */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 pointer-events-none z-0`} />

      {/* Visual Dimming/Overlay for background cards */}
      <motion.div 
        className="absolute inset-0 bg-black z-50 pointer-events-none rounded-[32px] md:rounded-[48px]"
        style={{ opacity: overlayOpacity }}
      />

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
    </motion.div>
  );
};

const ProjectNavMenu = ({ projects, scrollYProgress }) => {
  const totalProjects = projects.length;
  // Map 0-1 scroll progress to active index
  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, totalProjects - 1]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {projects.map((project, index) => {
        // The project is active when activeIndex is roughly equal to its index.
        const isActive = useTransform(
          activeIndex,
          [index - 0.5, index, index + 0.5],
          [0, 1, 0] // 1 when active, 0 otherwise
        );

        const opacity = useTransform(
          activeIndex,
          [index - 0.5, index, index + 0.5],
          [0.3, 1, 0.3]
        );

        const color = useTransform(
          activeIndex,
          [index - 0.5, index, index + 0.5],
          ["#525252", "#ffffff", "#525252"] // text-neutral-500 to text-white
        );

        return (
          <motion.div 
            key={index}
            className="flex flex-col border-b border-neutral-900/60 pb-6 last:border-0 relative"
            style={{ opacity }}
          >
            {/* Active Indicator */}
            <motion.div 
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ opacity: isActive }}
            />
            
            <motion.h4 
              className="text-lg md:text-xl font-clash font-bold tracking-wide"
              style={{ color }}
            >
              {project.title}
            </motion.h4>
            <p className="text-xs font-mono text-neutral-500 mt-1">
              {project.tags.join(" • ")}
            </p>
          </motion.div>
        );
      })}

      {/* View All Projects Link */}
      <div className="mt-4 pt-6 border-t border-neutral-800 flex items-center justify-between group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all duration-300 -ml-4">
        <span className="text-sm font-bold tracking-widest uppercase font-mono text-neutral-400 group-hover:text-white transition-colors">
          View All Projects
        </span>
        <Sparkles size={18} className="text-neutral-500 group-hover:text-white transition-colors" />
      </div>
    </div>
  );
};

export default function LatestWork() {
  const containerRef = useRef(null);

  // Track scroll progress of the massive parent container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // 1. The Pinned Container (Crucial): Massive height based on number of projects
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#000000]" 
      style={{ height: `${projects.length * 100}vh` }}
    >
      
      {/* 2. The Sticky Wrapper: position: sticky; top: 0; height: 100vh; overflow: hidden; */}
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex flex-col justify-center items-center font-inter select-none">
        
        {/* Ambient backgrounds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:20px_24px] opacity-50" />

          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-red/5 blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-blue/5 blur-[150px]" />
        </div>

        {/* Content Wrapper - 3 Column Layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row h-full justify-between items-center px-6 md:px-12 py-12 gap-12">
          
          {/* Center Stage (70%) */}
          <div className="w-full lg:w-[70%] h-full flex flex-col justify-center relative z-10">
            {/* Background Typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] lg:text-[10vw] font-black font-clash tracking-tighter text-[#080808] pointer-events-none select-none whitespace-nowrap z-0 w-full text-center">
              LATEST WORKS
            </div>
            
            {/* Section Header */}
            <div className="relative z-10 w-full mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900/60 pb-6 shrink-0">
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
            <div className="relative z-10 w-full max-w-4xl mx-auto h-[450px] md:h-[500px] perspective-1000 mt-4 md:mt-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  index={index}
                  project={project}
                  scrollYProgress={scrollYProgress}
                  totalProjects={projects.length}
                />
              ))}
            </div>
          </div>

          {/* Right Navigation Menu (30%) */}
          <div className="hidden lg:flex w-[30%] h-full flex-col justify-center relative z-10 border-l border-neutral-900/60 pl-10">
            <ProjectNavMenu projects={projects} scrollYProgress={scrollYProgress} />
          </div>
          
        </div>
      </div>
    </section>
  );
}
