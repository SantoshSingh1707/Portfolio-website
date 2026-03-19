import React from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  danger: AlertTriangle,
};

const SystemModal = ({ modal, onClose }) => {
  if (!modal) {
    return null;
  }

  const ModalIcon = iconMap[modal.tone] || Info;

  return (
    <div className="system-modal-backdrop" onClick={onClose}>
      <div className={`system-modal tone-${modal.tone || 'info'}`} onClick={(event) => event.stopPropagation()}>
        <div className="system-modal-header">
          <div className="system-modal-title-row">
            <div className="system-modal-icon">
              <ModalIcon size={18} />
            </div>
            <div>
              <h3>{modal.title}</h3>
              {modal.subtitle && <p>{modal.subtitle}</p>}
            </div>
          </div>
          <button type="button" className="system-modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {modal.description && <p className="system-modal-description">{modal.description}</p>}

        {modal.details?.length ? (
          <div className="system-modal-details">
            {modal.details.map((detail) => (
              <div key={detail.label} className="system-modal-detail">
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
              </div>
            ))}
          </div>
        ) : null}

        <div className="system-modal-actions">
          {(modal.actions || [{ label: 'Close', variant: 'primary' }]).map((action) => (
            <button
              key={action.label}
              type="button"
              className={`system-modal-btn ${action.variant || 'ghost'}`}
              onClick={() => {
                action.onClick?.();
                if (!action.keepOpen) {
                  onClose();
                }
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemModal;
