import React, { useMemo, useState } from 'react';
import { Bot, MessageSquareText, Send, Sparkles } from 'lucide-react';
import { assistantKnowledge } from '../data/portfolioSuiteData';

const starterPrompts = [
  'What is Santosh strongest project?',
  'What does Santosh focus on?',
  'Can I open the resume?',
  'How does Santosh think about research?',
];

const findBestAnswer = (query) => {
  const normalized = query.toLowerCase();
  const tokens = normalized.split(/\s+/);

  const scored = assistantKnowledge.map((entry) => {
    const score = entry.tags.reduce((sum, tag) => (
      normalized.includes(tag) || tokens.includes(tag) ? sum + 2 : sum
    ), 0) + (normalized === entry.question.toLowerCase() ? 4 : 0);

    return { ...entry, score };
  }).sort((a, b) => b.score - a.score);

  return scored[0]?.score > 0 ? scored[0] : {
    answer: 'I can help best with projects, resume, focus area, research interests, and contact flow. Try one of the prompt chips above.',
    relatedApp: null,
  };
};

const AIAssistantApp = ({ onOpenApp }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Ask about projects, resume, focus areas, research interests, or how to navigate the portfolio quickly.',
      relatedApp: null,
    },
  ]);
  const [input, setInput] = useState('');

  const promptSuggestions = useMemo(() => starterPrompts, []);

  const sendMessage = (value) => {
    const query = value.trim();

    if (!query) {
      return;
    }

    const bestAnswer = findBestAnswer(query);
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: query },
      { role: 'assistant', text: bestAnswer.answer, relatedApp: bestAnswer.relatedApp },
    ]);
    setInput('');
  };

  return (
    <div className="assistant-app">
      <section className="assistant-hero">
        <div>
          <p className="section-eyebrow">AI Assistant</p>
          <h2>Ask the portfolio what matters</h2>
          <p>
            This is a small local assistant trained on the portfolio structure and project context,
            built to answer practical navigation and profile questions.
          </p>
        </div>
        <span className="lab-pill"><Sparkles size={14} /> Portfolio-aware</span>
      </section>

      <div className="assistant-suggestion-row">
        {promptSuggestions.map((prompt) => (
          <button key={prompt} type="button" className="assistant-chip" onClick={() => sendMessage(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="assistant-thread">
        {messages.map((message, index) => (
          <article key={`${message.role}-${index}`} className={`assistant-message ${message.role}`}>
            <div className="assistant-avatar">
              {message.role === 'assistant' ? <Bot size={16} /> : <MessageSquareText size={16} />}
            </div>
            <div className="assistant-bubble">
              <p>{message.text}</p>
              {message.role === 'assistant' && message.relatedApp ? (
                <button type="button" className="resume-inline-link" onClick={() => onOpenApp?.(message.relatedApp)}>
                  Open related app
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <div className="assistant-compose">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage(input);
            }
          }}
          placeholder="Ask about projects, resume, research, or contact..."
        />
        <button type="button" onClick={() => sendMessage(input)}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default AIAssistantApp;
