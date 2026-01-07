import React, { useState, useEffect } from 'react';
import { saveProposal, getProposals, getProposal, formatTimestamp } from '../utils/storage';

export default function FileControls({ 
  currentMode,
  assignments, 
  onLoadProposal, 
  onCompareProposals,
  comparisonMode,
  onExitComparison 
}) {
  const [momProposals, setMomProposals] = useState([]);
  const [dadProposals, setDadProposals] = useState([]);
  const [selectedMomProposal, setSelectedMomProposal] = useState('');
  const [selectedDadProposal, setSelectedDadProposal] = useState('');
  const [lastSelectedMomProposal, setLastSelectedMomProposal] = useState('');
  const [saving, setSaving] = useState(false);

  // Load proposals on mount and when mode changes
  useEffect(() => {
    loadAllProposals();
  }, [currentMode]);

  const loadAllProposals = async () => {
    const momList = await getProposals('mom');
    const dadList = await getProposals('dad');
    setMomProposals(momList);
    setDadProposals(dadList);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProposal(currentMode, assignments);
      await loadAllProposals(); // Refresh the lists
      alert(`Proposal saved to ${currentMode === 'mom' ? 'Mom' : 'Dad'} track!`);
    } catch (error) {
      alert('Error saving proposal: ' + error.message);
    }
    setSaving(false);
  };

  const handleLoadMom = async (e) => {
    const key = e.target.value;
    setSelectedMomProposal(key);
    if (key) {
      setLastSelectedMomProposal(key);
      const proposal = await getProposal(key);
      if (proposal) {
        onLoadProposal(proposal.assignments);
      }
    }
  };

  const handleLoadDad = async (e) => {
    const key = e.target.value;
    setSelectedDadProposal(key);
    if (key) {
      const proposal = await getProposal(key);
      if (proposal) {
        onLoadProposal(proposal.assignments);
      }
    }
  };

  const handleCompare = async () => {
    if (!selectedMomProposal || !selectedDadProposal) {
      alert('Please select both a Mom proposal and a Dad proposal to compare');
      return;
    }

    const momProposal = await getProposal(selectedMomProposal);
    const dadProposal = await getProposal(selectedDadProposal);

    if (momProposal && dadProposal) {
      onCompareProposals(momProposal.assignments, dadProposal.assignments);
    }
  };

  return (
    <div className="file-controls">
      <h2>Proposal Management</h2>
      
      {!comparisonMode ? (
        <div className="storage-mode">
          <div className="control-group">
            <button 
              onClick={handleSave} 
              className="control-btn save-btn"
              disabled={saving}
            >
              {saving ? 'Saving...' : `Save to ${currentMode === 'mom' ? 'Mom' : 'Dad'} Track`}
            </button>
          </div>
          
          <div className="control-group">
            <label className="dropdown-label">Load Mom Proposal:</label>
            <select 
              value={selectedMomProposal} 
              onChange={handleLoadMom}
              className="proposal-dropdown"
            >
              <option value="">-- Select Mom Proposal --</option>
              {momProposals.map(proposal => (
                <option key={proposal.key} value={proposal.key}>
                  {formatTimestamp(proposal.savedAt)}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label className="dropdown-label">Load Dad Proposal:</label>
            <select 
              value={selectedDadProposal} 
              onChange={handleLoadDad}
              className="proposal-dropdown"
            >
              <option value="">-- Select Dad Proposal --</option>
              {dadProposals.map(proposal => (
                <option key={proposal.key} value={proposal.key}>
                  {formatTimestamp(proposal.savedAt)}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group compare-group">
            <h3>Compare Proposals</h3>
            <p className="compare-hint">Select one from each list above, then click compare</p>
            <button 
              onClick={handleCompare} 
              className="control-btn compare-btn"
              disabled={!selectedMomProposal || !selectedDadProposal}
            >
              Compare Selected Proposals
            </button>
          </div>
        </div>
      ) : (
        <div className="comparison-mode">
          <div className="mode-indicator">
            <strong>Comparison Mode Active</strong>
            <p>Disputed days show M (Mom's proposal) and D (Dad's proposal) with colors. Hover for details.</p>
          </div>
          <button onClick={async () => {
            // Load the last selected mom proposal
            if (lastSelectedMomProposal) {
              const proposal = await getProposal(lastSelectedMomProposal);
              if (proposal) {
                onLoadProposal(proposal.assignments);
              }
            }
            // Reset dropdowns
            setSelectedMomProposal('');
            setSelectedDadProposal('');
            onExitComparison();
          }} className="control-btn exit-btn">
            Exit Comparison
          </button>
        </div>
      )}
    </div>
  );
}
