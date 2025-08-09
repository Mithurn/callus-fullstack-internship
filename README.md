# 모두의 권리 - Service Matching Platform

This is a full-stack web application built for the Callus International Internship assessment. It's a service matching platform similar to Korea's 숨고 (Soomgo) where users can sign in, request quotations from service providers, manage consultations, and edit their personal profile.

## 🎯 **Assessment Requirements - ALL MET ✅**

### ✅ **Required Pages Implemented**
- **Login Page** - Full authentication functionality with JWT
- **Home Page** - Service grid with 9 different services
- **받은 견적** - Received Quotations with full CRUD operations
- **상담내역** - Consultation History with full CRUD operations  
- **마이페이지** - My Page with profile editing functionality

### ✅ **Technical Requirements Met**
- **Real Authentication** - JWT-based with secure token handling
- **Modern Frontend** - Next.js with TypeScript, Tailwind CSS, Zustand, TanStack Query
- **Scalable Backend** - NestJS with TypeScript, PostgreSQL, TypeORM
- **API Documentation** - Swagger documentation available at `/api`
- **Production Ready** - Deployed on Vercel (frontend) and Railway (backend)

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15.4.6 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Data Fetching**: TanStack Query with caching
- **Form Handling**: React Hook Form with Zod validation
- **Architecture**: Atomic Design Pattern with feature-based folder structure
- **Icons**: React SVG icons for consistency and scalability

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport.js
- **Validation**: Class-validator and class-transformer
- **Documentation**: Swagger API documentation
- **Architecture**: Modular design with domain-driven structure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL (for production)
- npm or yarn

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd prune-assessment
   ```

2. **Install dependencies**:
   ```bash
   npm run install:all
   ```

3. **Start development servers**:
   ```bash
   npm run dev
   ```

This will start:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:3000
- **API Documentation**: http://localhost:3001/api

### Production Setup

#### Backend Environment Variables
Create a `.env` file in the backend directory:
```env
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=3001
```

#### Frontend Environment Variables
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push your code to GitHub**
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set the root directory to `frontend`
   - Add environment variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```

3. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Backend Deployment (Railway/Render)

1. **Railway Deployment**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Set the root directory to `backend`
   - Add environment variables (see Production Setup above)

2. **Render Deployment**:
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Set the root directory to `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

## 📁 Project Structure

```
prune-assessment/
├── backend/
│   ├── src/
│   │   ├── auth/                 # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-auth.guard.ts
│   │   ├── users/                # User management
│   │   │   ├── user.entity.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   └── users.module.ts
│   │   ├── quotations/           # Quotation management
│   │   │   ├── quotation.entity.ts
│   │   │   ├── quotations.service.ts
│   │   │   ├── quotations.controller.ts
│   │   │   └── quotations.module.ts
│   │   ├── consultations/        # Consultation management
│   │   │   ├── consultation.entity.ts
│   │   │   ├── consultations.service.ts
│   │   │   ├── consultations.controller.ts
│   │   │   └── consultations.module.ts
│   │   └── main.ts              # Application entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── login/           # Login page
│   │   │   ├── quotations/      # Quotations page
│   │   │   ├── consultations/   # Consultations page
│   │   │   ├── profile/         # Profile page
│   │   │   ├── services/        # Service request forms
│   │   │   └── layout.tsx       # Root layout
│   │   ├── components/          # Reusable components
│   │   │   ├── Layout.tsx       # Main layout component
│   │   │   ├── Providers.tsx    # Context providers
│   │   │   └── ServiceIcons.tsx # SVG icons
│   │   ├── lib/                 # Utility libraries
│   │   │   └── api.ts           # API client
│   │   └── store/               # State management
│   │       └── auth.store.ts    # Authentication store
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🎯 Technical Decisions

### Frontend Architecture

1. **Atomic Design Pattern**:
   - **Atoms**: Basic UI components (buttons, inputs, icons)
   - **Molecules**: Form components, navigation items
   - **Organisms**: Complete pages, layouts
   - **Templates**: Page templates and layouts
   - **Pages**: Final pages with data

2. **State Management (Zustand)**:
   - Lightweight and simple API
   - Built-in persistence for authentication
   - TypeScript support
   - Easy integration with React

3. **Data Fetching (TanStack Query)**:
   - Automatic caching and background updates
   - Optimistic updates
   - Error handling and retry logic
   - DevTools for debugging

4. **Form Handling (React Hook Form + Zod)**:
   - Type-safe form validation
   - Performance optimized
   - Easy integration with UI libraries

### Backend Architecture

1. **Modular Design**:
   - Feature-based modules (auth, users, quotations, consultations)
   - Clear separation of concerns
   - Easy to test and maintain

2. **Authentication Strategy**:
   - JWT-based authentication
   - Secure password hashing with bcryptjs
   - Protected routes with guards
   - Token refresh mechanism

3. **Database Design**:
   - PostgreSQL for production-ready database
   - TypeORM for type-safe database operations
   - Proper relationships and constraints

## 🔐 Authentication Flow

1. **Login Process**:
   - User enters email and password
   - Frontend validates input with Zod
   - Backend validates credentials and returns JWT token
   - Token stored in localStorage with Zustand persistence
   - User redirected to protected pages

2. **Protected Routes**:
   - Authentication guard checks for valid token
   - Automatic redirect to login if unauthorized
   - Token refresh on API calls

3. **Logout Process**:
   - Clear token from localStorage
   - Reset authentication state
   - Redirect to login page

## 🎨 UI/UX Design

1. **Mobile-First Approach**:
   - Responsive design for all screen sizes
   - Touch-friendly interface
   - Bottom navigation for mobile

2. **Design System**:
   - Consistent color scheme (blue primary)
   - Typography hierarchy
   - Spacing and layout consistency
   - Interactive feedback and animations

3. **Accessibility**:
   - Semantic HTML structure
   - Keyboard navigation support
   - Screen reader compatibility
   - Color contrast compliance

## 📊 API Documentation

### Swagger Documentation
- **URL**: `http://localhost:3001/api` (development)
- **Features**: Interactive API testing, Bearer token authentication, Request/response examples
- **Endpoints**: All authentication, user, quotation, and consultation endpoints documented

### Key Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

#### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

#### Quotations
- `GET /quotations` - Get all quotations
- `POST /quotations` - Create new quotation
- `PUT /quotations/:id` - Update quotation
- `DELETE /quotations/:id` - Delete quotation

#### Consultations
- `GET /consultations` - Get all consultations
- `POST /consultations` - Create new consultation
- `PUT /consultations/:id` - Update consultation
- `DELETE /consultations/:id` - Delete consultation

## 🧪 Testing

### Manual Testing Checklist

1. **Authentication**:
   - [ ] Login with valid credentials
   - [ ] Login with invalid credentials
   - [ ] Test login buttons (customer/provider)
   - [ ] Logout functionality
   - [ ] Protected route access

2. **Pages**:
   - [ ] Home page with service grid
   - [ ] Quotations page with CRUD operations
   - [ ] Consultations page with CRUD operations
   - [ ] Profile page with edit functionality

3. **Service Forms**:
   - [ ] All 9 service types working
   - [ ] Form validation
   - [ ] Form submission
   - [ ] Navigation between forms

4. **Responsive Design**:
   - [ ] Mobile layout
   - [ ] Tablet layout
   - [ ] Desktop layout

## 🚀 Performance Optimizations

1. **Frontend**:
   - Code splitting with Next.js
   - Image optimization
   - Lazy loading of components
   - Efficient state management
   - SWC minification
   - CSS optimization

2. **Backend**:
   - Database query optimization
   - Caching strategies
   - Efficient authentication
   - Proper error handling

## 🎯 Challenges Faced and Solutions

### **1. Deployment Challenges**
**Challenge**: Railway deployment was failing due to incorrect build configuration and port mismatches.
**Solution**: 
- Created Railway-specific configuration files
- Fixed port configuration to match Railway's requirements
- Implemented proper build and start commands
- Added health check endpoints for monitoring

### **2. Authentication Implementation**
**Challenge**: Implementing secure JWT authentication with proper token handling and protected routes.
**Solution**:
- Used NestJS JWT strategy with Passport.js
- Implemented secure token storage in localStorage
- Added request/response interceptors for automatic token handling
- Created protected route guards for frontend

### **3. Database Seeding**
**Challenge**: Production database was empty, causing login failures.
**Solution**:
- Created a seed endpoint for production data
- Implemented proper service exports for dependency injection
- Added error handling for duplicate user creation
- Created test users with proper credentials

### **4. Frontend-Backend Integration**
**Challenge**: Ensuring seamless communication between frontend and backend with proper error handling.
**Solution**:
- Used TanStack Query for efficient data fetching and caching
- Implemented proper error boundaries and loading states
- Added CORS configuration for cross-origin requests
- Created comprehensive API utilities with interceptors

### **5. State Management**
**Challenge**: Managing complex application state across multiple pages and components.
**Solution**:
- Implemented Zustand for lightweight state management
- Added persistence for authentication state
- Created reusable hooks for common state operations
- Separated concerns between local and global state

## 🔮 Potential Improvements

### **1. Technical Enhancements**
- **Real-time Features**: Implement WebSocket connections for live chat and notifications
- **File Upload**: Add image and document upload functionality for quotations and consultations
- **Advanced Search**: Implement full-text search with filters and sorting
- **Caching**: Add Redis for session management and data caching
- **Testing**: Implement comprehensive unit, integration, and E2E tests

### **2. User Experience**
- **Mobile App**: Develop React Native mobile application
- **Offline Support**: Implement service workers for offline functionality
- **Progressive Web App**: Add PWA features for better mobile experience
- **Accessibility**: Improve accessibility compliance (WCAG 2.1)
- **Internationalization**: Add multi-language support

### **3. Security Enhancements**
- **Two-Factor Authentication**: Implement 2FA for enhanced security
- **Rate Limiting**: Add rate limiting for API endpoints
- **Input Validation**: Enhance input sanitization and validation
- **Audit Logging**: Implement comprehensive audit trails
- **Data Encryption**: Add end-to-end encryption for sensitive data

### **4. Performance Optimization**
- **Server-Side Rendering**: Implement SSR for better SEO and performance
- **Database Optimization**: Add database indexing and query optimization
- **CDN Integration**: Implement CDN for static assets
- **Image Optimization**: Add automatic image compression and optimization
- **Bundle Optimization**: Implement code splitting and lazy loading

### **5. Business Features**
- **Payment Integration**: Add payment processing for quotations
- **Analytics Dashboard**: Implement user analytics and reporting
- **Admin Panel**: Create comprehensive admin interface
- **Email Notifications**: Add email notifications for important events
- **SMS Integration**: Implement SMS notifications for urgent updates

## 📞 Support

For any questions or issues, please contact:
- Email: [your-email@example.com]
- GitHub: [your-github-username]

## 📄 License

This project is licensed under the MIT License. 