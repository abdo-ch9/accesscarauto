# 🚀 Production Deployment Guide

## The Problem
Your frontend at `http://accesscarauto.com` is trying to connect to `http://localhost:5000/api`, which only works locally. You need to deploy your backend and update the API URL.

## 🛠️ Solution: Deploy Backend to Vercel

### Step 1: Deploy Backend to Vercel

1. **Go to [Vercel](https://vercel.com) and sign in**
2. **Click "New Project"**
3. **Import your repository** (or upload the backend folder)
4. **Set the following environment variables in Vercel:**

```
MONGODB_URI=mongodb+srv://abdelchpro_db_user:aRwH1vHSEqXyFQ1c@caraccessauto.5inb8j3.mongodb.net/aero-car-store
JWT_SECRET=your-super-secret-jwt-key-for-production
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://accesscarauto.com
```

5. **Deploy** - Vercel will give you a URL like `https://your-project.vercel.app`

### Step 2: Update Frontend API URL

After deploying your backend, update the frontend:

1. **Create `.env.production` file in your project root:**
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

2. **Or update `src/services/api.ts` line 1-4:**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://your-backend-url.vercel.app/api'  // Replace with your actual Vercel URL
    : 'http://localhost:5000/api');
```

### Step 3: Redeploy Frontend

After updating the API URL, redeploy your frontend to `accesscarauto.com`.

## 🔧 Alternative: Deploy Backend to Railway/Render

### Railway (Recommended Alternative)

1. **Go to [Railway](https://railway.app)**
2. **Connect your GitHub repository**
3. **Select the backend folder**
4. **Add environment variables:**
   - `MONGODB_URI=mongodb+srv://abdelchpro_db_user:aRwH1vHSEqXyFQ1c@caraccessauto.5inb8j3.mongodb.net/aero-car-store`
   - `JWT_SECRET=your-production-secret`
   - `FRONTEND_URL=https://accesscarauto.com`
5. **Deploy** - Railway will give you a URL like `https://your-app.railway.app`

### Render

1. **Go to [Render](https://render.com)**
2. **Create a new Web Service**
3. **Connect your repository**
4. **Set build command:** `npm install`
5. **Set start command:** `npm start`
6. **Add environment variables** (same as above)
7. **Deploy**

## 🧪 Testing Production

After deployment:

1. **Test backend health:** `https://your-backend-url.vercel.app/api/health`
2. **Test registration:** Use your frontend at `accesscarauto.com`
3. **Check MongoDB Atlas** - New users should appear in your database

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Error:** Make sure `FRONTEND_URL` is set correctly in backend environment
2. **MongoDB Connection:** Verify your MongoDB Atlas connection string
3. **JWT Secret:** Use a strong, unique secret for production
4. **API URL:** Double-check the frontend is pointing to the correct backend URL

### Quick Fix for Testing:

If you want to test immediately, you can temporarily update your frontend to use a public backend URL. But for production, you should deploy your own backend.

## 📝 Environment Variables Summary

**Backend (.env in Vercel/Railway/Render):**
```
MONGODB_URI=mongodb+srv://abdelchpro_db_user:aRwH1vHSEqXyFQ1c@caraccessauto.5inb8j3.mongodb.net/aero-car-store
JWT_SECRET=your-super-secret-jwt-key-for-production
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=https://accesscarauto.com
```

**Frontend (.env.production):**
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## 🎯 Next Steps

1. **Deploy backend** to Vercel/Railway/Render
2. **Update frontend** API URL
3. **Redeploy frontend**
4. **Test authentication** on your live site

Your authentication will work perfectly once the backend is deployed and the API URL is updated! 🚀
