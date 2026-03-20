import React from 'react';
import { Gauge, GitBranch, ListChecks } from 'lucide-react';
import { experimentRuns } from '../data/portfolioSuiteData';

const ExperimentTrackerApp = () => {
  return (
    <div className="tracker-app">
      <section className="tracker-hero">
        <div>
          <p className="section-eyebrow">Experiment Tracker</p>
          <h2>Evidence-first run board</h2>
          <p>
            This tracker leans on real project evidence, logs, and config references instead of
            made-up benchmark screenshots.
          </p>
        </div>
        <div className="tracker-metrics">
          <div className="tracker-metric-card"><span>Tracked runs</span><strong>{experimentRuns.length}</strong></div>
          <div className="tracker-metric-card"><span>Verified evidence</span><strong>Logs + README</strong></div>
        </div>
      </section>

      <div className="tracker-table-shell">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>Run ID</th>
              <th>Project</th>
              <th>Status</th>
              <th>Config</th>
              <th>Evidence</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {experimentRuns.map((run) => (
              <tr key={run.id}>
                <td><span className="tracker-code"><GitBranch size={14} /> {run.id}</span></td>
                <td>{run.project}</td>
                <td><span className={`tracker-status ${run.status.toLowerCase()}`}>{run.status}</span></td>
                <td>{run.config}</td>
                <td><span className="tracker-evidence"><ListChecks size={14} /> {run.evidence}</span></td>
                <td>{run.outcome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tracker-footer-note">
        <Gauge size={16} />
        <p>Next evolution: plug real MLflow exports or experiment artifacts directly into this dashboard.</p>
      </div>
    </div>
  );
};

export default ExperimentTrackerApp;
