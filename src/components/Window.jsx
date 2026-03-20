import React, { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { Minus, Square, X } from 'lucide-react';

const Window = ({ 
  title, id, children, onClose, onMinimize, isOpen, 
  isMinimized, zIndex, onFocus, icon: IconComponent, isActive,
  noPadding, isFullscreen, snap, onToggleFullscreen, onSnap, initialIndex = 0
}) => {
  const nodeRef = useRef(null);
  const contentStyle = noPadding
    ? { padding: 0, overflow: 'hidden', minHeight: 0 }
    : { minHeight: 0 };
  
  if (!isOpen) return null;

  const setSnapPreview = (target) => {
    const root = document.documentElement;
    if (target === 'none') {
      delete root.dataset.snapPreview;
      return;
    }

    root.dataset.snapPreview = target;
  };

  const getSnapTarget = (x, y) => {
    const threshold = 28;
    const screenWidth = window.innerWidth;

    if (y <= 12) {
      return 'fullscreen';
    }

    if (x <= threshold) {
      return 'left';
    }

    if (x >= screenWidth - 220) {
      return 'right';
    }

    return 'none';
  };

  const handleDrag = (e, data) => {
    setSnapPreview(getSnapTarget(data.x, data.y));
  };

  const handleDragStop = (e, data) => {
    const target = getSnapTarget(data.x, data.y);
    setSnapPreview('none');

    if (target === 'fullscreen') {
      onToggleFullscreen(id);
      return;
    }

    if (target === 'left' || target === 'right') {
      onSnap(id, target);
      return;
    }

    onSnap(id, 'none');
  };

  useEffect(() => {
    return () => {
      setSnapPreview('none');
    };
  }, []);

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".window-header" 
      bounds="parent"
      onStart={() => {
        onFocus(id);
        setSnapPreview('none');
      }}
      onDrag={handleDrag}
      onStop={handleDragStop}
      disabled={isFullscreen || snap !== 'none'}
      defaultPosition={{ x: 100 + (initialIndex * 30), y: 50 + (initialIndex * 30) }}
    >
      <div 
        ref={nodeRef}
        className={`window open ${isFullscreen ? 'fullscreen' : ''} ${isMinimized ? 'minimized' : ''} snap-${snap} ${isActive ? 'is-active' : ''}`} 
        style={{ zIndex }}
        onMouseDownCapture={() => onFocus(id)}
      >
        <div className="window-header" onDoubleClick={() => onToggleFullscreen(id)}>
          <div className="window-title-wrap">
            <span className="window-app-badge">
              {IconComponent && <IconComponent size={16} color="#0078d7" />}
            </span>
            <span className="window-title">
              {title}
              {snap !== 'none' && <span className="snap-indicator">Snapped</span>}
            </span>
          </div>
          <div className="window-controls" onMouseDown={e => e.stopPropagation()}>
            <button type="button" className="control-btn" onClick={() => onMinimize(id)} title="Minimize"><Minus size={14} /></button>
            <button type="button" className="control-btn" onClick={() => { if (snap !== 'none') onSnap(id, 'none'); else onToggleFullscreen(id); }} title="Maximize"><Square size={12} /></button>
            <button type="button" className="control-btn close" onClick={() => onClose(id)} title="Close">
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="window-content" style={contentStyle} onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
