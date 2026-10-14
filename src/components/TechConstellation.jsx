import React from 'react';

const technologies = [
  { name: 'React', symbol: '⚛', color: '#22b8d6', x: 22, y: 26 },
  { name: 'C++', symbol: 'C++', color: '#a78bfa', x: 78, y: 26 },
  { name: 'Docker', symbol: '▥', color: '#38bdf8', x: 18, y: 65 },
  { name: 'Node.js', symbol: 'JS', color: '#4ade80', x: 82, y: 65 },
  { name: 'TypeScript', symbol: 'TS', color: '#60a5fa', x: 50, y: 83 },
];

export default function TechConstellation() {
  return (
    <div className="tech-board">
      <div className="tech-board-heading"><h3>TECH STACK</h3><span>01 — 05</span></div>
      <svg className="tech-circuits" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {technologies.map((tech, index) => (
          <g key={tech.name} style={{ '--signal-color': tech.color, '--signal-delay': `${index * -0.7}s` }}>
            <path className="tech-wire" d={`M 50 48 V ${tech.y < 48 ? 35 : 57} H ${tech.x} V ${tech.y}`} />
            <path className="tech-signal" d={`M 50 48 V ${tech.y < 48 ? 35 : 57} H ${tech.x} V ${tech.y}`} pathLength="100" />
          </g>
        ))}
      </svg>
      <div className="tech-core" aria-hidden="true"><span>{'</>'}</span><small>BUILD</small></div>
      <ul aria-label="Technology stack" className="tech-nodes">
        {technologies.map((tech) => (
          <li key={tech.name} className="tech-node" style={{ left: `${tech.x}%`, top: `${tech.y}%`, '--node-color': tech.color }}>
            <span className="tech-key" aria-hidden="true">{tech.symbol}</span>
            <span className="tech-name">{tech.name}</span>
          </li>
        ))}
      </ul>
      <span className="tech-board-caption"><i /> CONNECTED TO CREATE</span>
    </div>
  );
}
