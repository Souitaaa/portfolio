import React from 'react';

export default function Marquee() {
  const text = "1337 • 42 NETWORK • UM6P • .SHARAF • ";
  const repeatedText = Array(12).fill(text).join("");

  return (
    <div className="relative w-full overflow-hidden bg-background-card border-y border-neutral-900 py-6 mb-16 select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="text-4xl md:text-6xl font-black font-clash uppercase tracking-wider text-neutral-800 flex gap-4">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
