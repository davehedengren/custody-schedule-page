import React, { useState } from 'react';

export default function AuthModal({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowerPassword = password.toLowerCase();
    
    if (lowerPassword === 'jessica') {
      onAuthenticate('mom');
      setError('');
    } else if (lowerPassword === 'bryson') {
      onAuthenticate('dad');
      setError('');
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2>Custody Calendar Access</h2>
        <p>Enter password to access Mom or Dad proposal mode:</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="auth-input"
            autoFocus
          />
          
          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" className="auth-submit">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

