# 모두의 권리 - Service Matching Platform

A full-stack web application built with Next.js and NestJS, providing a service matching platform similar to Korea's 숨고 (Soomgo) where users can sign in, request quotations from service providers, manage consultations, and edit their personal profile.

## 🎯 Features

### ✅ Core Functionality
- **Authentication System** - JWT-based login and registration
- **Service Grid** - 9 different service categories with forms
- **Quotation Management** - Full CRUD operations for quotations
- **Consultation History** - Complete consultation management system
- **User Profiles** - Profile editing and management
- **Mobile-First Design** - Responsive design with bottom navigation

### ✅ Technical Excellence
- **Real Authentication** - JWT-based with secure token handling
- **Modern Frontend** - Next.js with TypeScript, Tailwind CSS, Zustand, TanStack Query
- **Scalable Backend** - NestJS with TypeScript, PostgreSQL, TypeORM
- **API Documentation** - Swagger documentation available at `/api`
- **Production Ready** - Deployed on Vercel (frontend) and Railway (backend)

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15.4.6 with TypeScript
- **Styling**: Tailwind CSS for responsive design
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

### Environment Variables

#### Backend (`.env`)
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

#### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 📊 API Documentation

### Swagger Documentation
- **URL**: `http://localhost:3001/api` (development)
- **Features**: Interactive API testing, Bearer token authentication, Request/response examples

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

## 🎨 UI/UX Design

### Design System
- **Mobile-First**: Responsive design for all screen sizes
- **Touch-Friendly**: Bottom navigation for mobile
- **Consistent**: Color scheme, typography, spacing
- **Accessible**: Semantic HTML, keyboard navigation
- **Interactive**: Hover states, animations, feedback

### User Experience
- **Intuitive Navigation**: Clear bottom navigation
- **Fast Loading**: Optimized performance
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback
- **Success Feedback**: Clear success messages

## 🔐 Authentication & Security

### Security Features
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation with class-validator
- **Error Handling**: Secure error responses

## 🧪 Testing

### Manual Testing
1. **Authentication**: Login, logout, protected routes
2. **Pages**: Home, quotations, consultations, profile
3. **Service Forms**: All 9 service types
4. **Responsive Design**: Mobile, tablet, desktop

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect to Vercel
3. Set root directory to `frontend`
4. Add environment variables

### Backend (Railway)
1. Connect GitHub repository
2. Set root directory to `backend`
3. Configure environment variables
4. Deploy

## 📁 Project Structure

```
prune-assessment/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utilities and API
│   │   └── store/          # State management
│   └── public/             # Static assets
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── users/          # User management
│   │   ├── quotations/     # Quotation CRUD
│   │   └── consultations/  # Consultation CRUD
│   └── test/               # Tests
└── README.md               # This file
```

## 🔮 Future Enhancements

- **Real-time Features**: WebSocket connections for live chat
- **File Upload**: Image and document upload functionality
- **Advanced Search**: Full-text search with filters
- **Mobile App**: React Native mobile application
- **Payment Integration**: Payment processing for quotations

## 📞 Support

For questions or issues, please contact:
- Email: mithurnjeromme172@gmail.com
- GitHub: https://github.com/Mithurn

## 📄 License

This project is licensed under the MIT License. 
