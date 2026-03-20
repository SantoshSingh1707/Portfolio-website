import React, { useState } from 'react';
import {
  Search,
  Power,
  Settings,
  User,
  FolderDot,
  Wrench,
  FileText,
  Terminal,
  Music,
  Globe,
  HardDrive,
  LayoutGrid,
  Sparkles,
  ArrowRight,
  BookOpenText,
  FlaskConical,
  BarChart3,
  Database,
  Activity,
  Milestone,
  Trophy,
  Bot,
  Compass,
} from 'lucide-react';

const StartMenu = ({ onOpenApp, onShutdown, onStartTour }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const pinnedApps = [
    { id: 'about', title: 'About Me', icon: User },
    { id: 'projects', title: 'Projects', icon: FolderDot },
    { id: 'skills', title: 'Skills', icon: Wrench },
    { id: 'resume', title: 'Resume', icon: FileText },
    { id: 'researchlab', title: 'Research Lab', icon: BookOpenText },
    { id: 'livedemo', title: 'Live Demo', icon: FlaskConical },
    { id: 'experimenttracker', title: 'Experiment Tracker', icon: BarChart3 },
    { id: 'datasetexplorer', title: 'Dataset Explorer', icon: Database },
    { id: 'modelmonitor', title: 'Model Monitor', icon: Activity },
    { id: 'timeline', title: 'Timeline', icon: Milestone },
    { id: 'achievements', title: 'Achievements', icon: Trophy },
    { id: 'aiassistant', title: 'AI Assistant', icon: Bot },
    { id: 'recruitertour', title: 'Recruiter Tour', icon: Compass },
    { id: 'notepad', title: 'Notepad', icon: FileText },
    { id: 'terminal', title: 'Terminal', icon: Terminal },
    { id: 'settings', title: 'Settings', icon: Settings },
    { id: 'music', title: 'Music Player', icon: Music },
    { id: 'browser', title: 'Browser', icon: Globe },
    { id: 'explorer', title: 'Explorer', icon: HardDrive },
    { id: 'taskmanager', title: 'Task Manager', icon: LayoutGrid }
  ];

  const filteredApps = pinnedApps.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const launchFirstMatch = (event) => {
    if (event.key === 'Enter' && filteredApps[0]) {
      onOpenApp(filteredApps[0].id);
    }
  };

  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-inner">
        <div className="start-menu-hero">
          <div>
            <div className="start-menu-badge">
              <Sparkles size={14} />
              <span>Good to see you</span>
            </div>
            <h3>Launch labs, demos, and recruiter-ready ML walkthroughs.</h3>
          </div>
          <button type="button" className="start-hero-action" onClick={onStartTour}>
            Start Tour
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="search-bar">
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Type here to search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={launchFirstMatch}
            autoFocus
          />
        </div>
        
        <div className="start-menu-section pinned-section">
          <div className="section-header">
            <div>
              <h4>Pinned</h4>
              <p className="section-subtitle">Core launchpad</p>
            </div>
            <button type="button" className="all-apps-btn">Desktop Apps</button>
          </div>
          
          <div className="start-menu-grid">
            {filteredApps.map((app, index) => (
              <button 
                key={app.id} 
                type="button"
                className="start-menu-item"
                style={{ '--item-index': index }}
                onClick={() => onOpenApp(app.id)}
              >
                <div className="start-app-icon">
                  {React.createElement(app.icon, { size: 32, strokeWidth: 1.5 })}
                </div>
                <span>{app.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="start-menu-section recommended-section">
          <div className="section-header">
            <div>
              <h4>Recommended</h4>
              <p className="section-subtitle">Fast ways to explore</p>
            </div>
            <span className="section-caption">Quick actions</span>
          </div>
          <div className="recommended-grid">
            <button type="button" className="recommended-item" style={{ '--item-index': 0 }} onClick={() => onOpenApp('about')}>
              <div className="rec-icon"><User size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">About Santosh</span>
                <span className="rec-desc">Quick intro and current focus</span>
              </div>
            </button>
            <button type="button" className="recommended-item" style={{ '--item-index': 1 }} onClick={() => onOpenApp('settings')}>
              <div className="rec-icon"><Settings size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Personalize</span>
                <span className="rec-desc">Wallpaper, accent, and visual feel</span>
              </div>
            </button>
            <button type="button" className="recommended-item" style={{ '--item-index': 2 }} onClick={() => onOpenApp('projects')}>
              <div className="rec-icon"><FolderDot size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Project Tour</span>
                <span className="rec-desc">Jump into the strongest builds</span>
              </div>
            </button>
            <button type="button" className="recommended-item" style={{ '--item-index': 3 }} onClick={() => onOpenApp('resume')}>
              <div className="rec-icon"><FileText size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Resume</span>
                <span className="rec-desc">Preview the PDF and quick profile summary</span>
              </div>
            </button>
            <button type="button" className="recommended-item" style={{ '--item-index': 4 }} onClick={() => onOpenApp('researchlab')}>
              <div className="rec-icon"><BookOpenText size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Research Lab</span>
                <span className="rec-desc">Notes, themes, and current ML curiosity areas</span>
              </div>
            </button>
            <button type="button" className="recommended-item" style={{ '--item-index': 5 }} onClick={() => onOpenApp('aiassistant')}>
              <div className="rec-icon"><Bot size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">AI Assistant</span>
                <span className="rec-desc">Ask the portfolio what to open and why</span>
              </div>
            </button>
            <button type="button" className="recommended-item" style={{ '--item-index': 6 }} onClick={onStartTour}>
              <div className="rec-icon"><Compass size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Recruiter Tour</span>
                <span className="rec-desc">Guided walkthrough of the strongest sections</span>
              </div>
            </button>
            <button type="button" className="recommended-item" style={{ '--item-index': 7 }} onClick={() => onOpenApp('taskmanager')}>
              <div className="rec-icon"><LayoutGrid size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">System Control</span>
                <span className="rec-desc">View open apps and active windows</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="start-footer">
        <div className="user-info">
          <div className="user-avatar">SS</div>
          <div className="user-meta">
            <span>Santosh Singh</span>
            <small>Portfolio Workspace</small>
          </div>
        </div>
        <Power size={20} color="#666" className="power-btn" onClick={onShutdown} />
      </div>
    </div>
  );
};

export default StartMenu;
