import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const DesktopIcon = ({ name, icon, position, onDragStop, onDoubleClick, onActivate, disabled }) => {
  const nodeRef = useRef(null);

  const handleStop = (e, data) => {
    onDragStop({ x: data.x, y: data.y });
  };

  const iconMarkup = (
    <>
      <div className="desktop-icon-shell" style={{ pointerEvents: 'none' }}>
        <div className="icon-placeholder">
          {icon ? React.createElement(icon, { size: 42, strokeWidth: 1.5 }) : null}
        </div>
      </div>
      <span className="desktop-icon-label" style={{ pointerEvents: 'none' }}>{name}</span>
    </>
  );

  if (disabled) {
    return (
      <div ref={nodeRef} className="desktop-icon mobile-icon" onClick={onActivate}>
        {iconMarkup}
      </div>
    );
  }

  return (
    <Draggable 
      nodeRef={nodeRef}
      onStop={handleStop}
      defaultPosition={position}
      bounds="parent"
      disabled={false}
    >
      <div 
        ref={nodeRef} 
        className="desktop-icon" 
        onDoubleClick={onDoubleClick}
      >
        {iconMarkup}
      </div>
    </Draggable>
  );
};

export default DesktopIcon;
