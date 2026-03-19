import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Minus, Square, X } from 'lucide-react';

const Window = ({ 
  title, id, children, onClose, onMinimize, isOpen, 
  isMinimized, zIndex, onFocus, icon: IconComponent, 
  noPadding, isFullscreen, snap, onToggleFullscreen, onSnap, initialIndex = 0
}) => {
  const nodeRef = useRef(null);
  
  if (!isOpen) return null;

  const handleDragStop = (e, data) => {
    const threshold = 20;
    const screenWidth = window.innerWidth;
    
    if (data.y <= 0) {
      onToggleFullscreen(id);
    } else if (data.x <= threshold) {
      onSnap(id, 'left');
    } else if (data.x >= screenWidth - 200) { // arbitrary width check
      onSnap(id, 'right');
    } else {
      onSnap(id, 'none');
    }
  };

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".window-header" 
      bounds="parent"
      onStart={() => onFocus(id)}
      onStop={handleDragStop}
      disabled={isFullscreen || snap !== 'none'}
      defaultPosition={{ x: 100 + (initialIndex * 30), y: 50 + (initialIndex * 30) }}
    >
      <div 
        ref={nodeRef}
        className={`window open ${isFullscreen ? 'fullscreen' : ''} ${isMinimized ? 'minimized' : ''} snap-${snap}`} 
        style={{ zIndex }}
        onMouseDownCapture={() => onFocus(id)}
      >
        <div className="window-header" onDoubleClick={() => onToggleFullscreen(id)}>
          <span className="window-title">
            {IconComponent && <IconComponent size={16} color="#0078d7" />}
            {title}
            {snap !== 'none' && <span className="snap-indicator"> (Snapped)</span>}
          </span>
          <div className="window-controls" onMouseDown={e => e.stopPropagation()}>
            <div className="control-btn" onClick={() => onMinimize(id)} title="Minimize"><Minus size={14} /></div>
            <div className="control-btn" onClick={() => { if (snap !== 'none') onSnap(id, 'none'); else onToggleFullscreen(id); }} title="Maximize"><Square size={12} /></div>
            <div className="control-btn close" onClick={() => onClose(id)} title="Close">
              <X size={16} />
            </div>
          </div>
        </div>
        <div className="window-content" style={noPadding ? { padding: 0 } : {}} onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
