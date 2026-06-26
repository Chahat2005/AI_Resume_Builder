# Project File Structure - Complete Inventory

## Backend Structure

### `/backend` - Server Application

#### Configuration Files
- `server.js` - Express app entry point with middleware and route setup
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variables template

#### `/config` Directory
- `db.js` - MongoDB connection configuration
- `constants.js` - App-wide constants (PORT, JWT_SECRET, OPENAI_API_KEY)

#### `/models` Directory
- `User.js` - Mongoose schema for user accounts
- `Resume.js` - Mongoose schema for resume documents with nested sections
- `constants.js` - Resume templates and status constants

#### `/controllers` Directory
- `authController.js` - Authentication handlers (register, login, profile, password)
- `resumeController.js` - Resume CRUD operations and search/sort
- `aiController.js` - OpenAI integration for content generation

#### `/routes` Directory
- `authRoutes.js` - Auth endpoints with protection middleware
- `resumeRoutes.js` - Resume endpoints (protected)
- `aiRoutes.js` - AI generation endpoints (protected)

#### `/middleware` Directory
- `authMiddleware.js` - JWT verification and user attachment
- `errorMiddleware.js` - 404 handler and global error handler
- `sanitize.js` - Input sanitization using validator
- `rateLimiter.js` - Express rate limit configuration

#### `/utils` Directory
- `validation.js` - Email, password, URL validation functions
- `helpers.js` - ID generation, date formatting, text utilities

---

## Frontend Structure

### `/client` - React Application

#### Root Configuration Files
- `index.html` - HTML template entry point
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS with Tailwind
- `package.json` - Dependencies and scripts
- `.env.example` - Environment variables template

#### `/src` Directory

##### Core Files
- `main.jsx` - React DOM entry point with Router
- `App.jsx` - Main app component with route definitions
- `index.css` - Global Tailwind and base styles

##### `/src/components` - Reusable Components

###### Layout
- `layout/Navbar.jsx` - Navigation bar with auth links

###### UI Components
- `ui/Button.jsx` - Reusable button with variants
- `ui/Input.jsx` - Reusable input field with label
- `ui/Textarea.jsx` - Reusable textarea field
- `ui/Select.jsx` - Dropdown select component
- `ui/Card.jsx` - Card container component
- `ui/Badge.jsx` - Badge component for tags
- `ui/Spinner.jsx` - Loading spinner animation
- `ui/Toast.jsx` - Notification toast component

##### `/src/pages` - Page Components
- `LandingPage.jsx` - Landing page with features showcase
- `LoginPage.jsx` - User login form
- `RegisterPage.jsx` - User registration form
- `DashboardPage.jsx` - Main dashboard with resume list and stats
- `ResumeBuilderPage.jsx` - Resume creation/editing form
- `ResumePreviewPage.jsx` - Resume preview with all sections
- `TemplatesPage.jsx` - Browse available resume templates
- `ProfilePage.jsx` - User profile and account settings
- `NotFoundPage.jsx` - 404 error page

##### `/src/context` - State Management
- `AuthContext.jsx` - Authentication context with user, token, toast

##### `/src/services` - API Layer
- `api.js` - Axios instance with base URL and auth header setup
- `authService.js` - Auth API calls (login, register, profile)
- `resumeService.js` - Resume API calls (CRUD, search, sort)
- `aiService.js` - AI content generation API call

##### `/src/hooks` - Custom React Hooks
- `useValidation.js` - Email, password, name validation hooks
- `useLocalStorage.js` - Local storage persistence hook
- `useFetch.js` - Async data fetching hook

##### `/src/utils` - Utility Functions
- `helpers.js` - Date formatting, error handling, text truncation
- `common.js` - User auth check, error extraction, URL validation

##### `/src/assets` - Static Files
- (Empty folder for images, icons, fonts)

---

## Project Root Files

- `README.md` - Comprehensive project documentation
- `SETUP_GUIDE.md` - Quick start setup instructions
- `.gitignore` - Git ignore patterns

---

## Complete File Count & Summary

### Backend
- Config: 2 files
- Models: 3 files
- Controllers: 3 files
- Routes: 3 files
- Middleware: 4 files
- Utils: 2 files
- Root: 3 files (server.js, package.json, .env.example)
**Total Backend Files: 20**

### Frontend
- Config: 5 files (vite, tailwind, postcss, package.json, .env.example)
- Components: 9 files (1 layout + 8 UI)
- Pages: 8 files
- Context: 1 file
- Services: 3 files
- Hooks: 3 files
- Utils: 2 files
- Root: 3 files (index.html, main.jsx, App.jsx, index.css)
**Total Frontend Files: 37**

### Project Root
- Documentation: 2 files (README.md, SETUP_GUIDE.md)
- Git: 1 file (.gitignore)
**Total Root Files: 3**

---

## Dependencies Summary

### Backend Dependencies (11)
- express.js - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT auth
- bcryptjs - Password hashing
- cors - CORS middleware
- helmet - Security headers
- express-rate-limit - Rate limiting
- dotenv - Environment variables
- openai - OpenAI API client
- validator - Input validation

### Frontend Dependencies (6)
- react - UI library
- react-dom - React DOM renderer
- react-router-dom - Routing
- axios - HTTP client
- react-icons - Icon library
- tailwindcss - Styling framework

---

## Key Features Implementation

✅ **Authentication**
- Register/Login with JWT
- Secure password hashing
- Protected routes
- Session persistence

✅ **Resume Management**
- Full CRUD operations
- Search by title
- Sort by date/update
- Duplicate functionality
- Template selection

✅ **AI Integration**
- Career summary generation
- Skills suggestion
- Project description
- Experience description

✅ **User Interface**
- Responsive design
- Form validation
- Error notifications
- Loading states
- Professional styling

✅ **Security**
- Input sanitization
- Rate limiting
- CORS protection
- Helmet headers
- JWT expiration

✅ **Data Persistence**
- MongoDB for data storage
- Local storage for session
- Nested schema for sections

---

## Architecture Patterns

### Backend Architecture
- **Pattern**: MVC (Model-View-Controller)
- Models: Mongoose schemas
- Views: JSON responses
- Controllers: Request handlers
- Middleware: Cross-cutting concerns

### Frontend Architecture
- **Pattern**: Component-Based
- Pages: Route-level components
- Components: Reusable UI pieces
- Context: Global state management
- Services: API abstraction layer
- Hooks: Stateful logic

### Database Architecture
- **User Schema**: Authentication and profile
- **Resume Schema**: Main document with nested sub-documents
- **Nested Schemas**: Education, Experience, Projects as arrays

---

## Code Quality Measures

✅ Comments on complex functions
✅ Consistent naming conventions
✅ Error handling in all endpoints
✅ Input validation frontend & backend
✅ Reusable components
✅ Helper utility functions
✅ Environment variable usage
✅ Async/await promises
✅ Clean separation of concerns
✅ DRY principle followed

---

## This is a production-ready MERN application suitable for deployment.
