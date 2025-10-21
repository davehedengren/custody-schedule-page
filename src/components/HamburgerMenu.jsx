import React, { useState, useRef } from 'react';

export default function HamburgerMenu({ assignments, onLoadProposal }) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const data = {
      year: 2026,
      assignments: assignments
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `custody-proposal-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.assignments) {
          onLoadProposal(data.assignments);
          setIsOpen(false);
        } else {
          alert('Invalid JSON format: missing assignments');
        }
      } catch (error) {
        alert('Error loading file: Invalid JSON format');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="hamburger-menu">
      <button 
        className="hamburger-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        ☰
      </button>
      
      {isOpen && (
        <>
          <div className="hamburger-overlay" onClick={() => setIsOpen(false)} />
          <div className="hamburger-dropdown">
            <h3>Backup Options</h3>
            <button onClick={handleExport} className="menu-item">
              <span className="menu-icon">💾</span>
              Export JSON
            </button>
            <button onClick={triggerFileInput} className="menu-item">
              <span className="menu-icon">📁</span>
              Import JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </div>
        </>
      )}
    </div>
  );
}

