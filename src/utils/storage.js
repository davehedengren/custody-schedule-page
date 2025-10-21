// Storage utilities using backend API (with Replit Database)

const API_URL = import.meta.env.PROD 
  ? '/api'  // Production: same origin
  : 'http://localhost:3000/api';  // Development: backend server

// Save a proposal with timestamp
export async function saveProposal(mode, assignments) {
  try {
    const response = await fetch(`${API_URL}/proposals/${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assignments })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.key;
  } catch (error) {
    console.error('Error saving proposal:', error);
    throw error;
  }
}

// Get all proposals for a specific mode (mom or dad)
export async function getProposals(mode) {
  try {
    const response = await fetch(`${API_URL}/proposals/${mode}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting proposals:', error);
    return []; // Return empty array on error
  }
}

// Get a specific proposal
export async function getProposal(key) {
  try {
    const response = await fetch(`${API_URL}/proposal/${key}`);
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting proposal:', error);
    return null;
  }
}

// Delete a proposal
export async function deleteProposal(key) {
  try {
    const response = await fetch(`${API_URL}/proposal/${key}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting proposal:', error);
    throw error;
  }
}

// Format timestamp for display
export function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
