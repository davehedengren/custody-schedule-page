// Storage utilities using Replit Database (with fallback to localStorage)

let db = null;

// Try to initialize Replit Database, fallback to localStorage
try {
  if (typeof window === 'undefined') {
    // Server-side: use actual Replit Database
    const Database = require('@replit/database');
    db = new Database();
  }
} catch (e) {
  console.log('Replit Database not available, using localStorage');
}

// Fallback storage using localStorage
const localStorageDB = {
  async get(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  },
  async set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  async list(prefix = '') {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(prefix)) {
        keys.push(key);
      }
    }
    return keys;
  },
  async delete(key) {
    localStorage.removeItem(key);
  }
};

const storage = db || localStorageDB;

// Save a proposal with timestamp
export async function saveProposal(mode, assignments) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const key = `${mode}-${timestamp}`;
  
  const proposal = {
    year: 2026,
    assignments,
    savedAt: new Date().toISOString()
  };
  
  await storage.set(key, proposal);
  return key;
}

// Get all proposals for a specific mode (mom or dad)
export async function getProposals(mode) {
  const prefix = `${mode}-`;
  const keys = await storage.list(prefix);
  
  // Get all proposals
  const proposals = await Promise.all(
    keys.map(async (key) => {
      const data = await storage.get(key);
      return {
        key,
        ...data
      };
    })
  );
  
  // Sort by savedAt descending (newest first)
  return proposals.sort((a, b) => 
    new Date(b.savedAt) - new Date(a.savedAt)
  );
}

// Get a specific proposal
export async function getProposal(key) {
  return await storage.get(key);
}

// Delete a proposal
export async function deleteProposal(key) {
  await storage.delete(key);
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

