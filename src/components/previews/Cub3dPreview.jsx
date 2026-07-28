import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Cub3dPreview() {
  const [offset, setOffset] = useState(0);

  // A fixed array of "wall heights" representing the raycasted world
  const worldMap = [
    3, 6, 11, 15, 22, 27, 32, 27, 22, 15, 11, 6, 3, 
    2, 4, 8, 12, 18, 24, 28, 24, 18, 12, 8, 4, 2,
    5, 10, 15, 20, 25, 30, 25, 20, 15, 10, 5, 2, 1
  ];

  const handleLeft = () => setOffset(prev => (prev - 1 + worldMap.length) % worldMap.length);
  const handleRight = () => setOffset(prev => (prev + 1) % worldMap.length);

  // Get a slice of the map to display (13 columns)
  const getVisibleMap = () => {
    let visible = [];
    for (let i = 0; i < 13; i++) {
      visible.push(worldMap[(offset + i) % worldMap.length]);
    }
    return visible;
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-between p-4 font-mono select-none">
      <div className="flex justify-between text-[10px] md:text-xs text-neutral-500">
        <span>fov: 60°</span>
        <span className="text-accent-purple animate-pulse">RENDER_ACTIVE</span>
      </div>
      
      <div className="flex-1 flex items-end justify-center pb-8 relative group">
        {/* Sky / Floor horizon line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent-purple/20 -z-10"></div>
        
        <div className="w-full h-24 flex items-end gap-2 justify-center transition-all duration-300">
          {getVisibleMap().map((h, i) => (
            <div 
              key={i} 
              style={{ height: `${h * 3}px` }} 
              className="w-2 md:w-3 bg-gradient-to-t from-accent-purple/20 via-accent-purple/60 to-accent-purple rounded-full shadow-[0_0_10px_rgba(114,99,230,0.3)] transition-all duration-300"
            />
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button onClick={handleLeft} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors">
             <ArrowLeft size={16} />
           </button>
           <button onClick={handleRight} className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors">
             <ArrowRight size={16} />
           </button>
        </div>
      </div>
      
      <div className="text-[10px] md:text-xs text-neutral-600 text-center uppercase tracking-widest">[ray_matrix_ok]</div>
    </div>
  );
}
