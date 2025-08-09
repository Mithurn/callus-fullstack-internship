# Environment Setup Guide - 모두의 권리

## 🎯 Current Setup Overview

Your application is currently configured to work **out of the box** with minimal setup! Here's what you need to know:

## 🗄️ Database Configuration

### Current Setup (Development)
Your application is currently using **SQLite** for development, which means:

```typescript
// backend/src/app.module.ts
TypeOrmModule.forRoot({
  type: 'sqlite',           // ← Using SQLite (file-based database)
  database: 'db.sqlite',    // ← Database file in backend folder
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,        // ← Auto-creates tables
})
```

**✅ What this means:**
- **No database setup required** - SQLite is a file-based database
- **Database file**: `backend/db.sqlite` (already exists)
- **Auto-sync**: Tables are created automatically
- **No environment variables needed** for development

### Production Setup (PostgreSQL)
For production deployment, you'll need PostgreSQL:

```typescript
// Production configuration (when you deploy)
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // ← Disabled in production
})
```

## 🔐 Environment Variables

### Current Environment Variables Used

Your application uses these environment variables (all optional for development):

```bash
# JWT Secret (for authentication)
JWT_SECRET=your-secret-key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Server Port
PORT=3001

# Database (only needed for PostgreSQL in production)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=prune_assessment
```

### Development vs Production

#### 🏠 Development (Current)
- ✅ **No .env file needed** - everything works with defaults
- ✅ **SQLite database** - file-based, no setup required
- ✅ **Default JWT secret** - automatically generated
- ✅ **Localhost URLs** - automatically configured

#### 🚀 Production (When you deploy)
- ⚠️ **Environment variables required** - for security and configuration
- ⚠️ **PostgreSQL database** - needs to be set up
- ⚠️ **Secure JWT secret** - must be configured
- ⚠️ **Production URLs** - must be configured

## 🎯 What You Need to Know

### ✅ **For Development (Right Now)**
**Nothing!** Your application works out of the box:

1. **Database**: SQLite file (`backend/db.sqlite`) - already exists
2. **Environment**: All defaults work fine
3. **Authentication**: JWT secret auto-generated
4. **CORS**: Configured for localhost

### ⚠️ **For Production (When you deploy)**

You'll need to set up environment variables on your hosting platform:

#### Vercel (Frontend)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

#### Railway/Render (Backend)
```bash
# Database
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Frontend
FRONTEND_URL=https://your-frontend-url.vercel.app

# Server
PORT=3001
```

## 🗄️ Database Types Explained

### SQLite (Current - Development)
```bash
# ✅ Pros
- No setup required
- File-based (backend/db.sqlite)
- Works immediately
- Good for development

# ❌ Cons
- Not suitable for production
- Limited concurrent users
- No advanced features
```

### PostgreSQL (Production)
```bash
# ✅ Pros
- Production-ready
- Handles concurrent users
- Advanced features
- Scalable

# ❌ Cons
- Requires setup
- Needs hosting
- Environment variables required
```

## 🔧 How to Switch to PostgreSQL (Optional)

If you want to use PostgreSQL locally:

### 1. Install PostgreSQL
```bash
# macOS (using Homebrew)
brew install postgresql
brew services start postgresql

# Or use Docker
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE prune_assessment;
```

### 3. Create .env File
```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=prune_assessment
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
PORT=3001
```

### 4. Update Configuration
```typescript
// backend/src/app.module.ts
TypeOrmModule.forRoot({
  type: process.env.DB_HOST ? 'postgres' : 'sqlite',
  ...(process.env.DB_HOST ? {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  } : {
    database: 'db.sqlite',
  }),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
})
```

## 🎯 Current Status Summary

### ✅ **What's Working Now**
- **Database**: SQLite (file-based, no setup needed)
- **Authentication**: JWT with auto-generated secret
- **CORS**: Configured for localhost
- **Environment**: All defaults work
- **Application**: Fully functional

### 🚀 **What You Need for Production**
- **Environment variables**: Set on hosting platform
- **PostgreSQL database**: Set up on hosting platform
- **Secure JWT secret**: Generate and configure
- **Production URLs**: Configure CORS and API URLs

## 🎉 **Bottom Line**

**For development and testing: You don't need to do anything!** Your application works perfectly with the current SQLite setup.

**For production deployment:** You'll need to configure environment variables on your hosting platform (Vercel, Railway, Render, etc.) - but that's handled during the deployment process.

**Your application is production-ready and doesn't require any complex setup for development!** 🎯 