import React from 'react';
import {
  Brain,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

const focusAreas = [
  'Machine learning systems',
  'Retrieval-augmented generation',
  'Experiment tracking and ML ops',
  'Data structures and core CS foundations',
];

const highlights = [
  {
    title: 'Education',
    meta: 'Dehradun Institute of Technology',
    detail: 'Bachelor of Engineering in Computer Science with a minor in Animation, expected May 2027.',
    icon: GraduationCap,
  },
  {
    title: 'Current Focus',
    meta: 'AI + ML product building',
    detail: 'Building portfolio projects around RAG workflows, TensorFlow pipelines, and reproducible experimentation.',
    icon: Brain,
  },
  {
    title: 'Reach Out',
    meta: 'Internships and collaborations',
    detail: 'Open to ML-focused internships, learning opportunities, and practical project work.',
    icon: Mail,
  },
];

const stack = [
  'Python',
  'TensorFlow',
  'Scikit-learn',
  'LangChain',
  'ChromaDB',
  'MLflow',
  'DVC',
  'OpenCV',
];

const ResumeApp = ({ onOpenResume }) => {
  const openResumePdf = () => {
    onOpenResume?.('/Resume.pdf', 'Resume PDF');
  };

  return (
    <div className="resume-app">
      <section className="resume-hero">
        <div className="resume-profile-card">
          <img src="/image.png" alt="Aithani Santosh Singh" className="resume-profile-photo" />
          <div className="resume-profile-copy">
            <div className="resume-chip">
              <Sparkles size={14} />
              <span>Resume Workspace</span>
            </div>
            <h2>Aithani Santosh Singh</h2>
            <p>
              Software Engineering student focused on ML systems, RAG-powered tooling, and
              thoughtful product experiences around data and learning.
            </p>
            <div className="resume-actions">
              <button type="button" className="resume-btn" onClick={openResumePdf}>
                <Download size={16} />
                Open PDF
              </button>
              <a href="mailto:santosh102969@gmail.com" className="resume-btn warning-bg">
                <Mail size={16} />
                Email
              </a>
              <a
                href="https://github.com/SantoshSingh1707"
                target="_blank"
                rel="noreferrer"
                className="resume-btn success-bg"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="resume-metric-stack">
          <div className="resume-metric-card">
            <span>Primary Track</span>
            <strong>AI / Machine Learning</strong>
          </div>
          <div className="resume-metric-card">
            <span>Based In</span>
            <strong>Dehradun, India</strong>
          </div>
          <div className="resume-metric-card">
            <span>Portfolio Style</span>
            <strong>Interactive Desktop OS</strong>
          </div>
        </div>
      </section>

      <div className="resume-layout">
        <section className="resume-panel resume-preview-panel">
          <div className="resume-panel-header">
            <div>
              <p className="section-eyebrow">Document Preview</p>
              <h3>Resume Preview</h3>
            </div>
            <button type="button" className="resume-inline-link" onClick={openResumePdf}>
              <ExternalLink size={14} />
              Open full PDF
            </button>
          </div>
          <div className="resume-preview-shell">
            <iframe title="Resume Preview" src="/Resume.pdf#toolbar=0&navpanes=0&view=FitH" />
          </div>
        </section>

        <section className="resume-panel">
          <div className="resume-panel-header">
            <div>
              <p className="section-eyebrow">Snapshot</p>
              <h3>What this resume emphasizes</h3>
            </div>
            <FileText size={18} color="#0078d7" />
          </div>

          <div className="resume-highlight-list">
            {highlights.map((item) => {
              const IconComponent = item.icon;

              return (
                <article key={item.title} className="resume-highlight-item">
                  <div className="resume-highlight-icon">
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                    <p>{item.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="resume-panel">
          <div className="resume-panel-header">
            <div>
              <p className="section-eyebrow">Focus Areas</p>
              <h3>Work I want to keep growing</h3>
            </div>
            <Brain size={18} color="#107c10" />
          </div>
          <div className="resume-focus-grid">
            {focusAreas.map((area) => (
              <div key={area} className="resume-focus-card">
                <span>{area}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-panel">
          <div className="resume-panel-header">
            <div>
              <p className="section-eyebrow">Core Stack</p>
              <h3>Tools highlighted in the resume</h3>
            </div>
            <MapPin size={18} color="#ff8c00" />
          </div>
          <div className="flex-wrap">
            {stack.map((item) => (
              <span key={item} className="skill-tag">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeApp;
