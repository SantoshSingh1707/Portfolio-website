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
} from 'lucide-react';

const StartMenu = ({ onOpenApp, onShutdown }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const pinnedApps = [
    { id: 'about', title: 'About Me', icon: User },
    { id: 'projects', title: 'Projects', icon: FolderDot },
    { id: 'skills', title: 'Skills', icon: Wrench },
    { id: 'resume', title: 'Resume', icon: FileText },
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
            <h3>Launch apps, explore projects, and tune the desktop.</h3>
          </div>
          <button type="button" className="start-hero-action" onClick={() => onOpenApp('browser')}>
            Open Browser
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
        
        <div className="pinned-section">
          <div className="section-header">
            <h4>Pinned</h4>
            <button type="button" className="all-apps-btn">Desktop Apps</button>
          </div>
          
          <div className="start-menu-grid">
            {filteredApps.map(app => (
              <button 
                key={app.id} 
                type="button"
                className="start-menu-item"
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

        <div className="recommended-section">
          <div className="section-header">
            <h4>Recommended</h4>
            <span className="section-caption">Fast ways to explore</span>
          </div>
          <div className="recommended-grid">
            <button type="button" className="recommended-item" onClick={() => onOpenApp('about')}>
              <div className="rec-icon"><User size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">About Santosh</span>
                <span className="rec-desc">Quick intro and current focus</span>
              </div>
            </button>
            <button type="button" className="recommended-item" onClick={() => onOpenApp('settings')}>
              <div className="rec-icon"><Settings size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Personalize</span>
                <span className="rec-desc">Wallpaper, accent, and visual feel</span>
              </div>
            </button>
            <button type="button" className="recommended-item" onClick={() => onOpenApp('projects')}>
              <div className="rec-icon"><FolderDot size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Project Tour</span>
                <span className="rec-desc">Jump into the strongest builds</span>
              </div>
            </button>
            <button type="button" className="recommended-item" onClick={() => onOpenApp('resume')}>
              <div className="rec-icon"><FileText size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Resume</span>
                <span className="rec-desc">Preview the PDF and quick profile summary</span>
              </div>
            </button>
            <button type="button" className="recommended-item" onClick={() => onOpenApp('taskmanager')}>
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
