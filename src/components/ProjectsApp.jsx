import React from 'react';
import {
  BarChart3,
  Bot,
  ExternalLink,
  FileCheck,
  FileSearch,
  GitBranch,
  Sparkles,
} from 'lucide-react';

const studySignals = [
  { label: 'Question types', value: 'MCQ + True/False' },
  { label: 'Question range', value: '1 to 15 per run' },
  { label: 'Input support', value: 'PDF, TXT, DOCX, PPTX' },
  { label: 'Default retrieval', value: 'Top-K 10, threshold 0.20-0.25' },
];

const studyStack = ['Streamlit', 'LangChain', 'Mistral AI', 'ChromaDB', 'EasyOCR', 'PyMuPDF'];

const pipelineSignals = [
  { label: 'Pipeline style', value: 'Config-driven + DVC tracked' },
  { label: 'Artifact root', value: 'artifacts/data_ingestion' },
  { label: 'Dataset source', value: 'Google Drive zip download' },
  { label: 'Logged run', value: '2026-02-28 23:12 completed' },
];

const pipelineArtifacts = [
  'config/config.yaml',
  'dvc.yaml',
  'logs/running_logs.log',
  'templates/index.html',
  'src/cnnClassifer/pipeline/stage_01_data_ingestion.py',
];

const runEvidence = [
  '[2026-02-28 23:09:30] Stage Data Ingestion Stage started',
  '[2026-02-28 23:09:30] Created directory at: artifacts',
  '[2026-02-28 23:09:30] Downloading data.zip from Google Drive',
  '[2026-02-28 23:12:18] Downloaded data into artifacts/data_ingestion/data.zip',
  '[2026-02-28 23:12:19] Stage Data Ingestion Stage completed',
];

const ProjectsApp = ({ onOpenExternal }) => {
  const openLink = (url, label) => {
    if (onOpenExternal) {
      onOpenExternal(url, label);
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="projects-shell">
      <section className="projects-hero-banner glass-card">
        <div>
          <p className="section-eyebrow">ML Showcase</p>
          <h2 className="title-text-dark">Repo-backed ML project snapshots</h2>
          <p className="body-text">
            Each card below is grounded in the actual repo structure, readme details, and project
            files rather than invented demo numbers.
          </p>
        </div>
        <div className="projects-hero-pills">
          <span className="project-badge warm">2 Featured Projects</span>
          <span className="project-badge cool">RAG + MLOps</span>
          <span className="project-badge fresh">Live Portfolio View</span>
        </div>
      </section>

      <div className="project-gallery project-gallery-rich">
        <article className="project-card glass-card accent-left project-showcase-card">
          <div className="project-card-head">
            <div>
              <span className="project-badge warm">Featured</span>
              <h3 className="card-title-dark">AI Study Tool</h3>
              <p className="card-subtitle-accent">RAG-Powered Quiz Platform</p>
            </div>
            <button
              type="button"
              className="resume-inline-link"
              onClick={() => openLink('https://github.com/SantoshSingh1707/AI-Study-Tool', 'AI Study Tool')}
            >
              <ExternalLink size={14} />
              GitHub
            </button>
          </div>

          <div className="project-visual project-visual-study">
            <div className="project-visual-topbar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="project-visual-grid">
              <div className="project-visual-primary">
                <div className="project-visual-chip">
                  <Sparkles size={14} />
                  <span>Learning Hub</span>
                </div>
                <strong>Quiz Center + Learning Notes</strong>
                <p>Actual repo features include exam mode, flashcards, summaries, key notes, and quiz exports.</p>
                <div className="project-bar-cluster">
                  <div>
                    <span>Retrieval chunks</span>
                    <div className="project-bar">
                      <div style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <span>Question volume</span>
                    <div className="project-bar">
                      <div style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div>
                    <span>Study modes</span>
                    <div className="project-bar">
                      <div style={{ width: '76%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-visual-side">
                <div className="project-mini-card">
                  <Bot size={16} />
                  <div>
                    <strong>Mistral small 2506</strong>
                    <span>LLM orchestration in app.py</span>
                  </div>
                </div>
                <div className="project-mini-card">
                  <FileSearch size={16} />
                  <div>
                    <strong>OCR fallback</strong>
                    <span>EasyOCR + PyMuPDF for scanned docs</span>
                  </div>
                </div>
                <div className="project-mini-card">
                  <BarChart3 size={16} />
                  <div>
                    <strong>Performance history</strong>
                    <span>Sidebar score chart tracked in session state</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="project-stat-grid">
            {studySignals.map((signal) => (
              <div key={signal.label} className="project-stat-card">
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>

          <div className="flex-wrap">
            {studyStack.map((tag) => (
              <span key={tag} className="skill-tag">
                {tag}
              </span>
            ))}
          </div>

          <ul className="project-list">
            <li>Readme documents interactive quizzes, flashcards, exam mode, follow-up AI help, and CSV export.</li>
            <li>The current repo exposes a polished Streamlit UI with document ingestion and retrieval-driven learning flows.</li>
            <li>Configuration in the repo shows adjustable chunk count, similarity threshold, and quiz size for controlled generation.</li>
          </ul>
        </article>

        <article className="project-card glass-card project-accent-blue project-showcase-card">
          <div className="project-card-head">
            <div>
              <span className="project-badge cool">Pipeline Evidence</span>
              <h3 className="card-title-dark">Kidney Disease Classifier</h3>
              <p className="card-subtitle-accent cool-text">End-to-End workflow with DVC-style structure</p>
            </div>
            <button
              type="button"
              className="resume-inline-link"
              onClick={() => openLink('https://github.com/SantoshSingh1707/End-to-End-Kideny-Disease-classification-Project', 'Kidney Disease Classifier')}
            >
              <ExternalLink size={14} />
              GitHub
            </button>
          </div>

          <div className="project-visual project-visual-terminal">
            <div className="project-visual-topbar">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="project-terminal-log">
              {runEvidence.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>

          <div className="project-stat-grid">
            {pipelineSignals.map((signal) => (
              <div key={signal.label} className="project-stat-card">
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>

          <div className="project-artifact-list">
            {pipelineArtifacts.map((artifact) => (
              <div key={artifact} className="project-artifact-item">
                <FileCheck size={15} />
                <span>{artifact}</span>
              </div>
            ))}
          </div>

          <div className="project-proof-note">
            <GitBranch size={16} />
            <p>
              This repo currently surfaces pipeline structure and logged ingestion evidence more clearly
              than published validation metrics, so the portfolio highlights real run proof instead of
              invented accuracy numbers.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectsApp;
