#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Aero Car Store Backend...\n');

// Check if backend directory exists
const backendDir = path.join(__dirname, 'backend');
if (!fs.existsSync(backendDir)) {
  console.error('❌ Backend directory not found!');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(backendDir, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Database
MONGODB_URI=mongodb://localhost:27017/aero-car-store
# Alternative: MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aero-car-store

# JWT Secret (Generate a strong secret for production)
JWT_SECRET=aero-car-store-super-secret-jwt-key-${Date.now()}
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:8080`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created');
} else {
  console.log('✅ .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: backendDir, stdio: 'inherit' });
  console.log('✅ Backend dependencies installed');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Create frontend .env.local file
const frontendEnvPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(frontendEnvPath)) {
  console.log('\n📝 Creating frontend .env.local file...');
  
  const frontendEnvContent = `# Frontend Environment Variables
VITE_API_URL=http://localhost:5000/api`;

  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('✅ Frontend .env.local file created');
} else {
  console.log('✅ Frontend .env.local file already exists');
}

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Start the backend server: cd backend && npm run dev');
console.log('3. Start the frontend: npm run dev');
console.log('\n🔗 Backend will run on: http://localhost:5000');
console.log('🔗 Frontend will run on: http://localhost:8080');
console.log('\n💡 For MongoDB Atlas setup, update the MONGODB_URI in backend/.env');
