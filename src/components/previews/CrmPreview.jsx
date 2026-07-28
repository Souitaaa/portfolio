import React, { useState } from 'react';

export default function CrmPreview() {
  const [activeTab, setActiveTab] = useState('revenue');

  const tabs = [
    { id: 'revenue', label: 'REVENUE' },
    { id: 'clients', label: 'CLIENTS' },
    { id: 'tasks', label: 'TASKS' }
  ];

  return (
    <div className="w-full h-full relative flex flex-col p-4 md:p-6 font-sans select-none">
      <div className="flex justify-between items-center border-b border-neutral-800/50 pb-3 mb-4">
        <div className="flex gap-2 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[10px] md:text-xs font-bold tracking-wider text-neutral-300">MYCEL_CRM</span>
        </div>
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[8px] md:text-[10px] font-mono px-2 py-1 rounded transition-colors ${activeTab === tab.id ? 'bg-neutral-800 text-emerald-400' : 'text-neutral-500 hover:bg-neutral-800/50 hover:text-neutral-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 w-full h-full transition-all duration-300">
        {activeTab === 'revenue' && (
          <div className="flex flex-col gap-2 h-full animate-in fade-in">
            <div className="text-sm md:text-lg font-bold text-emerald-400">$12,450 <span className="text-[10px] text-neutral-500 font-normal ml-2">This Month</span></div>
            <div className="mt-auto flex gap-1 items-end h-16 w-full px-4">
               {[4, 7, 5, 8, 12, 9, 14, 18, 10, 15].map((h, i) => (
                 <div key={i} style={{ height: `${h * 2}px` }} className="flex-1 bg-emerald-500/30 rounded-t-sm hover:bg-emerald-500/70 transition-colors group relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[8px] text-white px-1 py-0.5 rounded opacity-0 group-hover:opacity-100">${h}k</div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="flex flex-col gap-2 h-full animate-in fade-in">
             <div className="text-xs text-neutral-400 mb-2">Active Clients (3)</div>
             <div className="flex flex-col gap-2 mt-1">
               <div className="w-full p-2 bg-neutral-900/50 border border-neutral-800 rounded flex items-center justify-between cursor-pointer hover:bg-neutral-800 transition-colors">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded bg-accent-blue/20 flex items-center justify-center text-[8px] text-accent-blue">A</div>
                   <div className="w-16 h-1.5 bg-neutral-700 rounded-full"></div>
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(0,157,255,0.5)]"></div>
               </div>
               <div className="w-full p-2 bg-neutral-900/50 border border-neutral-800 rounded flex items-center justify-between cursor-pointer hover:bg-neutral-800 transition-colors">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded bg-accent-purple/20 flex items-center justify-center text-[8px] text-accent-purple">B</div>
                   <div className="w-20 h-1.5 bg-neutral-700 rounded-full"></div>
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_rgba(114,99,230,0.5)]"></div>
               </div>
               <div className="w-full p-2 bg-neutral-900/50 border border-neutral-800 rounded flex items-center justify-between cursor-pointer hover:bg-neutral-800 transition-colors">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded bg-accent-green/20 flex items-center justify-center text-[8px] text-accent-green">C</div>
                   <div className="w-12 h-1.5 bg-neutral-700 rounded-full"></div>
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-green shadow-[0_0_8px_rgba(133,194,7,0.5)]"></div>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="flex flex-col gap-2 h-full animate-in fade-in">
             <div className="text-xs text-neutral-400 mb-2">Pending Tasks</div>
             <div className="flex flex-col gap-1.5">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center gap-3">
                   <input type="checkbox" className="accent-emerald-500 w-3 h-3 cursor-pointer" />
                   <div className="w-3/4 h-1.5 bg-neutral-800 rounded-full"></div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
