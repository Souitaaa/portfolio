import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

export default function SoLongPreview() {
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [collectibles, setCollectibles] = useState([
    { x: 4, y: 1, collected: false },
    { x: 1, y: 2, collected: false },
    { x: 3, y: 2, collected: false }
  ]);
  const [moves, setMoves] = useState(0);

  // 0: wall, 1: floor, 2: exit (E)
  const map = [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 2, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  const handleMove = useCallback((dx, dy) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (map[newY][newX] !== 0) {
      // It's not a wall
      setPlayerPos({ x: newX, y: newY });
      setMoves(m => m + 1);

      // Check collectibles
      setCollectibles(prev => prev.map(c => 
        (c.x === newX && c.y === newY) ? { ...c, collected: true } : c
      ));
    }
  }, [playerPos, map]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only trigger if focus is on the container or we just want global keys (maybe limit to prevent scrolling issues)
      // Since it's a preview, we'll rely on the on-screen buttons to avoid scroll-jacking the whole page
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCollected = collectibles.filter(c => c.collected).length;
  const isFinished = map[playerPos.y][playerPos.x] === 2 && totalCollected === 3;

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 select-none">
      <div className="flex justify-between text-[10px] md:text-xs font-mono text-neutral-500">
        <span className="text-accent-green font-bold">moves: {moves.toString().padStart(3, '0')}</span>
        <span className={totalCollected === 3 ? 'text-accent-green font-bold' : ''}>collect: {totalCollected}/3</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative mt-2">
        <div className="grid grid-rows-5 gap-1">
          {map.map((row, y) => (
            <div key={y} className="flex gap-1">
              {row.map((cell, x) => {
                const isPlayer = playerPos.x === x && playerPos.y === y;
                const isCollectible = collectibles.find(c => c.x === x && c.y === y && !c.collected);
                const isExit = cell === 2;

                let cellClass = 'w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg border ';
                
                if (isPlayer) {
                  cellClass += 'bg-accent-green/80 border-accent-green shadow-[0_0_12px_rgba(133,194,7,0.6)] z-10 ';
                } else if (isCollectible) {
                  cellClass += 'bg-accent-red/80 border-accent-red shadow-[0_0_12px_rgba(255,70,46,0.5)] animate-pulse ';
                } else if (isExit) {
                  cellClass += totalCollected === 3 ? 'bg-accent-purple/80 border-accent-purple shadow-[0_0_12px_rgba(114,99,230,0.5)] ' : 'bg-neutral-800 border-neutral-700 ';
                } else if (cell === 0) {
                  cellClass += 'border-neutral-900 bg-neutral-950 ';
                } else {
                  cellClass += 'border-neutral-800/50 bg-transparent ';
                }

                return <div key={`${x}-${y}`} className={cellClass} />;
              })}
            </div>
          ))}
        </div>

        {/* On-screen controls */}
        <div className="absolute -bottom-2 right-0 grid grid-cols-3 gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <div></div>
          <button onClick={() => handleMove(0, -1)} className="p-2 bg-neutral-900 rounded-md border border-neutral-800 text-neutral-400 hover:text-white"><ArrowUp size={14}/></button>
          <div></div>
          <button onClick={() => handleMove(-1, 0)} className="p-2 bg-neutral-900 rounded-md border border-neutral-800 text-neutral-400 hover:text-white"><ArrowLeft size={14}/></button>
          <button onClick={() => handleMove(0, 1)} className="p-2 bg-neutral-900 rounded-md border border-neutral-800 text-neutral-400 hover:text-white"><ArrowDown size={14}/></button>
          <button onClick={() => handleMove(1, 0)} className="p-2 bg-neutral-900 rounded-md border border-neutral-800 text-neutral-400 hover:text-white"><ArrowRight size={14}/></button>
        </div>
      </div>

      {isFinished && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-20">
          <div className="text-center font-mono">
            <div className="text-accent-green font-bold text-lg mb-2">MAP CLEARED!</div>
            <button 
              onClick={() => { setPlayerPos({x:1, y:1}); setCollectibles(collectibles.map(c=>({...c, collected:false}))); setMoves(0); }}
              className="text-xs bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors text-white"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
