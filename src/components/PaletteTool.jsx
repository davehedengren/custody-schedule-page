import React from 'react';

export default function PaletteTool({ selectedTool, onSelectTool }) {
  return (
    <div className="palette-tool">
      <h2>Select Days</h2>
      <div className="palette-buttons">
        <button
          className={`palette-btn mom-btn ${selectedTool === 'mom' ? 'active' : ''}`}
          onClick={() => onSelectTool('mom')}
        >
          Mom Days
        </button>
        <button
          className={`palette-btn dad-btn ${selectedTool === 'dad' ? 'active' : ''}`}
          onClick={() => onSelectTool('dad')}
        >
          Dad Days
        </button>
        <button
          className={`palette-btn clear-btn ${selectedTool === 'clear' ? 'active' : ''}`}
          onClick={() => onSelectTool('clear')}
        >
          Clear Days
        </button>
      </div>
    </div>
  );
}

