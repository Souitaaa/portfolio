import React from 'react';

export default function Marquee() {
  const text = "1337 • 42 NETWORK • UM6P • SOUITA CHARAF • ";
  const repeatedText = Array(12).fill(text).join("");

  return (
    <div className="relative w-full overflow-hidden bg-neutral-50 dark:bg-[#050505] border-y border-neutral-200 dark:border-neutral-900/60 py-6 md:py-8 mb-16 select-none shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-colors duration-300">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="text-4xl md:text-6xl font-black font-clash uppercase tracking-widest text-neutral-200 dark:text-neutral-800/80 hover:text-neutral-300 dark:hover:text-neutral-700 transition-colors duration-500 flex gap-4">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
