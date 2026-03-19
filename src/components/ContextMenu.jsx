import React from 'react';
import { RefreshCw, Settings, SortAsc, Info, Monitor } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, onRefresh, onSettings, onSort, onSystemInfo }) => {
  const actions = [
    { label: 'Refresh', icon: RefreshCw, onClick: onRefresh },
    { label: 'Sort Icons', icon: SortAsc, onClick: onSort },
  ];

  const personalization = [
    { label: 'Personalize', icon: Settings, onClick: onSettings },
    { label: 'Display Settings', icon: Monitor, onClick: onSettings },
  ];

  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div className="context-menu-section">
        <span className="context-menu-label">Desktop</span>
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="context-menu-item"
            onClick={() => {
              action.onClick();
              onClose();
            }}
          >
            {React.createElement(action.icon, { size: 14 })}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      <div className="context-divider"></div>

      <div className="context-menu-section">
        <span className="context-menu-label">Personalization</span>
        {personalization.map((action) => (
          <button
            key={action.label}
            type="button"
            className="context-menu-item"
            onClick={() => {
              action.onClick();
              onClose();
            }}
          >
            {React.createElement(action.icon, { size: 14 })}
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      <div className="context-divider"></div>

      <button
        type="button"
        className="context-menu-item"
        onClick={() => {
          onSystemInfo();
          onClose();
        }}
      >
        <Info size={14} />
        <span>System Information</span>
      </button>
    </div>
  );
};

export default ContextMenu;
