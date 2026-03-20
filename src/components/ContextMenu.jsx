import React from 'react';
import { RefreshCw, Settings, SortAsc, Info, Monitor } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, onRefresh, onSettings, onSort, onSystemInfo }) => {
  const actions = [
    { label: 'Refresh', icon: RefreshCw, shortcut: 'F5', onClick: onRefresh },
    { label: 'Sort Icons', icon: SortAsc, shortcut: 'A-Z', onClick: onSort },
  ];

  const personalization = [
    { label: 'Personalize', icon: Settings, shortcut: 'Theme', onClick: onSettings },
    { label: 'Display Settings', icon: Monitor, shortcut: 'Layout', onClick: onSettings },
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
            <span className="context-menu-item-icon">{React.createElement(action.icon, { size: 14 })}</span>
            <span>{action.label}</span>
            {action.shortcut ? <kbd className="context-menu-kbd">{action.shortcut}</kbd> : null}
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
            <span className="context-menu-item-icon">{React.createElement(action.icon, { size: 14 })}</span>
            <span>{action.label}</span>
            {action.shortcut ? <kbd className="context-menu-kbd">{action.shortcut}</kbd> : null}
          </button>
        ))}
      </div>

      <div className="context-divider"></div>

      <button
        type="button"
        className="context-menu-item context-menu-single"
        onClick={() => {
          onSystemInfo();
          onClose();
        }}
      >
        <span className="context-menu-item-icon"><Info size={14} /></span>
        <span>System Information</span>
        <kbd className="context-menu-kbd">Info</kbd>
      </button>
    </div>
  );
};

export default ContextMenu;
