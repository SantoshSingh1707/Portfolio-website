import React from 'react';
import { Compass, X } from 'lucide-react';

const TourGuide = ({ step, currentIndex, totalSteps, onNext, onPrevious, onClose }) => {
  if (!step) {
    return null;
  }

  return (
    <div className="tour-guide">
      <div className="tour-guide-head">
        <div className="tour-guide-title">
          <span className="tour-guide-icon"><Compass size={16} /></span>
          <div>
            <strong>Recruiter Tour</strong>
            <span>Step {currentIndex + 1} of {totalSteps}</span>
          </div>
        </div>
        <button type="button" className="tour-guide-close" onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <h4>{step.title}</h4>
      <p>{step.description}</p>
      <div className="tour-guide-actions">
        <button type="button" className="system-modal-btn ghost" onClick={onPrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button type="button" className="system-modal-btn primary" onClick={onNext}>
          {currentIndex === totalSteps - 1 ? 'Finish Tour' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default TourGuide;
