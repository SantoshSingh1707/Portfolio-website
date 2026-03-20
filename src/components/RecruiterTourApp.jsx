import React from 'react';
import { Compass, ExternalLink } from 'lucide-react';

const RecruiterTourApp = ({ onStartTour, onOpenApp, steps }) => {
  return (
    <div className="tour-app">
      <section className="tour-hero">
        <div>
          <p className="section-eyebrow">Recruiter Tour</p>
          <h2>One click guided portfolio walkthrough</h2>
          <p>
            This flow is built for quick evaluation: who I am, what I build, why it matters, and how
            to reach me without hunting through the desktop.
          </p>
        </div>
        <button type="button" className="demo-run-btn" onClick={onStartTour}>
          <Compass size={16} />
          Start Guided Tour
        </button>
      </section>

      <div className="tour-sequence">
        {steps.map((step, index) => (
          <article key={step.id} className="tour-step-card">
            <div className="tour-step-index">{index + 1}</div>
            <div className="tour-step-copy">
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
            <button type="button" className="resume-inline-link" onClick={() => onOpenApp?.(step.id)}>
              <ExternalLink size={14} />
              Open now
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecruiterTourApp;
