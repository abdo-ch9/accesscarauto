const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Behind Vercel/Proxies, trust the reverse proxy for correct IPs/rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration (allow Vercel domain, configured frontend, and local dev)
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  'http://localhost:5173',
  'http://localhost:8080'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin without Origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Fallback: allow other origins temporarily; tighten in production if needed
    return callback(null, true);
  },
  credentials: true
}));

// Handle preflight for API routes explicitly
app.options('/api/*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aero-car-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  // Avoid killing serverless function in Vercel; let routes return 500s instead
  if (process.env.VERCEL === '1') {
    // no-op: keep process alive for health/test routes
  } else {
    process.exit(1);
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Aero Car Store API is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  });
}

module.exports = app;
