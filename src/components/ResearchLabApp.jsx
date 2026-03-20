import React from 'react';
import { BookOpenText, ExternalLink, FlaskConical, Lightbulb, Microscope } from 'lucide-react';
import { researchLabBoards } from '../data/portfolioSuiteData';

const ResearchLabApp = ({ onOpenExternal }) => {
  const openLink = (url, label) => {
    if (onOpenExternal) {
      onOpenExternal(url, label);
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="lab-app">
      <section className="lab-hero">
        <div>
          <p className="section-eyebrow">Research Lab</p>
          <h2>Learning tracks behind the portfolio</h2>
          <p>
            This lab is a working board for ideas, reading themes, and the kinds of ML questions that
            shape the projects in this desktop.
          </p>
        </div>
        <div className="lab-hero-badges">
          <span className="lab-pill"><Microscope size={14} /> Curiosity-led</span>
          <span className="lab-pill"><FlaskConical size={14} /> Project-connected</span>
        </div>
      </section>

      <div className="lab-grid">
        {researchLabBoards.map((board) => (
          <article key={board.title} className="lab-card">
            <div className="lab-card-head">
              <div className="lab-icon-wrap">
                <BookOpenText size={18} />
              </div>
              <div>
                <h3>{board.title}</h3>
                <p>{board.summary}</p>
              </div>
            </div>
            <div className="lab-note-list">
              {board.notes.map((note) => (
                <div key={note} className="lab-note-item">
                  <Lightbulb size={14} />
                  <span>{note}</span>
                </div>
              ))}
            </div>
            <button type="button" className="resume-inline-link" onClick={() => openLink(board.link, board.title)}>
              <ExternalLink size={14} />
              Explore this thread
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ResearchLabApp;
