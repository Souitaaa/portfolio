import React, { useState, useEffect } from 'react';

export default function PhilosophersPreview() {
  const [isRunning, setIsRunning] = useState(false);
  const [philosophers, setPhilosophers] = useState(Array(5).fill('thinking'));

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setPhilosophers(prev => {
          const newPhilo = [...prev];
          // Pick a random philosopher and change their state
          const index = Math.floor(Math.random() * 5);
          const states = ['thinking', 'eating', 'sleeping'];
          newPhilo[index] = states[Math.floor(Math.random() * states.length)];
          return newPhilo;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const getStateColor = (state) => {
    switch (state) {
      case 'eating': return 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]';
      case 'sleeping': return 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]';
      default: return 'bg-neutral-700'; // thinking
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-4 font-mono overflow-hidden select-none">
      <div className="absolute top-4 left-4 text-[10px] md:text-xs text-neutral-500">
        <span>THREADS: 5</span>
      </div>
      <button 
        onClick={() => setIsRunning(!isRunning)}
        className={`absolute top-4 right-4 text-[10px] md:text-xs px-3 py-1 rounded font-bold transition-colors ${isRunning ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'}`}
      >
        {isRunning ? 'STOP' : 'START'}
      </button>
      
      <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-neutral-800 flex items-center justify-center mt-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-900 shadow-inner flex items-center justify-center">
          <span className="text-neutral-700 text-[10px] md:text-xs font-bold">{isRunning ? 'MUTEX LOCKS' : 'TABLE'}</span>
        </div>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <div 
            key={i}
            className={`absolute w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 ${getStateColor(philosophers[i])}`}
            style={{
              transform: `rotate(${deg}deg) translateY(-3rem) rotate(-${deg}deg)`
            }}
          >
             <span className="text-[8px] font-bold text-black">{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4 text-[10px] text-neutral-500">
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-neutral-700"></div>Thinking</div>
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-500"></div>Eating</div>
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Sleeping</div>
      </div>
    </div>
  );
}
