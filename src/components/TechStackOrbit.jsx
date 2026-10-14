import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useSpring, useMotionValue } from 'framer-motion';

const technologies = [
  { name: 'React', icon: 'react', color: '61DAFB' },
  { name: 'C++', icon: 'cplusplus', color: '00599C' },
  { name: 'Docker', icon: 'docker', color: '2496ED' },
  { name: 'Node.js', icon: 'nodedotjs', color: '339933' },
  { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
];

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
    let animationFrame;
    let lastFrame;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas);
    onResize();
    
    const render = (time) => {
      const elapsed = lastFrame === undefined ? 0 : Math.min(time - lastFrame, 64);
      lastFrame = time;
      if (pointerInteracting.current === null && !reducedMotion) {
        phi += elapsed * 0.0003;
      }
      globe.update({
        phi: phi + springR.get(),
        width,
        height: width,
      });
      animationFrame = requestAnimationFrame(render);
    };

    if (canvasRef.current) {
      // Configuration for a dark, glowing aesthetic globe
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.3,
        dark: 1, // 1 is dark, 0 is light
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1], // Pure white dots on dark bg looks best
        markerColor: [0.6, 0.2, 1], // Purple/blue glowing markers
        glowColor: [1, 1, 1], // White/bright glow surrounding
        markers: [
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.0060], size: 0.1 },
          { location: [51.5074, -0.1278], size: 0.08 },
          { location: [35.6895, 139.6917], size: 0.05 },
          { location: [31.7917, -7.0926], size: 0.1 }, // Morocco
        ],
      });
      animationFrame = requestAnimationFrame(render);
    }

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrame);
      if (globe) globe.destroy();
    };
  }, [springR]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none" />
      
      <div 
        className="w-[82%] aspect-square max-w-[320px] md:max-w-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing relative z-10"
        style={{ margin: "auto" }}
      >
        <canvas
          ref={canvasRef}
          aria-label="Rotating technology globe. Drag to rotate."
          role="img"
          onPointerDown={(e) => {
            if (!e.isPrimary) return;
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerUp={(e) => {
            pointerInteracting.current = null;
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
              e.currentTarget.releasePointerCapture(e.pointerId);
            }
          }}
          onPointerCancel={() => { pointerInteracting.current = null; }}
          onLostPointerCapture={() => { pointerInteracting.current = null; }}
          onPointerMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              r.set(delta / 200);
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            touchAction: "pan-y",
          }}
        />
      </div>

      <div className="tech-orbit-track" aria-hidden="true" />
      <ul className="absolute inset-0 z-20 pointer-events-none" aria-label="Technology stack">
        {technologies.map((tech, index) => (
          <li
            key={tech.icon}
            className="tech-orbit"
            style={{ '--orbit-delay': `${index * -6}s`, '--float-delay': `${index * -0.8}s` }}
          >
            <div className="tech-orbit-position">
              <div className="tech-orbit-upright">
                <div
                  className="tech-orbit-badge flex items-center justify-center rounded-xl border border-neutral-200 dark:border-white/15 bg-white/90 dark:bg-neutral-950/85 backdrop-blur-md shadow-lg"
                  title={tech.name}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
                    alt={tech.name}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
