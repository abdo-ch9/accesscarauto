// Vercel catch-all serverless function that forwards every /api/*
// request to the Express app exported from ../server

const app = require('../server');

module.exports = (req, res) => {
  return app(req, res);
};


