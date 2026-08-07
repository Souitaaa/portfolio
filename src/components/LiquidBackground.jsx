import React from 'react';

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black w-full h-full pointer-events-none">
      <div className="absolute inset-0 bg-white dark:bg-black transition-colors duration-500" />
      
      {/* Liquid Orbs (Monochrome) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neutral-300/30 dark:bg-neutral-800/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-neutral-200/30 dark:bg-neutral-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] bg-neutral-400/20 dark:bg-neutral-700/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />
      
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
    </div>
  );
}
