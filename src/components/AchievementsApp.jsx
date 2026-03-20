import React from 'react';
import { Rocket, Trophy } from 'lucide-react';
import { achievementCards } from '../data/portfolioSuiteData';

const AchievementsApp = () => {
  return (
    <div className="achievements-app">
      <section className="achievements-hero">
        <div>
          <p className="section-eyebrow">Achievements</p>
          <h2>Project-backed milestones</h2>
          <p>
            These are not generic badges. They reflect the strongest concrete outcomes already visible
            in the portfolio and repos.
          </p>
        </div>
        <span className="lab-pill"><Rocket size={14} /> Built, shipped, and tested</span>
      </section>

      <div className="achievements-grid">
        {achievementCards.map((achievement) => (
          <article key={achievement.title} className="achievement-card">
            <div className="achievement-icon">
              <Trophy size={18} />
            </div>
            <div>
              <h3>{achievement.title}</h3>
              <p>{achievement.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AchievementsApp;
