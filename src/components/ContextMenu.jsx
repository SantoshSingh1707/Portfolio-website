import React from 'react';
import { RefreshCw, Settings } from 'lucide-react';

const ContextMenu = ({ x, y, onClose, onRefresh, onSettings }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }}>
      <div className="context-menu-item" onClick={() => { onRefresh(); onClose(); }}>
        <RefreshCw size={14} /> Refresh
      </div>
      <div className="context-divider"></div>
      <div className="context-menu-item" onClick={() => { onSettings(); onClose(); }}>
        <Settings size={14} /> Personalize
      </div>
    </div>
  );
};

export default ContextMenu;
