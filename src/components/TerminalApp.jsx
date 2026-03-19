import React, { useState, useRef, useEffect } from 'react';

const TerminalApp = () => {
  const [history, setHistory] = useState([
    "Santosh OS [Version 1.0.0]",
    "(c) 2026 Aithani Santosh Singh. All rights reserved.",
    "",
    "Type 'help' for available commands."
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = "";
      
      switch (cmd) {
        case "help":
          response = "Available commands: help, whoami, clear, echo, date, projects, contact, neofetch, matrix";
          break;
        case "neofetch":
          response = [
            "  OS: Santosh Portfolio OS v2.0.4",
            "  Host: React-Vite Web Engine",
            "  Kernel: 5.15.0-antigravity",
            "  Shell: Santosh-Bash 1.0",
            "  Resolution: " + window.innerWidth + "x" + window.innerHeight,
            "  DE: Windows 11 Glassmorphic",
            "  CPU: AI-Driven Agent v1",
            "  Memory: 16GB (Virtualized)",
            "  Theme: Dark Glass",
            "  Icons: Lucide-React"
          ].join("\n");
          break;
        case "matrix":
          response = "Wake up, Santosh... The Matrix has you...";
          setHistory(prev => [...prev, "Checking system vulnerabilities...", "Injecting code...", "................", response]);
          // We could trigger a full screen effect here if we had a global state for it
          break;
        case "whoami":
          response = "Aithani Santosh Singh - Software Engineering Student & AI Enthusiast";
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "date":
          response = new Date().toString();
          break;
        case "projects":
          response = "Projects: AnimeChar (HTML), C_Programming, Machine-Learning (Jupyter), JAVA, DSA";
          break;
        case "contact":
          response = "Email: santosh102969@gmail.com | Git: SantoshSingh1707 | LinkedIn: santosh-singh-a6ab972a0";
          break;
        case "":
          break;
        default:
          if (cmd.startsWith("echo ")) {
            response = input.trim().substring(5); // keep original case
          } else {
            response = `'${cmd}' is not recognized as an internal or external command.`;
          }
      }

      setHistory([...history, `C:\\Users\\Santosh> ${input}`, response].filter(Boolean));
      setInput("");
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="terminal-app" style={{ 
      backgroundColor: '#0c0c0c', color: '#cccccc', height: '100%', 
      fontFamily: 'Consolas, monospace', padding: '10px', fontSize: '14px',
      overflowY: 'auto', cursor: 'text'
    }} onClick={() => document.getElementById("terminal-input")?.focus()}>
      {history.map((line, idx) => (
        <div key={idx} style={{ minHeight: '20px' }}>{line}</div>
      ))}
      <div style={{ display: 'flex' }}>
        <span style={{ marginRight: '8px' }}>C:\Users\Santosh&gt;</span>
        <input 
          id="terminal-input"
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={handleCommand}
          style={{ 
            background: 'transparent', border: 'none', color: '#cccccc', 
            fontFamily: 'Consolas, monospace', fontSize: '14px', flex: 1, outline: 'none'
          }}
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

export default TerminalApp;
