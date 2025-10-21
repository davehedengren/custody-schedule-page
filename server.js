// Simple Express server to handle Replit Database operations
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Initialize Replit Database
let db;
try {
  const Database = require('@replit/database');
  db = new Database();
  console.log('✅ Replit Database connected');
} catch (e) {
  console.error('⚠️  Replit Database not available:', e.message);
  // Fallback to in-memory storage for local development
  const memoryStore = {};
  db = {
    async get(key) { return memoryStore[key]; },
    async set(key, value) { memoryStore[key] = value; },
    async list(prefix = '') {
      return Object.keys(memoryStore).filter(k => k.startsWith(prefix));
    },
    async delete(key) { delete memoryStore[key]; }
  };
  console.log('ℹ️  Using in-memory storage for development');
}

app.use(cors());
app.use(express.json());

// Get all proposals for a mode (mom or dad)
app.get('/api/proposals/:mode', async (req, res) => {
  try {
    const mode = req.params.mode;
    const prefix = `${mode}-`;
    const keys = await db.list(prefix);
    
    const proposals = await Promise.all(
      keys.map(async (key) => {
        const data = await db.get(key);
        return {
          key,
          ...data
        };
      })
    );
    
    // Sort by savedAt descending (newest first)
    proposals.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    
    res.json(proposals);
  } catch (error) {
    console.error('Error getting proposals:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific proposal
app.get('/api/proposal/:key', async (req, res) => {
  try {
    const data = await db.get(req.params.key);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Proposal not found' });
    }
  } catch (error) {
    console.error('Error getting proposal:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save a proposal
app.post('/api/proposals/:mode', async (req, res) => {
  try {
    const mode = req.params.mode;
    const { assignments } = req.body;
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const key = `${mode}-${timestamp}`;
    
    const proposal = {
      year: 2026,
      assignments,
      savedAt: new Date().toISOString()
    };
    
    await db.set(key, proposal);
    res.json({ key, ...proposal });
  } catch (error) {
    console.error('Error saving proposal:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a proposal
app.delete('/api/proposal/:key', async (req, res) => {
  try {
    await db.delete(req.params.key);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting proposal:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 API server running on port ${port}`);
});

