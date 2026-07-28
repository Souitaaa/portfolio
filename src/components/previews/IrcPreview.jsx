import React, { useState, useRef, useEffect } from 'react';

export default function IrcPreview() {
  const [messages, setMessages] = useState([
    { sender: 'system', text: '// Booting IRC server on port 6667...' },
    { sender: 'system', text: '[SOCKET] Bind successful. Listening...' },
    { sender: 'system', text: 'client_1 joined channel #42network' },
    { sender: 'client_1', text: 'hello world!' },
    { sender: 'bot', text: 'Welcome to the server! Type something to chat.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'you', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot reply
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "Message received on port 6667.",
        "PING :PONG",
        "Hello from the C++98 server!",
        "I'm just a simple IRC bot."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { sender: 'bot', text: randomResponse }]);
    }, 800);
  };

  return (
    <div className="flex flex-col text-sm md:text-base font-mono leading-relaxed select-text p-8 w-full h-full max-w-2xl bg-black/60 rounded-2xl border border-white/10 shadow-2xl text-neutral-300 overflow-hidden" onClick={() => document.getElementById('irc-input')?.focus()}>
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.sender === 'system' ? (
              <div className="text-neutral-500">
                <span className="text-accent-red">➜</span> {msg.text}
              </div>
            ) : msg.sender === 'bot' ? (
              <div>
                <span className="text-accent-purple font-bold">bot:</span> <span className="text-white">{msg.text}</span>
              </div>
            ) : msg.sender === 'you' ? (
              <div>
                <span className="text-accent-green font-bold">you:</span> <span className="text-white">{msg.text}</span>
              </div>
            ) : (
              <div>
                <span className="text-neutral-500">{msg.sender}:</span> <span className="text-white">{msg.text}</span>
              </div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSend} className="flex gap-2 items-center mt-auto pt-4">
          <span className="text-accent-green font-bold whitespace-nowrap">you:</span>
          <input
            id="irc-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-neutral-700"
            placeholder="Type a message..."
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
