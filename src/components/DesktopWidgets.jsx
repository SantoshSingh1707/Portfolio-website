import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { CalendarDays, Cpu } from 'lucide-react';

const DesktopWidgets = () => {
  const [time, setTime] = useState(new Date());
  const nodeRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });

  // Use optional chaining for window to avoid SSR issues if we ever go default framework
  const defaultX = typeof window !== 'undefined' ? window.innerWidth - 320 : 800;

  return (
    <Draggable bounds="parent" handle=".desktop-widget-clock" nodeRef={nodeRef} defaultPosition={{ x: defaultX, y: 50 }}>
      <div ref={nodeRef} className="desktop-widget-clock">
        <div className="desktop-widget-header">
          <span className="widget-label">Focus Widget</span>
          <span className="widget-status">Live</span>
        </div>
        <div className="widget-time">{timeString}</div>
        <div className="widget-date">
          <CalendarDays size={14} />
          <span>{dateString}</span>
        </div>
        <div className="widget-footer">
          <div className="widget-mini-stat">
            <Cpu size={14} />
            <span>Creative mode</span>
          </div>
          <div className="widget-mini-stat accent">
            <span>Build. Learn. Ship.</span>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DesktopWidgets;
