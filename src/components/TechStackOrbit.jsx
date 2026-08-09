import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useSpring, useMotionValue } from 'framer-motion';

export default function TechStackOrbit() {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  
  const r = useMotionValue(0);
  const springR = useSpring(r, {
    mass: 1,
    stiffness: 280,
    damping: 40,
    restDelta: 0.001
  });

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let globe;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    
    const onRender = (state) => {
      if (!pointerInteracting.current) {
        phi += 0.005; // auto-rotation speed
      }
      state.phi = phi + springR.get();
      state.width = width * 2;
      state.height = width * 2;
    };

    if (canvasRef.current) {
      // Configuration for a dark, glowing aesthetic globe
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1, // 1 is dark, 0 is light
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1], // Pure white dots on dark bg looks best
        markerColor: [0.6, 0.2, 1], // Purple/blue glowing markers
        glowColor: [1.2, 1.2, 1.2], // White/bright glow surrounding
        markers: [
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.0060], size: 0.1 },
          { location: [51.5074, -0.1278], size: 0.08 },
          { location: [35.6895, 139.6917], size: 0.05 },
          { location: [31.7917, -7.0926], size: 0.1 }, // Morocco
        ],
        onRender,
      });
    }

    return () => {
      window.removeEventListener('resize', onResize);
      if (globe) globe.destroy();
    };
  }, [r]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none" />
      
      <div 
        className="w-full aspect-square max-w-[320px] md:max-w-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing relative z-10"
        style={{ margin: "auto" }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            canvasRef.current.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              r.set(delta / 200);
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              r.set(delta / 100);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            opacity: 0,
            animation: "fade-in 1s ease forwards",
          }}
        />
      </div>

      {/* Floating Tech Stack Badges to keep the "Tech Stack Orbit" context */}
      <div className="absolute top-[10%] left-[10%] p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hidden md:flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer z-20 hover:border-white/30 hover:bg-white/10 group">
         <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="w-6 h-6 opacity-90 drop-shadow-[0_0_8px_rgba(97,218,251,0.5)] group-hover:opacity-100" /> 
      </div>
      
      <div className="absolute bottom-[10%] right-[10%] p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hidden md:flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer z-20 hover:border-white/30 hover:bg-white/10 group">
         <img src="https://cdn.simpleicons.org/cplusplus/00599C" alt="C++98" className="w-6 h-6 opacity-90 drop-shadow-[0_0_8px_rgba(0,89,156,0.5)] group-hover:opacity-100" /> 
      </div>

      <div className="absolute top-[45%] left-[3%] p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hidden md:flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer z-20 hover:border-white/30 hover:bg-white/10 group">
         <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" className="w-6 h-6 opacity-90 drop-shadow-[0_0_8px_rgba(36,150,237,0.5)] group-hover:opacity-100" /> 
      </div>

      <div className="absolute top-[20%] right-[3%] p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hidden md:flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer z-20 hover:border-white/30 hover:bg-white/10 group">
         <img src="https://cdn.simpleicons.org/nodedotjs/339933" alt="Node.js" className="w-6 h-6 opacity-90 drop-shadow-[0_0_8px_rgba(51,153,51,0.5)] group-hover:opacity-100" /> 
      </div>
      
      <div className="absolute bottom-[20%] left-[12%] p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hidden md:flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer z-20 hover:border-white/30 hover:bg-white/10 group">
         <img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" className="w-6 h-6 opacity-90 drop-shadow-[0_0_8px_rgba(49,120,198,0.5)] group-hover:opacity-100" /> 
      </div>
      
      {/* Inline styles for the fade-in animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
