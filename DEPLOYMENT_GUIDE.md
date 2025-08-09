# 🚀 Deployment Guide - 모두의 권리

## ✅ **READY TO DEPLOY!**

Your application is now **production-ready** and all code has been pushed to GitHub. Here's how to deploy:

## 🎯 **Deployment Steps**

### **1. Frontend Deployment (Vercel) - EASY!**

#### Step 1: Go to Vercel
1. Open [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"

#### Step 2: Import Repository
1. Select your repository: `callus-fullstack-internship`
2. Click "Import"

#### Step 3: Configure Project
1. **Framework Preset**: Next.js
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

#### Step 4: Environment Variables
Add this environment variable:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```
*(You'll get this URL after deploying the backend)*

#### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. **Save your frontend URL!** (e.g., `https://your-app.vercel.app`)

### **2. Backend Deployment (Railway) - EASY!**

#### Step 1: Go to Railway
1. Open [railway.app](https://railway.app)
2. Sign in with your GitHub account
3. Click "New Project"

#### Step 2: Import Repository
1. Select "Deploy from GitHub repo"
2. Choose your repository: `callus-fullstack-internship`
3. Click "Deploy Now"

#### Step 3: Configure Project
1. **Root Directory**: `backend`
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm run start:prod`

#### Step 4: Add Environment Variables
Click "Variables" tab and add:

```bash
# Database (Railway will provide these)
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name

# JWT Secret (generate a random one)
JWT_SECRET=your-super-secret-jwt-key-here

# Frontend URL (from Vercel deployment)
FRONTEND_URL=https://your-frontend-url.vercel.app

# Server Port
PORT=3001
```

#### Step 5: Add PostgreSQL Database
1. Click "New" → "Database" → "PostgreSQL"
2. Railway will automatically provide the database credentials
3. Copy the credentials to your environment variables

#### Step 6: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. **Save your backend URL!** (e.g., `https://your-app.railway.app`)

### **3. Update Frontend Environment Variable**

#### Step 1: Go Back to Vercel
1. Open your Vercel project
2. Go to "Settings" → "Environment Variables"
3. Update `NEXT_PUBLIC_API_URL` with your backend URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

#### Step 2: Redeploy
1. Go to "Deployments" tab
2. Click "Redeploy" on the latest deployment

## 🎯 **Alternative Backend Deployment (Render)**

If Railway doesn't work, try Render:

### Step 1: Go to Render
1. Open [render.com](https://render.com)
2. Sign in with your GitHub account
3. Click "New" → "Web Service"

### Step 2: Configure Service
1. **Repository**: Select your GitHub repo
2. **Root Directory**: `backend`
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm run start:prod`

### Step 3: Environment Variables
Add the same environment variables as above.

## 🧪 **Testing Your Deployment**

### **1. Test Frontend**
1. Open your Vercel URL
2. Test login functionality
3. Test all pages work
4. Test responsive design

### **2. Test Backend**
1. Open your backend URL + `/api` (e.g., `https://your-app.railway.app/api`)
2. Verify Swagger documentation loads
3. Test API endpoints

### **3. Test Full Integration**
1. Login with test credentials:
   - Email: `customer@test.com`
   - Password: `password123`
2. Test all CRUD operations
3. Test form submissions
4. Test navigation

## 🎯 **Common Issues & Solutions**

### **Issue 1: Frontend Can't Connect to Backend**
- **Solution**: Check `NEXT_PUBLIC_API_URL` environment variable
- **Solution**: Ensure backend is deployed and running

### **Issue 2: Database Connection Failed**
- **Solution**: Check database credentials in environment variables
- **Solution**: Ensure PostgreSQL database is created

### **Issue 3: Build Failed**
- **Solution**: Check build logs for errors
- **Solution**: Ensure all dependencies are installed

### **Issue 4: CORS Errors**
- **Solution**: Check `FRONTEND_URL` environment variable in backend
- **Solution**: Ensure URLs match exactly

## 🎉 **Deployment Complete!**

### **Your URLs**
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **API Docs**: `https://your-app.railway.app/api`

### **Next Steps**
1. ✅ Test all functionality
2. ✅ Record demo video
3. ✅ Update README with deployment URLs
4. ✅ Submit your assessment!

## 🚀 **You're Ready for Assessment!**

Your application is now:
- ✅ **Fully deployed** and working
- ✅ **Production-ready** with proper environment variables
- ✅ **Scalable** and maintainable
- ✅ **Documented** with API documentation
- ✅ **Tested** and verified

**Good luck with your assessment! You're going to do great!** 🎯 