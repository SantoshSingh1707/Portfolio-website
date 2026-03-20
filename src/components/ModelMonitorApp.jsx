import React from 'react';
import { Activity, ShieldCheck, TriangleAlert } from 'lucide-react';
import { modelMonitorItems } from '../data/portfolioSuiteData';

const ModelMonitorApp = () => {
  return (
    <div className="monitor-app">
      <section className="monitor-hero">
        <div>
          <p className="section-eyebrow">Model Monitor</p>
          <h2>How I think about production ML signals</h2>
          <p>
            This is an honest portfolio monitor: it shows readiness thinking, confidence, and follow-up
            areas instead of pretending there is a hidden production system behind the demo.
          </p>
        </div>
        <div className="monitor-badge-row">
          <span className="lab-pill"><ShieldCheck size={14} /> Reliability thinking</span>
          <span className="lab-pill"><Activity size={14} /> Ops mindset</span>
        </div>
      </section>

      <div className="monitor-grid">
        {modelMonitorItems.map((item) => (
          <article key={item.title} className="monitor-card">
            <div className="monitor-card-head">
              <h3>{item.title}</h3>
              <span className={`monitor-status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span>
            </div>
            <p>{item.detail}</p>
            <div className="monitor-meter">
              <div style={{ width: `${item.meter}%` }}></div>
            </div>
          </article>
        ))}
      </div>

      <div className="monitor-alert">
        <TriangleAlert size={16} />
        <p>
          Honest next step: connect this to exported experiment data so the monitor reflects live model artifacts rather than curated portfolio signals.
        </p>
      </div>
    </div>
  );
};

export default ModelMonitorApp;
