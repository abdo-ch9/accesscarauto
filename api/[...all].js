// Vercel catch-all serverless function that forwards every /api/*
// request to the Express app exported from backend/server.js

const app = require('../backend/server');

module.exports = (req, res) => {
  return app(req, res);
};


