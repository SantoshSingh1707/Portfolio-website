import React, { useState, useEffect } from 'react';
import { LayoutGrid, Wifi, BatteryMedium, Volume2, ChevronUp } from 'lucide-react';

const Taskbar = ({ openWindows, activeWindow, onFocus, onToggleStart, isStartOpen }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="taskbar">
      <div className="taskbar-brand">
        <span className="taskbar-brand-dot"></span>
        <span>Santosh OS</span>
      </div>

      <div className="taskbar-center">
        <button
          type="button"
          className={`start-btn ${isStartOpen ? 'active' : ''}`}
          onClick={onToggleStart}
          title="Start"
          data-tooltip="Start"
          aria-label="Start"
        >
          <LayoutGrid size={24} color={isStartOpen ? '#0078d7' : '#00a2ed'} fill={isStartOpen ? '#0078d7' : 'none'} />
        </button>
        {Object.keys(openWindows).map(id => (
          openWindows[id].isOpen && (
            <button 
              key={id} 
              type="button"
              className={`taskbar-item ${activeWindow === id && !openWindows[id].isMinimized ? 'active' : ''} ${openWindows[id].isMinimized ? 'minimized-item' : ''}`}
              onClick={() => onFocus(id)}
              title={openWindows[id].title}
              data-tooltip={openWindows[id].title}
              aria-label={openWindows[id].title}
            >
              <div className="taskbar-icon-wrapper">
                 {React.createElement(openWindows[id].icon, { size: 22, color: "white", strokeWidth: 1.5 })}
              </div>
            </button>
          )
        ))}
      </div>
      
      <div className="taskbar-right">
        <div className="system-tray">
          <ChevronUp size={16} />
          <Wifi size={16} />
          <Volume2 size={16} />
          <BatteryMedium size={16} />
          <span className="system-tray-chip">Online</span>
        </div>
        <div className="taskbar-time">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="taskbar-date">{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
