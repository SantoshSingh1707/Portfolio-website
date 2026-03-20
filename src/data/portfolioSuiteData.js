export const recruiterTourSteps = [
  {
    id: 'about',
    title: 'Meet Santosh',
    description: 'Start with a fast overview of focus area, location, and what kind of work this portfolio is built to highlight.',
  },
  {
    id: 'resume',
    title: 'Open the Resume',
    description: 'Jump into the structured profile, PDF preview, and the quickest recruiter-friendly summary.',
  },
  {
    id: 'projects',
    title: 'See the Best ML Projects',
    description: 'Walk through the strongest builds first: the RAG study platform and the kidney pipeline evidence panel.',
  },
  {
    id: 'researchlab',
    title: 'Explore the Research Layer',
    description: 'Show how learning notes, reading themes, and experimentation topics connect to the project work.',
  },
  {
    id: 'contact',
    title: 'Close with Contact',
    description: 'End the tour on the action step recruiters usually care about next.',
  },
];

export const researchLabBoards = [
  {
    title: 'RAG Quality',
    summary: 'How chunking, retrieval thresholds, and source grounding change usefulness in learning tools.',
    notes: [
      'Smaller chunks improve precision but can break concept continuity.',
      'Good source citations reduce trust issues in generated study material.',
      'UI matters: learners need source visibility and simple feedback loops.',
    ],
    link: 'https://arxiv.org/search/?query=rag+evaluation&searchtype=all',
  },
  {
    title: 'ML Reproducibility',
    summary: 'Thinking about DVC, experiment traceability, and artifact discipline as part of model building.',
    notes: [
      'Pipelines feel more real when data paths and artifacts are first-class citizens.',
      'Logs are often more honest than polished dashboards.',
      'Small reproducibility habits compound into stronger project reliability.',
    ],
    link: 'https://dvc.org/doc',
  },
  {
    title: 'Applied GenAI UX',
    summary: 'Designing interfaces where AI is helpful, inspectable, and grounded instead of just flashy.',
    notes: [
      'Learners need explanations, not only outputs.',
      'Inline confidence and source cues reduce confusion.',
      'A good fallback flow matters when AI or embeds fail.',
    ],
    link: 'https://huggingface.co/',
  },
];

export const experimentRuns = [
  {
    id: 'rag-build-0313',
    project: 'AI Study Tool',
    status: 'Documented',
    config: 'top_k=10 | threshold=0.20-0.25 | questions=5',
    evidence: 'README + Streamlit flow + study history chart',
    outcome: 'Interactive quiz, learning notes, flashcards, and CSV export paths defined',
  },
  {
    id: 'kidney-ingest-0228',
    project: 'Kidney Disease Classifier',
    status: 'Completed',
    config: 'data.zip -> artifacts/data_ingestion | config-driven pipeline',
    evidence: 'logs/running_logs.log',
    outcome: 'Data ingestion stage started, downloaded dataset, and completed successfully',
  },
  {
    id: 'portfolio-os-0320',
    project: 'Portfolio OS',
    status: 'Verified',
    config: 'Playwright + persistence + custom modal system',
    evidence: 'Local test suite',
    outcome: 'Interactive desktop experience covered by end-to-end tests',
  },
];

export const datasetCollections = [
  {
    id: 'study-docs',
    title: 'Study Documents',
    type: 'Unstructured knowledge source',
    source: 'PDF / TXT / DOCX / PPTX',
    preprocessing: ['OCR fallback when needed', 'Chunking into smaller retrieval units', 'Embeddings sent to vector store'],
    sample: `{
  "source_file": "thermodynamics_notes.pdf",
  "chunk_id": "thermo-12",
  "topic": "Internal combustion engine",
  "retrieval_ready": true
}`,
  },
  {
    id: 'kidney-images',
    title: 'Kidney Image Pipeline',
    type: 'Image classification workflow',
    source: 'Zip dataset downloaded into artifacts',
    preprocessing: ['Data ingestion stage', 'Config-managed artifact layout', 'Pipeline-ready training structure'],
    sample: `{
  "image_path": "artifacts/data_ingestion/train/kidney/sample_018.png",
  "label": "kidney",
  "stage": "ingested",
  "tracked_by": "DVC-style pipeline discipline"
}`,
  },
  {
    id: 'workspace-events',
    title: 'Portfolio Workspace Events',
    type: 'UI and interaction telemetry idea',
    source: 'Future enhancement for this OS portfolio',
    preprocessing: ['Window open/focus tracking', 'Tour completion events', 'Most viewed ML sections'],
    sample: `{
  "event": "tour_step_completed",
  "step": "projects",
  "timestamp": "2026-03-20T05:12:00",
  "session_mode": "desktop"
}`,
  },
];

export const modelMonitorItems = [
  {
    title: 'RAG Response Health',
    status: 'Nominal',
    detail: 'Grounding, citations, and study flow are behaving as expected in the portfolio demo.',
    meter: 82,
  },
  {
    title: 'Experiment Traceability',
    status: 'Strong',
    detail: 'Project evidence includes config files, logs, and pipeline-oriented structure rather than only screenshots.',
    meter: 88,
  },
  {
    title: 'Operational Readiness',
    status: 'Observe',
    detail: 'Next step is replacing simulated dashboards with exported MLflow or DVC snapshots.',
    meter: 64,
  },
];

export const timelineMilestones = [
  {
    phase: 'Foundations',
    title: 'Core programming and CS fundamentals',
    description: 'Built the base with Python, Java, C, data structures, and algorithm practice before leaning deeper into ML.',
  },
  {
    phase: 'Applied ML',
    title: 'From coursework to machine learning projects',
    description: 'Shifted from isolated learning into hands-on experimentation with classifiers, notebooks, and practical pipelines.',
  },
  {
    phase: 'RAG + Tooling',
    title: 'Interactive AI learning systems',
    description: 'Started building retrieval-driven applications that combine useful UX with model-backed workflows.',
  },
  {
    phase: 'Systems Thinking',
    title: 'Portfolio OS and ML workflow presentation',
    description: 'Turned projects into a desktop-style portfolio that shows not just outputs, but also structure, evidence, and product thinking.',
  },
];

export const achievementCards = [
  {
    title: 'Built a RAG study application',
    detail: 'Combined retrieval, quiz generation, learning notes, and source-aware UX in one ML-focused product.',
  },
  {
    title: 'Structured a pipeline-oriented kidney project',
    detail: 'Used config files, artifact directories, logs, and staged execution patterns instead of a notebook-only workflow.',
  },
  {
    title: 'Created a desktop OS portfolio shell',
    detail: 'Wrapped technical work in a memorable interface with browser fallbacks, persistence, testing, and custom app experiences.',
  },
  {
    title: 'Maintained automated end-to-end coverage',
    detail: 'Protected core UX flows like startup, settings persistence, browser fallback, and app interactions with Playwright.',
  },
];

export const assistantKnowledge = [
  {
    id: 'best-project',
    question: 'What is Santosh strongest project?',
    answer: 'The strongest portfolio projects right now are the AI Study Tool for RAG-powered learning workflows and the Kidney Disease Classifier pipeline for ML process discipline.',
    relatedApp: 'projects',
    tags: ['best', 'strongest', 'project', 'projects', 'rag', 'kidney'],
  },
  {
    id: 'focus-area',
    question: 'What does Santosh focus on?',
    answer: 'The portfolio centers on machine learning systems, retrieval-augmented generation, experiment traceability, and practical product-minded ML interfaces.',
    relatedApp: 'about',
    tags: ['focus', 'area', 'ml', 'machine learning', 'rag', 'interests'],
  },
  {
    id: 'resume',
    question: 'Can I open the resume?',
    answer: 'Yes. The Resume app gives a quick summary, direct PDF preview, and fast recruiter-friendly entry points.',
    relatedApp: 'resume',
    tags: ['resume', 'cv', 'pdf', 'profile'],
  },
  {
    id: 'research',
    question: 'How does Santosh think about research?',
    answer: 'The Research Lab app highlights ongoing interest areas like RAG quality, ML reproducibility, and applied GenAI UX rather than pretending every idea is already a polished paper.',
    relatedApp: 'researchlab',
    tags: ['research', 'papers', 'reading', 'lab'],
  },
  {
    id: 'contact',
    question: 'How do I contact Santosh?',
    answer: 'The fastest route is the Contact window or the resume/contact actions that link to email and GitHub.',
    relatedApp: 'contact',
    tags: ['contact', 'email', 'github', 'reach'],
  },
];
