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
      <div className="taskbar-center">
        <div className={`start-btn ${isStartOpen ? 'active' : ''}`} onClick={onToggleStart} title="Start">
          <LayoutGrid size={24} color={isStartOpen ? '#0078d7' : '#00a2ed'} fill={isStartOpen ? '#0078d7' : 'none'} />
        </div>
        {Object.keys(openWindows).map(id => (
          openWindows[id].isOpen && (
            <div 
              key={id} 
              className={`taskbar-item ${activeWindow === id && !openWindows[id].isMinimized ? 'active' : ''} ${openWindows[id].isMinimized ? 'minimized-item' : ''}`}
              onClick={() => onFocus(id)}
              title={openWindows[id].title}
            >
              <div className="taskbar-icon-wrapper">
                 {React.createElement(openWindows[id].icon, { size: 22, color: "white", strokeWidth: 1.5 })}
              </div>
            </div>
          )
        ))}
      </div>
      
      <div className="taskbar-right">
        <div className="system-tray" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '10px' }}>
          <ChevronUp size={16} style={{ cursor: 'pointer', opacity: 0.8 }} />
          <Wifi size={16} style={{ cursor: 'pointer', opacity: 0.8 }} />
          <Volume2 size={16} style={{ cursor: 'pointer', opacity: 0.8 }} />
          <BatteryMedium size={16} style={{ cursor: 'pointer', opacity: 0.8 }} />
        </div>
        <div className="taskbar-time">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span style={{ fontSize: '10px', opacity: 0.8 }}>{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
