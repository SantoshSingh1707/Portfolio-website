import React, { useMemo, useState } from 'react';
import { BrainCircuit, Play, Sparkles, WandSparkles } from 'lucide-react';

const modes = [
  { id: 'quiz', label: 'Quiz Builder' },
  { id: 'brief', label: 'Research Brief' },
  { id: 'signals', label: 'Signal Extractor' },
];

const defaultInput = `Retrieval augmented generation combines document search with language models.
Good chunking improves relevance, while source citations improve trust.
Students learn faster when AI tools explain answers instead of only giving outputs.`;

const stopWords = new Set([
  'the', 'and', 'with', 'into', 'from', 'when', 'while', 'this', 'that', 'your', 'have', 'only',
  'good', 'than', 'they', 'them', 'their', 'for', 'are', 'how', 'can', 'use', 'using', 'into',
]);

const tokenize = (text) => text
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, ' ')
  .split(/\s+/)
  .filter((token) => token.length > 2 && !stopWords.has(token));

const buildDemoResult = (text, mode) => {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const keywords = Object.entries(
    tokenize(text).reduce((acc, token) => {
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([token]) => token);

  const lead = sentences.slice(0, 2).join(' ');
  const promptBase = keywords.slice(0, 3).join(', ');

  if (mode === 'brief') {
    return {
      heading: 'Research Brief',
      summary: lead || 'Add more text to generate a stronger brief.',
      bullets: [
        `Main idea: ${keywords[0] || 'ml workflow'}`,
        `Supporting theme: ${keywords[1] || 'retrieval grounding'}`,
        `Next question to explore: How can ${keywords[2] || 'this system'} be evaluated reliably?`,
      ],
    };
  }

  if (mode === 'signals') {
    return {
      heading: 'Signal Extractor',
      summary: 'The demo pulled out reusable concepts and conversion opportunities from the text.',
      bullets: keywords.map((keyword, index) => `Signal ${index + 1}: ${keyword}`),
    };
  }

  return {
    heading: 'Quiz Builder',
    summary: 'This local demo turns the input into study prompts without calling a backend model.',
    bullets: [
      `What role does ${keywords[0] || 'retrieval'} play in the workflow?`,
      `Why does ${keywords[1] || 'source grounding'} matter for user trust?`,
      `How would you improve ${promptBase || 'the overall pipeline'} in a next iteration?`,
    ],
  };
};

const LiveDemoApp = () => {
  const [mode, setMode] = useState('quiz');
  const [input, setInput] = useState(defaultInput);

  const result = useMemo(() => buildDemoResult(input, mode), [input, mode]);

  return (
    <div className="demo-app">
      <section className="demo-hero">
        <div>
          <p className="section-eyebrow">Live Demo</p>
          <h2>Try a lightweight local ML-style interaction</h2>
          <p>
            This window simulates how I think about productizing model behavior: small, inspectable,
            and useful even without a remote backend.
          </p>
        </div>
        <div className="demo-hero-badges">
          <span className="lab-pill"><BrainCircuit size={14} /> Local logic</span>
          <span className="lab-pill"><WandSparkles size={14} /> Inspectable output</span>
        </div>
      </section>

      <div className="demo-layout">
        <section className="demo-panel">
          <div className="demo-mode-row">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`demo-mode-btn ${mode === item.id ? 'active' : ''}`}
                onClick={() => setMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <textarea
            className="demo-textarea"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <button type="button" className="demo-run-btn">
            <Play size={16} />
            Run Demo
          </button>
        </section>

        <section className="demo-panel">
          <div className="demo-result-head">
            <div>
              <p className="section-eyebrow">Output</p>
              <h3>{result.heading}</h3>
            </div>
            <span className="demo-chip"><Sparkles size={14} /> Portfolio inference</span>
          </div>

          <p className="demo-summary">{result.summary}</p>
          <div className="demo-bullet-list">
            {result.bullets.map((bullet) => (
              <div key={bullet} className="demo-bullet-item">
                <span></span>
                <p>{bullet}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LiveDemoApp;
