import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { Minus, Square, X } from 'lucide-react';

const Window = ({ 
  title, id, children, onClose, onMinimize, isOpen, 
  isMinimized, zIndex, onFocus, icon: IconComponent, 
  noPadding, isFullscreen, onToggleFullscreen 
}) => {
  const nodeRef = useRef(null);
  
  if (!isOpen) return null;

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".window-header" 
      bounds="parent"
      onMouseDown={() => onFocus(id)}
      disabled={isFullscreen}
    >
      <div 
        ref={nodeRef}
        className={`window open ${isFullscreen ? 'fullscreen' : ''} ${isMinimized ? 'minimized' : ''}`} 
        style={!isFullscreen ? { zIndex, top: `${10 + (zIndex - 10) % 10 * 2}%`, left: `${15 + (zIndex - 10) % 10 * 2}%` } : { zIndex }}
      >
        <div className="window-header" onDoubleClick={() => onToggleFullscreen(id)}>
          <span className="window-title">
            {IconComponent && <IconComponent size={16} color="#0078d7" />}
            {title}
          </span>
          <div className="window-controls" onMouseDown={e => e.stopPropagation()}>
            <div className="control-btn" onClick={() => onMinimize(id)} title="Minimize"><Minus size={14} /></div>
            <div className="control-btn" onClick={() => onToggleFullscreen(id)} title="Maximize"><Square size={12} /></div>
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
