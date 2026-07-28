import React, { useState, useRef, useEffect } from 'react';

export default function MinishellPreview() {
  const [history, setHistory] = useState([
    { type: 'command', text: 'cat config.json | grep "host"' },
    { type: 'output', text: '"host": "127.0.0.1",' },
    { type: 'command', text: 'echo $STATUS' },
    { type: 'output', text: 'SUCCESS (0)', color: 'text-accent-green' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'command', text: input }];
    const cmd = input.trim().toLowerCase();

    let output = '';
    let color = 'text-neutral-300';

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'help') {
      output = 'Available commands: help, clear, echo [text], whoami, date, ls';
    } else if (cmd.startsWith('echo ')) {
      output = input.substring(5);
    } else if (cmd === 'whoami') {
      output = 'sharaf_guest';
    } else if (cmd === 'date') {
      output = new Date().toString();
    } else if (cmd === 'ls') {
      output = 'src/  public/  package.json  README.md  .gitignore';
    } else {
      output = `minishell: command not found: ${cmd.split(' ')[0]}`;
      color = 'text-red-400';
    }

    newHistory.push({ type: 'output', text: output, color });
    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="flex flex-col text-sm md:text-base font-mono leading-relaxed select-text p-8 w-full h-full max-w-2xl bg-black/60 rounded-2xl border border-white/10 shadow-2xl text-neutral-300 overflow-hidden" onClick={() => document.getElementById('minishell-input')?.focus()}>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
        {history.map((line, i) => (
          <div key={i}>
            {line.type === 'command' ? (
              <div><span className="text-accent-blue">sharaf_shell$</span> <span className="text-white">{line.text}</span></div>
            ) : (
              <div className={line.color || 'text-neutral-500'}>{line.text}</div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleCommand} className="flex gap-2 items-center mt-auto">
          <span className="text-accent-blue whitespace-nowrap">sharaf_shell$</span>
          <input
            id="minishell-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
