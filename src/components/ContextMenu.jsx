import React from 'react';
import { RefreshCw, Settings, SortAsc, Info, Monitor } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, onRefresh, onSettings, onSort }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div className="context-menu-item" onClick={() => { onRefresh(); onClose(); }}>
        <RefreshCw size={14} /> Refresh
      </div>
      <div className="context-menu-item" onClick={() => { onSort(); onClose(); }}>
        <SortAsc size={14} /> Sort Icons
      </div>
      <div className="context-divider"></div>
      <div className="context-menu-item" onClick={() => { onSettings(); onClose(); }}>
        <Settings size={14} /> Personalize
      </div>
      <div className="context-menu-item" onClick={() => { onSettings(); onClose(); }}>
        <Monitor size={14} /> Display Settings
      </div>
      <div className="context-divider"></div>
      <div className="context-menu-item" onClick={() => { alert('Santosh Portfolio OS v2.0.4\nBuild: 2026.03.20'); onClose(); }}>
        <Info size={14} /> System Information
      </div>
    </div>
  );
};

export default ContextMenu;
