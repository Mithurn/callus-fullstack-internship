# Full-Stack Testing Guide - 모두의 권리

## 🎯 Overview

This guide will help you test the complete full-stack functionality of your application, including frontend, backend, database, and all integrations.

## 🚀 Quick Start Testing

### 1. Start the Application

```bash
# From the project root
./start.sh
```

This will start:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000

### 2. Verify Services Are Running

```bash
# Check if backend is running
curl http://localhost:3001/health

# Check if frontend is running
curl http://localhost:3000
```

## 🔐 Authentication Testing

### Test Credentials

**Customer Account:**
- Email: `customer@test.com`
- Password: `password123`

**Provider Account:**
- Email: `provider@test.com`
- Password: `password123`

### Step-by-Step Authentication Test

1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Should Redirect to Login**: If not logged in, you should be redirected to `/login`
3. **Test Login Page**:
   - ✅ Verify login form is displayed
   - ✅ Test email validation (try invalid email)
   - ✅ Test password validation (try short password)
   - ✅ Test "고객으로 로그인" button
   - ✅ Test "사업자로 로그인" button
   - ✅ Verify redirect to home page after successful login

4. **Test Protected Routes**:
   - ✅ Try accessing `/quotations` without login (should redirect to login)
   - ✅ Try accessing `/consultations` without login (should redirect to login)
   - ✅ Try accessing `/profile` without login (should redirect to login)

## 📊 Database Testing

### Check Database Connection

```bash
# Navigate to backend directory
cd backend

# Check if database is connected
npm run start:dev
```

### Verify Seed Data

The application should have pre-seeded data:

**Users:**
- customer@test.com (Customer)
- provider@test.com (Provider)

**Quotations:**
- 웹사이트 개발 견적 (₩5,000,000)
- 모바일 앱 개발 견적 (₩8,000,000)

**Consultations:**
- 웹사이트 개발 상담
- 모바일 앱 개발 상담

## 🎨 Frontend Testing

### 1. Home Page (`/`)

**Test Steps:**
1. Login with customer@test.com
2. Verify welcome message: "테스트 고객님, 환영합니다!"
3. Check service grid:
   - ✅ All 9 service icons are displayed
   - ✅ Icons are SVG (not emojis)
   - ✅ Clicking icons navigates to service forms
4. Check quick access cards:
   - ✅ "받은 견적" card navigates to /quotations
   - ✅ "상담내역" card navigates to /consultations

### 2. Quotations Page (`/quotations`)

**Test Steps:**
1. Navigate to quotations page
2. Verify existing quotations are displayed:
   - ✅ 웹사이트 개발 견적 (₩5,000,000)
   - ✅ 모바일 앱 개발 견적 (₩8,000,000)
3. Test CRUD operations:
   - ✅ Create new quotation (click "새 견적 요청")
   - ✅ Fill form: Title, Description, Amount
   - ✅ Submit and verify it appears in the list
   - ✅ Delete quotation (click "삭제" button)
4. Verify responsive design on mobile

### 3. Consultations Page (`/consultations`)

**Test Steps:**
1. Navigate to consultations page
2. Verify existing consultations are displayed:
   - ✅ 웹사이트 개발 상담
   - ✅ 모바일 앱 개발 상담
3. Test CRUD operations:
   - ✅ Create new consultation (click "새 상담 요청")
   - ✅ Fill form: Title, Description, Scheduled Date
   - ✅ Submit and verify it appears in the list
   - ✅ Delete consultation (click "삭제" button)
4. Verify responsive design on mobile

### 4. Profile Page (`/profile`)

**Test Steps:**
1. Navigate to profile page
2. Verify user information is displayed:
   - ✅ Email: customer@test.com
   - ✅ Name: 테스트 고객
   - ✅ Role: 고객
3. Test edit functionality:
   - ✅ Click "프로필 수정" button
   - ✅ Edit name and phone number
   - ✅ Save changes
   - ✅ Verify changes are persisted
   - ✅ Cancel edit functionality

### 5. Service Request Forms

**Test Steps:**
1. From home page, click on any service icon
2. Verify service form is displayed
3. Test form functionality:
   - ✅ Form fields are displayed correctly
   - ✅ Required fields are marked with asterisk
   - ✅ Form validation works
   - ✅ Submit button works
   - ✅ Success message is displayed
   - ✅ Redirect to home page after submission

## 🔧 Backend API Testing

### Test API Endpoints

```bash
# Test authentication
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"password123"}'

# Test quotations endpoint (with auth token)
curl -X GET http://localhost:3001/quotations \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Test consultations endpoint (with auth token)
curl -X GET http://localhost:3001/consultations \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Test profile endpoint (with auth token)
curl -X GET http://localhost:3001/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Expected API Responses

**Login Response:**
```json
{
  "user": {
    "id": 1,
    "email": "customer@test.com",
    "name": "테스트 고객",
    "role": "customer"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Quotations Response:**
```json
[
  {
    "id": 1,
    "title": "웹사이트 개발 견적",
    "description": "회사 웹사이트 개발을 위한 견적 요청입니다.",
    "amount": 5000000,
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🎯 Integration Testing

### Test Full User Flow

1. **Complete Registration/Login Flow**:
   - ✅ Open application
   - ✅ Login with test credentials
   - ✅ Verify redirect to home page
   - ✅ Verify user data is displayed

2. **Complete Quotation Flow**:
   - ✅ Navigate to quotations page
   - ✅ Create new quotation
   - ✅ Verify quotation appears in list
   - ✅ Edit quotation (if implemented)
   - ✅ Delete quotation
   - ✅ Verify quotation is removed

3. **Complete Consultation Flow**:
   - ✅ Navigate to consultations page
   - ✅ Create new consultation
   - ✅ Verify consultation appears in list
   - ✅ Edit consultation (if implemented)
   - ✅ Delete consultation
   - ✅ Verify consultation is removed

4. **Complete Profile Flow**:
   - ✅ Navigate to profile page
   - ✅ View current profile information
   - ✅ Edit profile information
   - ✅ Save changes
   - ✅ Verify changes are persisted

## 🐛 Common Issues & Solutions

### Issue 1: Backend Not Starting
```bash
# Check if port 3001 is already in use
lsof -ti:3001
# Kill process if needed
kill -9 $(lsof -ti:3001)
```

### Issue 2: Frontend Not Starting
```bash
# Check if port 3000 is already in use
lsof -ti:3000
# Kill process if needed
kill -9 $(lsof -ti:3000)
```

### Issue 3: Database Connection Issues
```bash
# Check if database is running
# For SQLite (default)
ls -la backend/db.sqlite

# For PostgreSQL (if configured)
# Check environment variables in .env file
```

### Issue 4: CORS Issues
- Verify backend CORS configuration in `main.ts`
- Check `FRONTEND_URL` environment variable

## 📱 Mobile Testing

### Test Responsive Design

1. **Open Developer Tools** (F12)
2. **Toggle Device Toolbar** (Ctrl+Shift+M)
3. **Test Different Screen Sizes**:
   - ✅ Mobile (375px)
   - ✅ Tablet (768px)
   - ✅ Desktop (1024px+)

### Test Mobile Features

- ✅ Bottom navigation works on mobile
- ✅ Touch interactions work properly
- ✅ Forms are usable on mobile
- ✅ Text is readable on small screens

## 🔍 Performance Testing

### Check Loading Times

1. **Open Developer Tools** (F12)
2. **Go to Network Tab**
3. **Reload page** and check:
   - ✅ Initial page load < 3 seconds
   - ✅ API calls < 1 second
   - ✅ Images load quickly

### Check Memory Usage

1. **Open Developer Tools** (F12)
2. **Go to Performance Tab**
3. **Record performance** during user interactions
4. **Check for memory leaks**

## ✅ Final Verification Checklist

### Frontend
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit successfully
- [ ] Data is displayed correctly
- [ ] Responsive design works
- [ ] No console errors

### Backend
- [ ] API endpoints respond correctly
- [ ] Authentication works
- [ ] Database operations work
- [ ] Error handling works
- [ ] CORS is configured correctly

### Integration
- [ ] Frontend can communicate with backend
- [ ] Data flows correctly between frontend and backend
- [ ] User sessions work properly
- [ ] Real-time updates work (if implemented)

### Security
- [ ] Protected routes are secure
- [ ] JWT tokens work correctly
- [ ] User data is protected
- [ ] No sensitive data is exposed

## 🎉 Success Criteria

Your application is working correctly if:

1. ✅ **Authentication**: Users can login/logout successfully
2. ✅ **Navigation**: All pages are accessible and functional
3. ✅ **CRUD Operations**: Create, read, update, delete work for all entities
4. ✅ **Data Persistence**: Data is saved and retrieved correctly
5. ✅ **User Experience**: Interface is intuitive and responsive
6. ✅ **Error Handling**: Errors are handled gracefully
7. ✅ **Performance**: Application loads and responds quickly

## 🚀 Next Steps

Once testing is complete:

1. **Create Demo Video**: Follow `DEMO_VIDEO_SCRIPT.md`
2. **Deploy to Production**: Follow deployment instructions in `README.md`
3. **Document Issues**: Note any bugs or improvements needed
4. **Prepare Presentation**: Ready for assessment submission

---

**Testing completed by:** [Your Name]
**Date:** [Date]
**Version:** 1.0.0 