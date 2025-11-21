import React from 'react';

export default function Instructions({ onBack }) {
  return (
    <div className="instructions-page">
      <div className="instructions-content">
        <h1>How to Use the Custody Schedule App</h1>
        
        <div className="instructions-link">
          <p><strong>App URL:</strong> <a href="https://custody-schedule.replit.app/" target="_blank" rel="noopener noreferrer">https://custody-schedule.replit.app/</a></p>
        </div>

        <section className="instructions-section">
          <h2>Overview</h2>
          <p>The goal of this app is to make it easier to make proposals for custody time with Grayson and Hudson. If it's helpful, I can make revisions to make it easier to have a shared official calendar that we can make proposed changes to in the future so we always know what day the kids are with whom and when we made a change. For now, it's just trying to save us all from manual manual work in making proposals.</p>
        </section>

        <section className="instructions-section">
          <h2>Logging In</h2>
          <p>Since we only have two accounts for this, you just log in as 'jessica' or 'bryson' to access the Mom track or Dad track respectively.</p>
        </section>

        <section className="instructions-section">
          <h2>Reviewing a Proposal</h2>
          <p>To review an existing proposal, just select it from the pull down menu on the Mom Track or the Dad Track.</p>
        </section>

        <section className="instructions-section">
          <h2>Making a New Proposal</h2>
          <p>To make a new proposal, just start editing an existing proposal by selecting Mom Days or Dad Days and clicking the dates you want to change.</p>
          <p>When you have a version you want to share, you can save it to the Dad Track with the button "Save to Dad/Mom Track." This creates a unique time stamped version that no one can change.</p>
        </section>

        <section className="instructions-section">
          <h2>Reviewing Two Proposals</h2>
          <p>To compare one proposal to another, just select one from the Dad track, and one from the Mom Track then click "Compare Selected Proposals"</p>
          <p>The dates that have changed are highlighted in purple.</p>
        </section>

        <section className="instructions-section">
          <h2>Troubleshooting</h2>
          <p>The system doesn't save automatically but you can make as many proposal drafts as you like. Just be sure to let us know which is the one you want us to look at.</p>
          <p>If you don't see a schedule on the screen, just refresh, login and select the proposal you want to work from.</p>
        </section>

        <button onClick={onBack} className="back-to-calendar-btn">
          Back to Calendar
        </button>
      </div>
    </div>
  );
}

