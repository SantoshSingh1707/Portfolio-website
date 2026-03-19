import React from 'react';
import { Search, Power } from 'lucide-react';

const StartMenu = ({ windows, toggleWindow, focusWindow }) => {
  return (
    <div className="start-menu" onClick={(e) => e.stopPropagation()}>
      <div className="search-bar">
        <Search size={18} color="#666" />
        <input type="text" placeholder="Type here to search" />
      </div>
      <div>
        <h4 style={{ fontSize: '14px', marginBottom: '15px', color: '#333' }}>Pinned Apps</h4>
        <div className="start-menu-grid">
          {Object.keys(windows).map(id => {
            const app = windows[id];
            return (
              <div 
                key={id} 
                className="start-menu-item"
                onClick={() => { if (!app.isOpen) toggleWindow(id); else focusWindow(id); }}
              >
                <div className="start-app-icon">
                  {React.createElement(app.icon, { size: 24, color: '#0078d7' })}
                </div>
                <span>{app.title}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="start-footer">
        <div className="user-info">
          <div className="user-avatar">S</div>
          <span>Santosh Singh</span>
        </div>
        <Power size={20} color="#666" className="power-btn" onClick={() => alert('Shutting down...')} />
      </div>
    </div>
  );
};

export default StartMenu;
