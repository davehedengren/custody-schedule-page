import React, { useState } from 'react';
import Calendar from './components/Calendar';
import PaletteTool from './components/PaletteTool';
import Statistics from './components/Statistics';
import HolidaySidebar from './components/HolidaySidebar';
import FileControls from './components/FileControls';
import AuthModal from './components/AuthModal';
import ModeToggle from './components/ModeToggle';
import HamburgerMenu from './components/HamburgerMenu';
import Instructions from './components/Instructions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentMode, setCurrentMode] = useState(null); // 'mom' or 'dad'
  const [assignments, setAssignments] = useState({});
  const [selectedTool, setSelectedTool] = useState('mom');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [currentView, setCurrentView] = useState('calendar'); // 'calendar' or 'instructions'

  const handleAuthenticate = (mode) => {
    setCurrentMode(mode);
    setIsAuthenticated(true);
  };

  const handleToggleMode = () => {
    // Reset state and re-authenticate
    setIsAuthenticated(false);
    setCurrentMode(null);
    setAssignments({});
    setComparisonMode(false);
  };

  const handleDayClick = (dateStr) => {
    if (comparisonMode) return; // Can't edit in comparison mode

    setAssignments(prev => {
      const newAssignments = { ...prev };
      
      if (selectedTool === 'clear') {
        delete newAssignments[dateStr];
      } else {
        newAssignments[dateStr] = selectedTool;
      }
      
      return newAssignments;
    });
  };

  const handleLoadProposal = (loadedAssignments) => {
    setAssignments(loadedAssignments);
    setComparisonMode(false);
  };

  const handleCompareProposals = (momAssignments, dadAssignments) => {
    // Create merged assignments with disputed days
    const merged = {};
    const allDates = new Set([
      ...Object.keys(momAssignments),
      ...Object.keys(dadAssignments)
    ]);

    allDates.forEach(dateStr => {
      const momAssignment = momAssignments[dateStr];
      const dadAssignment = dadAssignments[dateStr];

      if (momAssignment && dadAssignment) {
        // Both have assignments
        if (momAssignment === dadAssignment) {
          // Same assignment - no dispute
          merged[dateStr] = momAssignment;
        } else {
          // Different assignments - disputed
          merged[dateStr] = 'disputed';
        }
      } else if (momAssignment) {
        // Only mom has assignment
        merged[dateStr] = momAssignment;
      } else if (dadAssignment) {
        // Only dad has assignment
        merged[dateStr] = dadAssignment;
      }
    });

    setAssignments(merged);
    setComparisonMode(true);
  };

  const handleExitComparison = () => {
    setAssignments({});
    setComparisonMode(false);
  };

  if (!isAuthenticated) {
    return <AuthModal onAuthenticate={handleAuthenticate} />;
  }

  if (currentView === 'instructions') {
    return (
      <div className="app">
        <Instructions onBack={() => setCurrentView('calendar')} />
      </div>
    );
  }

  return (
    <div className="app">
      <HolidaySidebar />
      <HamburgerMenu assignments={assignments} onLoadProposal={handleLoadProposal} />
      
      <div className="main-content">
        <header className="app-header">
          <h1>Custody Calendar 2026</h1>
          <div className="header-controls">
            <button 
              className="instructions-btn" 
              onClick={() => setCurrentView('instructions')}
            >
              Instructions
            </button>
            <ModeToggle currentMode={currentMode} onToggle={handleToggleMode} />
          </div>
        </header>

        <div className="controls-section">
          {!comparisonMode && (
            <PaletteTool 
              selectedTool={selectedTool}
              onSelectTool={setSelectedTool}
            />
          )}
          
          <Statistics 
            assignments={assignments}
            comparisonMode={comparisonMode}
          />
          
          <FileControls
            currentMode={currentMode}
            assignments={assignments}
            onLoadProposal={handleLoadProposal}
            onCompareProposals={handleCompareProposals}
            comparisonMode={comparisonMode}
            onExitComparison={handleExitComparison}
          />
        </div>

        <Calendar
          assignments={assignments}
          onDayClick={handleDayClick}
          comparisonMode={comparisonMode}
        />
      </div>
    </div>
  );
}

export default App;
