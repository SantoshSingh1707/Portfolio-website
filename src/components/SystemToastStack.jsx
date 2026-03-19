import React from 'react';
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertTriangle,
};

const SystemToastStack = ({ toasts, onDismiss }) => {
  if (!toasts.length) {
    return null;
  }

  return (
    <div className="system-toast-stack">
      {toasts.map((toast) => {
        const ToastIcon = iconMap[toast.tone] || Info;

        return (
          <div key={toast.id} className={`system-toast tone-${toast.tone || 'info'}`}>
            <div className="system-toast-icon">
              <ToastIcon size={16} />
            </div>
            <div className="system-toast-copy">
              <strong>{toast.title}</strong>
              {toast.description && <span>{toast.description}</span>}
            </div>
            <button type="button" className="system-toast-close" onClick={() => onDismiss(toast.id)}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SystemToastStack;
