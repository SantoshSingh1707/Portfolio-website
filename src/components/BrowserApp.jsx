import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Globe,
  Home,
  Lock,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';

const HOME_URL = 'app://home';

const quickLinks = [
  {
    label: 'Hugging Face',
    url: 'https://huggingface.co/',
    category: 'Models',
    description: 'Explore models, datasets, and Spaces for applied ML work.',
  },
  {
    label: 'Kaggle',
    url: 'https://www.kaggle.com/',
    category: 'Datasets',
    description: 'Find datasets, notebooks, and community ML challenges.',
  },
  {
    label: 'arXiv',
    url: 'https://arxiv.org/',
    category: 'Papers',
    description: 'Scan recent research papers across ML, AI, and systems.',
  },
  {
    label: 'Papers With Code',
    url: 'https://paperswithcode.com/',
    category: 'Benchmarks',
    description: 'Map papers to implementations, leaderboards, and tasks.',
  },
  {
    label: 'Google Colab',
    url: 'https://colab.research.google.com/',
    category: 'Notebooks',
    description: 'Spin up cloud notebooks for experiments and demos.',
  },
  {
    label: 'Scikit-learn',
    url: 'https://scikit-learn.org/stable/',
    category: 'Docs',
    description: 'Reference classic ML APIs, examples, and model docs.',
  },
  {
    label: 'MLflow',
    url: 'https://mlflow.org/',
    category: 'MLOps',
    description: 'Track experiments, runs, and reproducible ML workflows.',
  },
  {
    label: 'DVC',
    url: 'https://dvc.org/',
    category: 'Pipelines',
    description: 'Manage data versions, stages, and reproducible pipelines.',
  },
];

const externalOnlyHosts = new Set([
  'github.com',
  'www.github.com',
  'google.com',
  'www.google.com',
  'linkedin.com',
  'www.linkedin.com',
  'instagram.com',
  'www.instagram.com',
  'x.com',
  'www.x.com',
  'facebook.com',
  'www.facebook.com',
  'youtube.com',
  'www.youtube.com',
  'openai.com',
  'www.openai.com',
  'huggingface.co',
  'www.huggingface.co',
  'kaggle.com',
  'www.kaggle.com',
  'arxiv.org',
  'www.arxiv.org',
  'paperswithcode.com',
  'www.paperswithcode.com',
  'colab.research.google.com',
  'mlflow.org',
  'www.mlflow.org',
  'dvc.org',
  'www.dvc.org',
]);

const looksLikeUrl = (value) => {
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('localhost') ||
    value.includes('.') ||
    /^\d{1,3}(\.\d{1,3}){3}/.test(value)
  );
};

const normalizeTarget = (value) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return HOME_URL;
  }

  if (trimmed === HOME_URL || trimmed.toLowerCase() === 'home') {
    return HOME_URL;
  }

  if (!looksLikeUrl(trimmed)) {
    return `https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}&ia=web`;
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const getHost = (value) => {
  if (value === HOME_URL) {
    return 'Browser Home';
  }

  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value;
  }
};

const shouldForceExternal = (value) => {
  if (value === HOME_URL) {
    return false;
  }

  try {
    return externalOnlyHosts.has(new URL(value).hostname);
  } catch {
    return false;
  }
};

const BrowserHome = ({ onNavigate }) => {
  return (
    <div className="browser-home">
      <div className="browser-home-hero">
        <div className="browser-home-badge">
          <Sparkles size={14} />
          <span>Browser Home</span>
        </div>
        <h2>Browse inside the portfolio, jump out when a site blocks embeds.</h2>
        <p>
          Many modern websites refuse to load inside an iframe. This browser previews the ones
          that allow it and gives you a one-click handoff for the rest.
        </p>
      </div>

      <div className="browser-link-grid">
        {quickLinks.map((link) => (
          <button
            key={link.url}
            type="button"
            className="browser-link-card"
            onClick={() => onNavigate(link.url)}
          >
            <div className="browser-link-icon">
              <Globe size={18} />
            </div>
            <div>
              <small className="browser-link-category">{link.category}</small>
              <strong>{link.label}</strong>
              <span>{getHost(link.url)}</span>
              <p>{link.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="browser-home-note">
        Try typing a full URL like <code>scikit-learn.org</code> or a search like
        <code> arxiv diffusion transformers</code>.
      </div>
    </div>
  );
};

const BrowserApp = ({ onOpenExternal }) => {
  const [history, setHistory] = useState([HOME_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastExternalOpen, setLastExternalOpen] = useState('');

  const currentUrl = history[historyIndex] ?? HOME_URL;
  const isHome = currentUrl === HOME_URL;
  const forceExternal = shouldForceExternal(currentUrl);

  const pageTitle = useMemo(() => getHost(currentUrl), [currentUrl]);

  const openSiteOutside = (url, label) => {
    if (!url || url === HOME_URL) {
      return;
    }

    if (onOpenExternal) {
      onOpenExternal(url, label || getHost(url));
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setLastExternalOpen(url);
  };

  const navigateTo = (target) => {
    const nextUrl = normalizeTarget(target);
    const trimmedHistory = history.slice(0, historyIndex + 1);
    trimmedHistory.push(nextUrl);
    setHistory(trimmedHistory);
    setHistoryIndex(trimmedHistory.length - 1);
    setUrlInput(nextUrl === HOME_URL ? '' : nextUrl);
    setIsLoading(nextUrl !== HOME_URL && !shouldForceExternal(nextUrl));

    if (shouldForceExternal(nextUrl)) {
      openSiteOutside(nextUrl, getHost(nextUrl));
    }
  };

  const handleNavigate = (event) => {
    event.preventDefault();
    navigateTo(urlInput);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      const nextUrl = history[nextIndex];
      setHistoryIndex(nextIndex);
      setUrlInput(nextUrl === HOME_URL ? '' : nextUrl);
      setIsLoading(nextUrl !== HOME_URL && !shouldForceExternal(nextUrl));

      if (shouldForceExternal(nextUrl)) {
        openSiteOutside(nextUrl, getHost(nextUrl));
      }
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextUrl = history[nextIndex];
      setHistoryIndex(nextIndex);
      setUrlInput(nextUrl === HOME_URL ? '' : nextUrl);
      setIsLoading(nextUrl !== HOME_URL && !shouldForceExternal(nextUrl));

      if (shouldForceExternal(nextUrl)) {
        openSiteOutside(nextUrl, getHost(nextUrl));
      }
    }
  };

  const openCurrentSite = () => {
    if (isHome) {
      return;
    }

    openSiteOutside(currentUrl, pageTitle);
  };

  const reloadPage = () => {
    if (isHome) {
      return;
    }

    setIsLoading(true);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="browser-app">
      <div className="browser-tabs">
        <div className="browser-tab active">
          <Globe size={14} />
          <span>{isHome ? 'New Tab' : pageTitle}</span>
        </div>
        <button type="button" className="browser-external-btn" onClick={openCurrentSite} disabled={isHome}>
          <ExternalLink size={14} />
          <span>Open Outside</span>
        </button>
      </div>

      <div className="browser-header">
        <div className="browser-nav-btns">
          <button type="button" className="browser-icon-btn" onClick={goBack} disabled={historyIndex === 0}>
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            className="browser-icon-btn"
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
          >
            <ArrowRight size={16} />
          </button>
          <button type="button" className="browser-icon-btn" onClick={reloadPage} disabled={isHome}>
            <RefreshCw size={16} className={isLoading ? 'spin-icon' : ''} />
          </button>
          <button type="button" className="browser-icon-btn" onClick={() => navigateTo(HOME_URL)}>
            <Home size={16} />
          </button>
        </div>

        <form className="browser-address-bar" onSubmit={handleNavigate}>
          <div className="browser-security-indicator">
            {currentUrl.startsWith('https://') ? <Lock size={14} /> : <Search size={14} />}
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(event) => setUrlInput(event.target.value)}
            placeholder="Search or enter web address"
          />
          <button type="submit" className="browser-go-btn">
            Go
          </button>
        </form>
      </div>

      <div className="browser-shortcuts">
        {quickLinks.map((link) => (
          <button key={link.url} type="button" className="browser-chip" onClick={() => navigateTo(link.url)}>
            {link.label}
          </button>
        ))}
      </div>

      <div className="browser-statusbar">
        <div className="browser-status-pill">
          <span className={`browser-status-dot ${forceExternal ? 'warning' : 'live'}`}></span>
          <span>{isHome ? 'Home' : forceExternal ? 'External open recommended' : 'Embedded preview'}</span>
        </div>
        {!isHome && (
          <span className="browser-status-text">
            {forceExternal
              ? lastExternalOpen === currentUrl
                ? 'This site was opened in a real browser tab because it blocks embedded browsing.'
                : 'This site is known to block embedded views. Use Open Outside for the real page.'
              : 'If a page looks blank, that site is probably blocking iframe embeds. Open it outside.'}
          </span>
        )}
      </div>

      <div className="browser-content">
        {isHome ? (
          <BrowserHome onNavigate={navigateTo} />
        ) : forceExternal ? (
          <div className="browser-fallback">
            <div className="browser-fallback-card">
              <div className="browser-fallback-icon">
                <ExternalLink size={24} />
              </div>
              <h3>This site should open in a real browser tab.</h3>
              <p>
                {pageTitle} blocks embedded browsing, so the preview inside this portfolio window
                would look broken or blank.
              </p>
              {lastExternalOpen === currentUrl && (
                <p className="browser-fallback-note">
                  We already launched this page in a new tab for you.
                </p>
              )}
              <button type="button" className="browser-primary-btn" onClick={openCurrentSite}>
                Open {pageTitle}
              </button>
            </div>
          </div>
        ) : (
          <div className="browser-frame-wrap">
            {isLoading && (
              <div className="browser-loading">
                <div className="spinner"></div>
                <span>Loading preview...</span>
              </div>
            )}
            <iframe
              key={`${currentUrl}-${reloadKey}`}
              src={currentUrl}
              title={`Browser preview for ${pageTitle}`}
              onLoad={() => setIsLoading(false)}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="fullscreen"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserApp;
