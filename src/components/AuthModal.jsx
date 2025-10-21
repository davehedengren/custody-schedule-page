import React, { useState } from 'react';

export default function AuthModal({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowerPassword = password.toLowerCase();
    
    if (lowerPassword === 'mom' || lowerPassword === 'dad') {
      onAuthenticate(lowerPassword);
      setError('');
    } else {
      setError('Invalid password. Please enter "mom" or "dad".');
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
            placeholder="Enter password (mom or dad)"
            className="auth-input"
            autoFocus
          />
          
          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" className="auth-submit">
            Enter
          </button>
        </form>
        
        <div className="auth-hint">
          Hint: Password is either "mom" or "dad"
        </div>
      </div>
    </div>
  );
}

