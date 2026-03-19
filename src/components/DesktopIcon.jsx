import React from 'react';

const DesktopIcon = ({ name, icon: IconComponent, onClick }) => (
  <div className="desktop-icon" onClick={onClick}>
    <div className="icon-placeholder">
      <IconComponent size={42} strokeWidth={1.5} />
    </div>
    <span>{name}</span>
  </div>
);

export default DesktopIcon;
