#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Aero Car Store Backend Deployment Helper\n');

console.log('📋 Your MongoDB Atlas connection string:');
console.log('mongodb+srv://abdelchpro_db_user:aRwH1vHSEqXyFQ1c@caraccessauto.5inb8j3.mongodb.net/aero-car-store\n');

console.log('🔧 Environment Variables for Production:');
console.log('MONGODB_URI=mongodb+srv://abdelchpro_db_user:aRwH1vHSEqXyFQ1c@caraccessauto.5inb8j3.mongodb.net/aero-car-store');
console.log('JWT_SECRET=aero-car-store-production-secret-2024-' + Date.now());
console.log('JWT_EXPIRE=7d');
console.log('NODE_ENV=production');
console.log('FRONTEND_URL=https://accesscarauto.com\n');

console.log('📁 Backend files ready for deployment:');
console.log('✅ server.js');
console.log('✅ package.json');
console.log('✅ vercel.json');
console.log('✅ models/User.js');
console.log('✅ routes/auth.js');
console.log('✅ routes/users.js');
console.log('✅ middleware/auth.js\n');

console.log('🎯 Next Steps:');
console.log('1. Go to https://vercel.com');
console.log('2. Create new project');
console.log('3. Upload the "backend" folder');
console.log('4. Add the environment variables above');
console.log('5. Deploy');
console.log('6. Copy the deployment URL');
console.log('7. Update frontend API URL to: https://your-url.vercel.app/api\n');

console.log('🔗 Your frontend will then work at: https://accesscarauto.com');
console.log('🔗 Your backend will be at: https://your-url.vercel.app\n');

console.log('💡 Need help? Check DEPLOYMENT.md for detailed instructions!');
