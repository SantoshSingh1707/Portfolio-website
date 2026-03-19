import React, { useState } from 'react';
import { Search, Power, Settings, User, GraduationCap, FolderDot, Wrench, Mail, FileText, Terminal, Music, Globe, HardDrive, LayoutGrid } from 'lucide-react';

const StartMenu = ({ onOpenApp, focusWindow }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const pinnedApps = [
    { id: 'about', title: 'About Me', icon: User },
    { id: 'projects', title: 'Projects', icon: FolderDot },
    { id: 'skills', title: 'Skills', icon: Wrench },
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
  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="start-menu-inner">
        <div className="search-bar">
          <Search size={18} color="#666" />
          <input 
            type="text" 
            placeholder="Type here to search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="pinned-section">
          <div className="section-header">
            <h4>Pinned</h4>
            <button className="all-apps-btn">All apps {'>'}</button>
          </div>
          
          <div className="start-menu-grid">
            {filteredApps.map(app => (
              <div 
                key={app.id} 
                className="start-menu-item"
                onClick={() => onOpenApp(app.id)}
              >
                <div className="start-app-icon">
                  {React.createElement(app.icon, { size: 32, strokeWidth: 1.5 })}
                </div>
                <span>{app.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="recommended-section">
          <h4>Recommended</h4>
          <div className="recommended-grid">
            <div className="recommended-item">
              <div className="rec-icon"><User size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Get Started</span>
                <span className="rec-desc">Welcome to Santosh OS</span>
              </div>
            </div>
            <div className="recommended-item">
              <div className="rec-icon"><Settings size={20} /></div>
              <div className="rec-text">
                <span className="rec-title">Personalize</span>
                <span className="rec-desc">Change your wallpaper</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="start-footer">
        <div className="user-info">
          <div className="user-avatar">SS</div>
          <span>Santosh Singh</span>
        </div>
        <Power size={20} color="#666" className="power-btn" onClick={() => alert('Shutting down...')} />
      </div>
    </div>
  );
};

export default StartMenu;
