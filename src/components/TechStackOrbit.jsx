import React, { useState, useEffect, useRef, useCallback } from 'react';

// Extended tech list based on user request to make it fuller
const techs = [
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'Nest.js', slug: 'nestjs', color: '#E0234E' },
  { name: 'React', slug: 'react', color: '#61DAFB' },
  { name: 'Prisma', slug: 'prisma', color: '#5A67D8' },
  { name: 'C', slug: 'c', color: '#A8B9CC' },
  { name: 'C++98', slug: 'cplusplus', color: '#00599C' },
  { name: 'Ubuntu', slug: 'ubuntu', color: '#E95420' },
  { name: 'Docker', slug: 'docker', color: '#2496ED' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
  { name: 'Figma', slug: 'figma', color: '#F24E1E' },
  { name: 'GitHub', slug: 'github', color: '#181717' },
];

export default function TechStackOrbit() {
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  
  // Rotation State
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  
  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);
  
  // Speed of auto-rotation
  const autoRotateSpeed = 0.5;

  // Animation Loop for Auto Rotation
  const animate = useCallback(() => {
    if (!isDragging) {
      setRotationY(prev => prev + autoRotateSpeed);
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [isDragging]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  // Drag Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setLastMouseX(clientX);
    setLastMouseY(clientY);
    
    // Stop cursor interaction with elements inside while dragging
    document.body.style.userSelect = 'none';
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - lastMouseX;
    const deltaY = clientY - lastMouseY;
    
    setRotationY(prev => prev + deltaX * 0.5);
    setRotationX(prev => prev - deltaY * 0.5); // Negative for intuitive drag
    
    setLastMouseX(clientX);
    setLastMouseY(clientY);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = 'auto';
  };

  // Generate Sphere Coordinates using Fibonacci Sphere
  const radius = 120; // Scaled down for bento card
  
  const generateSphereCoords = () => {
    const coords = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < techs.length; i++) {
      const y = 1 - (i / (techs.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      coords.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        ...techs[i]
      });
    }
    return coords;
  };

  const items = generateSphereCoords();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
      {/* Background Star Dots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div 
        ref={containerRef}
        className="relative w-full h-[300px] flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{ perspective: '800px' }}
      >
        <div 
          className="relative w-full h-full transform-style-preserve-3d transition-transform duration-75 ease-out flex items-center justify-center"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
          }}
        >
          {/* Wireframe Sphere Grid */}
          <div className="absolute inset-0 m-auto w-[240px] h-[240px] rounded-full border border-neutral-400/20 dark:border-white/10 opacity-50 pointer-events-none" style={{ transform: 'rotateX(90deg)' }} />
          <div className="absolute inset-0 m-auto w-[240px] h-[240px] rounded-full border border-neutral-400/20 dark:border-white/10 opacity-50 pointer-events-none" style={{ transform: 'rotateY(45deg)' }} />
          <div className="absolute inset-0 m-auto w-[240px] h-[240px] rounded-full border border-neutral-400/20 dark:border-white/10 opacity-50 pointer-events-none" style={{ transform: 'rotateY(90deg)' }} />
          <div className="absolute inset-0 m-auto w-[240px] h-[240px] rounded-full border border-neutral-400/20 dark:border-white/10 opacity-50 pointer-events-none" style={{ transform: 'rotateY(135deg)' }} />

          {/* Glowing core */}
          <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

          {/* Tech Icons */}
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="absolute inset-0 m-auto w-10 h-10 md:w-12 md:h-12 rounded-2xl flex flex-col items-center justify-center group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translate3D(${item.x}px, ${item.y}px, ${item.z}px)`,
                }}
              >
                {/* Counter-rotation to keep icons facing camera */}
                <div 
                  className="w-full h-full transition-transform duration-300 group-hover:scale-125 flex items-center justify-center"
                  style={{
                    transform: `rotateY(${-rotationY}deg) rotateX(${-rotationX}deg)`,
                  }}
                >
                  {/* The actual icon content */}
                  <div className="relative flex flex-col items-center group/icon">
                    {/* Glowing shadow */}
                    <div 
                      className="absolute inset-0 blur-md opacity-0 group-hover/icon:opacity-80 transition-opacity duration-300 rounded-full" 
                      style={{ backgroundColor: item.color }} 
                    />
                    
                    {/* Hexagon wrapper */}
                    <div className="relative z-10 w-10 h-10 flex items-center justify-center pointer-events-none bg-white/80 dark:bg-black/50 rounded-xl border border-neutral-200 dark:border-white/10 p-2 backdrop-blur-sm">
                      <img 
                        src={item.slug === 'github' && document.documentElement.classList.contains('dark') ? `https://cdn.simpleicons.org/${item.slug}/white` : `https://cdn.simpleicons.org/${item.slug}/${encodeURIComponent(item.color.replace('#', ''))}`} 
                        alt={item.name}
                        className="w-full h-full object-contain filter drop-shadow-sm opacity-90 group-hover/icon:opacity-100 transition-opacity"
                        style={{ pointerEvents: 'none' }}
                      />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-[120%] opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-black dark:text-white bg-white/90 dark:bg-black/80 px-2 py-1 rounded-md backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-lg">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
