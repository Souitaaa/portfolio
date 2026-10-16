import React, { useId } from 'react';

const technologies = [
  { name: 'React', color: '#22d3ee', x: '23%', y: '29%' },
  { name: 'C++', color: '#c4b5fd', x: '79%', y: '34%' },
  { name: 'Docker', color: '#38bdf8', x: '18%', y: '61%' },
  { name: 'Node.js', color: '#4ade80', x: '77%', y: '70%' },
  { name: 'TypeScript', color: '#93c5fd', x: '39%', y: '82%' },
];

export default function TechGlobe() {
  const id = useId();
  return (
    <div className="tech-globe-card">
      <div className="tech-globe-heading"><h3>TECH STACK</h3><span>MY WORLD OF CODE</span></div>
      <svg className="tech-globe-art" viewBox="0 0 320 320" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-fill`} cx="32%" cy="24%" r="80%">
            <stop offset="0" stopColor="#a78bfa" stopOpacity=".2" />
            <stop offset=".65" stopColor="#6366f1" stopOpacity=".06" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity=".15" />
          </radialGradient>
          <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#c4b5fd" /><stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <clipPath id={`${id}-clip`}><circle cx="160" cy="160" r="98" /></clipPath>
        </defs>
        <g transform="rotate(-20 160 160)">
          <circle cx="160" cy="160" r="98" fill={`url(#${id}-fill)`} />
          <g fill="none" stroke={`url(#${id}-line)`} strokeWidth=".65" clipPath={`url(#${id}-clip)`}>
            {[-72, -42, 0, 42, 72].map((y) => (
              <ellipse key={y} cx="160" cy={160 + y} rx={Math.sqrt(98 ** 2 - y ** 2)} ry={y === 0 ? 17 : 12} opacity=".45" />
            ))}
            {[0, 1, 2, 3].map((index) => (
              <ellipse key={index} className="tech-meridian" cx="160" cy="160" rx="98" ry="98" style={{ animationDelay: `${index * -3}s` }} />
            ))}
          </g>
          <circle cx="160" cy="160" r="98" fill="none" stroke={`url(#${id}-line)`} strokeWidth=".9" opacity=".6" />
          <ellipse className="tech-satellite-ring" cx="160" cy="160" rx="133" ry="35" fill="none" stroke={`url(#${id}-line)`} strokeWidth=".7" strokeDasharray="3 6" opacity=".6" />
          <circle cx="289" cy="151" r="3" fill="#22d3ee" />
          <circle cx="66" cy="184" r="2" fill="#c4b5fd" />
        </g>
      </svg>
      <ul className="tech-globe-labels" aria-label="Technology stack">
        {technologies.map((tech, index) => (
          <li key={tech.name} style={{ left: tech.x, top: tech.y, '--tech-color': tech.color, '--float-delay': `${index * -.9}s` }}>
            <span className="tech-globe-pill"><i />{tech.name}</span>
          </li>
        ))}
      </ul>
      <p className="tech-globe-caption"><span /> BUILT TO CONNECT.</p>
    </div>
  );
}
