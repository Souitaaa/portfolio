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
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
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
    <div className="flex flex-col text-sm md:text-base font-mono leading-relaxed select-text p-3 sm:p-5 w-full h-full max-w-2xl bg-black/60 rounded-2xl border border-white/10 shadow-2xl text-neutral-300 overflow-hidden" onClick={() => inputRef.current?.focus()}>
      <div ref={containerRef} className="min-h-0 min-w-0 flex-1 overflow-y-auto break-words custom-scrollbar flex flex-col gap-3">
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
            ref={inputRef}
            aria-label="IRC message"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-w-0 w-full flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-neutral-700"
            placeholder="Type a message..."
            autoComplete="off"
            spellCheck="false"
            enterKeyHint="send"
          />
          <button type="submit" className="shrink-0 min-h-11 px-2 rounded border border-white/20 text-xs" aria-label="Send command or message">↵</button>
        </form>
      </div>
    </div>
  );
}
