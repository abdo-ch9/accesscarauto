// Vercel catch-all serverless function that forwards every /api/*
// request to the Express app exported from backend/server.js

const app = require('../backend/server');

module.exports = (req, res) => {
  // Ensure Express sees the /api prefix even if the platform strips it
  if (req.url && !req.url.startsWith('/api/')) {
    req.url = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`;
  }
  return app(req, res);
};


