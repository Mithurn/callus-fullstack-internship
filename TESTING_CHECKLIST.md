# Testing Checklist - 모두의 권리

## 🔐 Authentication Testing

### Login Functionality
- [ ] **Valid Login**
  - [ ] Login with customer@test.com / password123
  - [ ] Login with provider@test.com / password123
  - [ ] Verify redirect to home page after login
  - [ ] Verify user data is stored in localStorage

- [ ] **Invalid Login**
  - [ ] Login with invalid email format
  - [ ] Login with wrong password
  - [ ] Login with non-existent user
  - [ ] Verify error messages are displayed

- [ ] **Test Login Buttons**
  - [ ] "고객으로 로그인" button works
  - [ ] "사업자로 로그인" button works
  - [ ] Verify correct user role is assigned

- [ ] **Logout Functionality**
  - [ ] Logout button works
  - [ ] Verify token is cleared from localStorage
  - [ ] Verify redirect to login page

### Protected Routes
- [ ] **Unauthorized Access**
  - [ ] Try to access /quotations without login
  - [ ] Try to access /consultations without login
  - [ ] Try to access /profile without login
  - [ ] Verify redirect to login page

- [ ] **Authorized Access**
  - [ ] Access all protected pages after login
  - [ ] Verify user data is displayed correctly

## 📄 Page Testing

### Home Page (/)
- [ ] **Service Grid**
  - [ ] All 9 service icons are displayed
  - [ ] Service icons are SVG (not emojis)
  - [ ] Clicking service icons navigates to service forms
  - [ ] Service grid is responsive on mobile

- [ ] **Quick Access Cards**
  - [ ] "받은 견적" card navigates to /quotations
  - [ ] "상담내역" card navigates to /consultations
  - [ ] Cards are responsive and clickable

- [ ] **User Welcome**
  - [ ] User name is displayed correctly
  - [ ] Welcome message is shown

### Quotations Page (/quotations)
- [ ] **List View**
  - [ ] Quotations are displayed in a table/list
  - [ ] Each quotation shows title, description, amount, status
  - [ ] Status indicators are color-coded correctly

- [ ] **CRUD Operations**
  - [ ] Create new quotation (modal form)
  - [ ] Form validation works (title, description, amount required)
  - [ ] Delete quotation functionality
  - [ ] Verify data updates in real-time

- [ ] **Responsive Design**
  - [ ] Page works on mobile devices
  - [ ] Table/list is responsive

### Consultations Page (/consultations)
- [ ] **List View**
  - [ ] Consultations are displayed in cards
  - [ ] Each consultation shows title, description, status, scheduled date
  - [ ] User avatars are displayed
  - [ ] Message count indicators are shown

- [ ] **CRUD Operations**
  - [ ] Create new consultation (modal form)
  - [ ] Form validation works
  - [ ] Delete consultation functionality
  - [ ] Schedule consultation with date/time

- [ ] **Responsive Design**
  - [ ] Page works on mobile devices
  - [ ] Cards are responsive

### Profile Page (/profile)
- [ ] **Profile Display**
  - [ ] User information is displayed correctly
  - [ ] Email, name, phone, role are shown

- [ ] **Edit Functionality**
  - [ ] Edit button works
  - [ ] Form validation works
  - [ ] Save changes functionality
  - [ ] Cancel edit functionality

## 🎨 Service Forms Testing

### Service Request Forms (/services/[type])
- [ ] **All Service Types**
  - [ ] 철거 요청 (Demolition Request)
  - [ ] 폐기물 처리 요청 (Waste Treatment Request)
  - [ ] 도배·장판 요청 (Wallpaper/Flooring Request)
  - [ ] 이사·입주청소 요청 (Moving/Cleaning Request)
  - [ ] 해충방역 요청 (Pest Control Request)
  - [ ] 에어컨 설치·청소 요청 (AC Installation/Cleaning Request)
  - [ ] 수납정리 요청 (Storage Organization Request)
  - [ ] 하수구막힘 요청 (Drain Clog Request)
  - [ ] 유모차세탁 요청 (Stroller Cleaning Request)

- [ ] **Form Functionality**
  - [ ] Form fields are displayed correctly
  - [ ] Required fields are marked with asterisk
  - [ ] Form validation works
  - [ ] Submit button works
  - [ ] Success message is displayed
  - [ ] Redirect to home page after submission

- [ ] **Navigation**
  - [ ] Back button works
  - [ ] Navigation between forms works

## 🎨 UI/UX Testing

### Design Consistency
- [ ] **Color Scheme**
  - [ ] Blue primary color is used consistently
  - [ ] Gray secondary colors are used correctly
  - [ ] Error states use red color
  - [ ] Success states use green color

- [ ] **Typography**
  - [ ] Font sizes are consistent
  - [ ] Font weights are appropriate
  - [ ] Text alignment is correct

- [ ] **Spacing**
  - [ ] Consistent padding and margins
  - [ ] Proper spacing between elements
  - [ ] Layout is balanced

### Responsive Design
- [ ] **Mobile (320px - 768px)**
  - [ ] All pages work on mobile
  - [ ] Navigation is touch-friendly
  - [ ] Forms are usable on mobile
  - [ ] Text is readable

- [ ] **Tablet (768px - 1024px)**
  - [ ] Layout adapts to tablet screen
  - [ ] Navigation works correctly
  - [ ] Forms are properly sized

- [ ] **Desktop (1024px+)**
  - [ ] Layout uses full screen width
  - [ ] Navigation is accessible
  - [ ] Forms are well-proportioned

### Interactive Elements
- [ ] **Buttons**
  - [ ] All buttons are clickable
  - [ ] Hover states work
  - [ ] Focus states are visible
  - [ ] Loading states are shown

- [ ] **Forms**
  - [ ] Input fields are accessible
  - [ ] Validation messages are clear
  - [ ] Error states are visible
  - [ ] Success states are shown

- [ ] **Navigation**
  - [ ] Bottom navigation works on mobile
  - [ ] Active states are highlighted
  - [ ] Navigation is intuitive

## 🔧 Technical Testing

### Performance
- [ ] **Loading Times**
  - [ ] Pages load within 3 seconds
  - [ ] Images load quickly
  - [ ] No unnecessary re-renders

- [ ] **State Management**
  - [ ] Authentication state persists
  - [ ] Form state is managed correctly
  - [ ] Data is cached appropriately

### Error Handling
- [ ] **Network Errors**
  - [ ] API errors are handled gracefully
  - [ ] User-friendly error messages
  - [ ] Retry mechanisms work

- [ ] **Validation Errors**
  - [ ] Form validation errors are clear
  - [ ] Required field errors are shown
  - [ ] Invalid input errors are displayed

### Security
- [ ] **Authentication**
  - [ ] JWT tokens are stored securely
  - [ ] Protected routes are secure
  - [ ] Logout clears all data

- [ ] **Data Protection**
  - [ ] Sensitive data is not exposed
  - [ ] API calls are authenticated
  - [ ] CORS is configured correctly

## 📱 Cross-Browser Testing

### Browser Compatibility
- [ ] **Chrome**
  - [ ] All features work correctly
  - [ ] No console errors
  - [ ] Responsive design works

- [ ] **Firefox**
  - [ ] All features work correctly
  - [ ] No console errors
  - [ ] Responsive design works

- [ ] **Safari**
  - [ ] All features work correctly
  - [ ] No console errors
  - [ ] Responsive design works

- [ ] **Edge**
  - [ ] All features work correctly
  - [ ] No console errors
  - [ ] Responsive design works

## 🎯 Final Verification

### Complete User Flow
- [ ] **End-to-End Testing**
  - [ ] User can register/login
  - [ ] User can navigate all pages
  - [ ] User can create quotations
  - [ ] User can create consultations
  - [ ] User can update profile
  - [ ] User can use service forms
  - [ ] User can logout

### Documentation
- [ ] **README.md**
  - [ ] Setup instructions are clear
  - [ ] Technical decisions are explained
  - [ ] Deployment instructions are included

- [ ] **Code Quality**
  - [ ] Code is well-commented
  - [ ] TypeScript types are defined
  - [ ] Components are reusable
  - [ ] Architecture is scalable

## 🚀 Deployment Testing

### Frontend (Vercel)
- [ ] **Build Process**
  - [ ] Application builds successfully
  - [ ] No build errors
  - [ ] Environment variables are set

- [ ] **Deployment**
  - [ ] Application deploys to Vercel
  - [ ] Domain is accessible
  - [ ] All features work in production

### Backend (Railway/Render)
- [ ] **Build Process**
  - [ ] Application builds successfully
  - [ ] No build errors
  - [ ] Environment variables are set

- [ ] **Deployment**
  - [ ] Application deploys successfully
  - [ ] API endpoints are accessible
  - [ ] Database connection works
  - [ ] Authentication works

## ✅ Final Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] All features work as expected
- [ ] Documentation is complete
- [ ] Code is production-ready
- [ ] Deployment is successful
- [ ] Application is accessible online

---

**Testing completed by:** [Your Name]
**Date:** [Date]
**Version:** 1.0.0 