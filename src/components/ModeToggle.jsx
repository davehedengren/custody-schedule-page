import React from 'react';

export default function ModeToggle({ currentMode, onToggle }) {
  const modeDisplay = currentMode === 'mom' ? 'Mom Proposal Mode' : 'Dad Proposal Mode';
  const modeClass = currentMode === 'mom' ? 'mode-mom' : 'mode-dad';

  return (
    <div className={`mode-toggle ${modeClass}`}>
      <div className="mode-indicator">
        <span className="mode-label">Current Mode:</span>
        <span className="mode-name">{modeDisplay}</span>
      </div>
      <button onClick={onToggle} className="mode-switch-btn">
        Switch Mode
      </button>
    </div>
  );
}

