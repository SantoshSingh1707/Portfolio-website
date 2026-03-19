import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const DesktopIcon = ({ id, name, icon: IconComponent, position, onDragStop, onDoubleClick, disabled }) => {
  const nodeRef = useRef(null);

  const handleStop = (e, data) => {
    onDragStop({ x: data.x, y: data.y });
  };

  return (
    <Draggable 
      nodeRef={nodeRef}
      onStop={handleStop}
      defaultPosition={position}
      bounds="parent"
      disabled={disabled}
      position={disabled ? { x: 0, y: 0 } : undefined}
    >
      <div 
        ref={nodeRef} 
        className="desktop-icon" 
        onDoubleClick={onDoubleClick}
      >
        <div className="icon-placeholder" style={{ pointerEvents: 'none' }}>
          <IconComponent size={42} strokeWidth={1.5} />
        </div>
        <span style={{ pointerEvents: 'none' }}>{name}</span>
      </div>
    </Draggable>
  );
};

export default DesktopIcon;
