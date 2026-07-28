import React, { useState } from 'react';
import { Play, Square, RotateCw } from 'lucide-react';

export default function InceptionPreview() {
  const [containers, setContainers] = useState([
    { name: 'Nginx', port: '443', status: 'running', color: 'text-accent-blue', bg: 'bg-accent-blue' },
    { name: 'WordPress', port: 'FPM', status: 'running', color: 'text-accent-purple', bg: 'bg-accent-purple' },
    { name: 'MariaDB', port: '3306', status: 'running', color: 'text-accent-green', bg: 'bg-accent-green' }
  ]);

  const toggleStatus = (index) => {
    setContainers(prev => {
      const newContainers = [...prev];
      newContainers[index].status = newContainers[index].status === 'running' ? 'stopped' : 'running';
      return newContainers;
    });
  };

  const restartContainer = (index) => {
    setContainers(prev => {
      const newContainers = [...prev];
      newContainers[index].status = 'restarting';
      return newContainers;
    });
    setTimeout(() => {
      setContainers(prev => {
        const newContainers = [...prev];
        newContainers[index].status = 'running';
        return newContainers;
      });
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center gap-6 p-6 font-mono text-sm md:text-base text-neutral-400">
      <div className="text-center text-xs text-neutral-500 mb-2 border-b border-white/10 pb-4">
        Click controls to manage Docker network
      </div>
      
      <div className="flex flex-col md:flex-row justify-around items-center gap-4">
        {containers.map((container, index) => (
          <React.Fragment key={container.name}>
            {index > 0 && <div className="text-neutral-700 hidden md:block">►</div>}
            {index > 0 && <div className="text-neutral-700 md:hidden">▼</div>}
            
            <div className={`p-4 bg-neutral-900/80 border ${container.status === 'running' ? 'border-neutral-700' : container.status === 'restarting' ? 'border-yellow-500/50' : 'border-red-500/50'} rounded-xl flex flex-col items-center min-w-[140px] transition-colors duration-300`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${container.status === 'running' ? container.bg : container.status === 'restarting' ? 'bg-yellow-500' : 'bg-red-500'} ${container.status === 'running' || container.status === 'restarting' ? 'animate-pulse' : ''}`}></span>
                <span className={`${container.status === 'running' ? container.color : 'text-neutral-400'} font-bold`}>{container.name}</span>
              </div>
              <span className="text-xs text-neutral-500 mb-4">{container.port}</span>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleStatus(index)}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
                  title={container.status === 'running' ? "Stop" : "Start"}
                >
                  {container.status === 'running' ? <Square size={14} className="text-red-400" /> : <Play size={14} className="text-green-400" />}
                </button>
                <button 
                  onClick={() => restartContainer(index)}
                  className={`p-1.5 hover:bg-white/10 rounded-md transition-colors ${container.status === 'restarting' ? 'animate-spin' : ''}`}
                  title="Restart"
                >
                  <RotateCw size={14} className="text-yellow-400" />
                </button>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-4 text-xs">
        {containers.every(c => c.status === 'running') ? (
          <>
            <span className="w-2 h-2 bg-accent-green rounded-full animate-ping"></span>
            <span className="text-accent-green font-bold">NETWORK STABLE</span>
          </>
        ) : containers.some(c => c.status === 'restarting') ? (
          <>
             <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></span>
             <span className="text-yellow-500 font-bold">RECONFIGURING...</span>
          </>
        ) : (
          <>
             <span className="w-2 h-2 bg-red-500 rounded-full"></span>
             <span className="text-red-500 font-bold">SERVICES DOWN</span>
          </>
        )}
      </div>
    </div>
  );
}
