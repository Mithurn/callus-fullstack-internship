# 🚀 Deployment Checklist - 모두의 권리

## ✅ **DEPLOYMENT STATUS**

### **Frontend (Vercel)**
- [ ] **Step 1**: Go to [vercel.com](https://vercel.com)
- [ ] **Step 2**: Sign in with GitHub
- [ ] **Step 3**: Click "New Project"
- [ ] **Step 4**: Import repository: `callus-fullstack-internship`
- [ ] **Step 5**: Configure:
  - Framework Preset: Next.js
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `.next`
- [ ] **Step 6**: Click "Deploy"
- [ ] **Step 7**: Save frontend URL: `https://your-app.vercel.app`

### **Backend (Railway)**
- [ ] **Step 1**: Go to [railway.app](https://railway.app)
- [ ] **Step 2**: Sign in with GitHub
- [ ] **Step 3**: Click "New Project"
- [ ] **Step 4**: Select "Deploy from GitHub repo"
- [ ] **Step 5**: Choose repository: `callus-fullstack-internship`
- [ ] **Step 6**: Configure:
  - Root Directory: `backend`
  - Build Command: `npm install && npm run build`
  - Start Command: `npm run start:prod`
- [ ] **Step 7**: Add PostgreSQL database
- [ ] **Step 8**: Add environment variables
- [ ] **Step 9**: Save backend URL: `https://your-app.railway.app`

### **Environment Variables (Railway)**
- [ ] **DB_HOST**: `your-postgres-host`
- [ ] **DB_PORT**: `5432`
- [ ] **DB_USERNAME**: `your-username`
- [ ] **DB_PASSWORD**: `your-password`
- [ ] **DB_NAME**: `your-database-name`
- [ ] **JWT_SECRET**: `your-super-secret-jwt-key-here-123456789`
- [ ] **FRONTEND_URL**: `https://your-frontend-url.vercel.app`
- [ ] **PORT**: `3001`

### **Frontend Environment Variables (Vercel)**
- [ ] **NEXT_PUBLIC_API_URL**: `https://your-backend-url.railway.app`

## 🧪 **TESTING CHECKLIST**

### **Frontend Testing**
- [ ] **Login Page**: Test with `customer@test.com` / `password123`
- [ ] **Home Page**: Verify service grid loads
- [ ] **Quotations Page**: Test CRUD operations
- [ ] **Consultations Page**: Test CRUD operations
- [ ] **Profile Page**: Test profile editing
- [ ] **Responsive Design**: Test on mobile/tablet

### **Backend Testing**
- [ ] **API Documentation**: Visit `https://your-backend-url.railway.app/api`
- [ ] **Authentication**: Test login endpoint
- [ ] **Quotations API**: Test CRUD operations
- [ ] **Consultations API**: Test CRUD operations
- [ ] **Profile API**: Test profile operations

### **Integration Testing**
- [ ] **Full User Flow**: Login → Home → Quotations → Consultations → Profile
- [ ] **Form Submissions**: Test all service forms
- [ ] **Error Handling**: Test invalid inputs
- [ ] **Navigation**: Test all page transitions

## 🎯 **FINAL STEPS**

### **Documentation**
- [ ] **Update README.md** with deployment URLs
- [ ] **Test all functionality** one more time
- [ ] **Record demo video** following `DEMO_VIDEO_SCRIPT.md`
- [ ] **Prepare submission** with all URLs

### **Submission Ready**
- [ ] **GitHub Repository**: All code pushed
- [ ] **Frontend URL**: Working and tested
- [ ] **Backend URL**: Working and tested
- [ ] **API Documentation**: Accessible
- [ ] **Demo Video**: Recorded and ready
- [ ] **README**: Updated with deployment info

## 🎉 **DEPLOYMENT COMPLETE!**

**Your URLs:**
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **API Docs**: `https://your-app.railway.app/api`

**You're ready for assessment submission!** 🚀 