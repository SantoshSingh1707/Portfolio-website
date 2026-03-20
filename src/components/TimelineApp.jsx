import React from 'react';
import { Milestone } from 'lucide-react';
import { timelineMilestones } from '../data/portfolioSuiteData';

const TimelineApp = () => {
  return (
    <div className="timeline-app">
      <section className="timeline-hero">
        <p className="section-eyebrow">Timeline</p>
        <h2>Growth from fundamentals to ML systems</h2>
        <p>
          The portfolio story is not just “I know tools.” It is a progression from foundations into
          applied ML and then into systems presentation.
        </p>
      </section>

      <div className="timeline-list">
        {timelineMilestones.map((item, index) => (
          <article key={item.title} className="timeline-card">
            <div className="timeline-marker">
              <Milestone size={16} />
              <span>{index + 1}</span>
            </div>
            <div>
              <span className="timeline-phase">{item.phase}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TimelineApp;
