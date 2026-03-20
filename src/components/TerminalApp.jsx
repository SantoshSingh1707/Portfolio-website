import React, { useEffect, useRef, useState } from 'react';

const commandShortcuts = ['help', 'projects', 'research', 'assistant', 'tour'];

const appCommandMap = {
  projects: 'projects',
  contact: 'contact',
  resume: 'resume',
  research: 'researchlab',
  demo: 'livedemo',
  tracker: 'experimenttracker',
  dataset: 'datasetexplorer',
  monitor: 'modelmonitor',
  timeline: 'timeline',
  achievements: 'achievements',
  assistant: 'aiassistant',
  tourapp: 'recruitertour',
};

const TerminalApp = ({ onOpenApp, onStartTour }) => {
  const [history, setHistory] = useState([
    'Santosh OS [Version 2.0.4]',
    '(c) 2026 Aithani Santosh Singh. All rights reserved.',
    '',
    "Type 'help' for available commands.",
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const executeCommand = (rawInput) => {
    const command = rawInput.trim();
    const cmd = command.toLowerCase();

    if (!command) {
      return;
    }

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let response = '';
    let extraLines = [];

    switch (cmd) {
      case 'help':
        response = 'Available commands: help, whoami, clear, echo, date, projects, contact, resume, research, demo, tracker, dataset, monitor, timeline, achievements, assistant, tour, open <app>, neofetch, matrix';
        break;
      case 'neofetch':
        response = [
          '  OS: Santosh Portfolio OS v2.0.4',
          '  Host: React-Vite Web Engine',
          '  Kernel: 5.15.0-antigravity',
          '  Shell: Santosh-Bash 1.0',
          `  Resolution: ${window.innerWidth}x${window.innerHeight}`,
          '  DE: Glass Workspace',
          '  CPU: AI-Driven Agent v1',
          '  Memory: 16GB (Virtualized)',
          '  Theme: Ocean Glass',
          '  Icons: Lucide-React',
        ].join('\n');
        break;
      case 'matrix':
        extraLines = ['Checking system vulnerabilities...', 'Injecting code...', '................'];
        response = 'Wake up, Santosh... The Matrix has you...';
        break;
      case 'whoami':
        response = 'Aithani Santosh Singh - Software Engineering Student & AI Enthusiast';
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'projects':
        response = 'Projects: AI Study Tool, Kidney Disease Classifier, Santosh Portfolio OS';
        onOpenApp?.('projects');
        break;
      case 'contact':
        response = 'Email: santosh102969@gmail.com | GitHub: SantoshSingh1707 | LinkedIn: santosh-singh-a6ab972a0';
        onOpenApp?.('contact');
        break;
      case 'resume':
        response = 'Opening the Resume app.';
        onOpenApp?.('resume');
        break;
      case 'research':
        response = 'Opening the Research Lab.';
        onOpenApp?.('researchlab');
        break;
      case 'demo':
        response = 'Launching the Live Demo window.';
        onOpenApp?.('livedemo');
        break;
      case 'tracker':
        response = 'Opening the Experiment Tracker.';
        onOpenApp?.('experimenttracker');
        break;
      case 'dataset':
        response = 'Opening the Dataset Explorer.';
        onOpenApp?.('datasetexplorer');
        break;
      case 'monitor':
        response = 'Opening the Model Monitor.';
        onOpenApp?.('modelmonitor');
        break;
      case 'timeline':
        response = 'Opening the learning timeline.';
        onOpenApp?.('timeline');
        break;
      case 'achievements':
        response = 'Opening achievement highlights.';
        onOpenApp?.('achievements');
        break;
      case 'assistant':
        response = 'Opening the portfolio AI assistant.';
        onOpenApp?.('aiassistant');
        break;
      case 'tour':
        response = 'Starting the recruiter walkthrough.';
        onStartTour?.();
        break;
      default:
        if (cmd.startsWith('echo ')) {
          response = command.substring(5);
        } else if (cmd.startsWith('open ')) {
          const target = cmd.slice(5).trim();
          const appId = appCommandMap[target];

          if (appId) {
            response = `Opening ${target}...`;
            onOpenApp?.(appId);
          } else {
            response = `No app alias found for '${target}'.`;
          }
        } else {
          response = `'${cmd}' is not recognized as an internal or external command.`;
        }
    }

    setHistory((prev) => [
      ...prev,
      `C:\\Users\\Santosh> ${command}`,
      ...extraLines,
      response,
    ].filter(Boolean));
    setInput('');
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="terminal-app">
      <div className="terminal-toolbar">
        <div className="terminal-indicators">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot amber"></span>
          <span className="terminal-dot green"></span>
        </div>
        <span className="terminal-title">Santosh Terminal</span>
        <div className="terminal-shortcuts">
          {commandShortcuts.map((command) => (
            <button key={command} type="button" className="terminal-chip" onClick={() => executeCommand(command)}>
              {command}
            </button>
          ))}
        </div>
      </div>

      <div className="terminal-body" onClick={() => document.getElementById('terminal-input')?.focus()}>
        {history.map((line, index) => (
          <pre key={index} className="terminal-line">{line}</pre>
        ))}
        <div className="terminal-input-row">
          <span className="terminal-prompt">C:\Users\Santosh&gt;</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                executeCommand(input);
              }
            }}
            className="terminal-input"
            autoComplete="off"
            spellCheck="false"
            autoFocus
          />
        </div>
        <div ref={endRef}></div>
      </div>
    </div>
  );
};

export default TerminalApp;
