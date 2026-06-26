# Quick Start Guide - AI Resume Builder

## Prerequisites Check
- [ ] Node.js v16+ installed
- [ ] MongoDB installed locally or MongoDB Atlas account
- [ ] OpenAI API key obtained

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
cp .env.example .env

# Edit .env file with:
# - MONGODB_URI (local or Atlas)
# - JWT_SECRET (any random string)
# - OPENAI_API_KEY (from OpenAI platform)
# - CLIENT_URL (http://localhost:5173)

# Start the server
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected: localhost
```

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# .env should contain:
# VITE_API_URL=http://localhost:5000/api

# Start the dev server
npm run dev
```

Expected output:
```
VITE v5.4.1 ready in ... ms

➜  Local:   http://localhost:5173/
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/ai_resume_builder`

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ai_resume_builder`

### 4. OpenAI API Setup

- Sign up at https://platform.openai.com
- Create API key in Account Settings
- Add to backend .env: `OPENAI_API_KEY=sk-xxx`

## Testing the Application

1. Open http://localhost:5173 in your browser
2. Click "Register" and create an account
3. Fill in your email and password
4. Click "Dashboard" after login
5. Create a new resume
6. Fill in personal information
7. Try "AI Generate" for summary or skills
8. Save the resume
9. Preview and download as PDF

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -i :5000
kill -9 <PID>

# Frontend uses next available port automatically
```

### MongoDB Connection Failed
- Check if MongoDB service is running: `mongosh`
- Verify connection string in .env
- Check firewall if using Atlas

### CORS Error
- Verify CLIENT_URL in backend .env matches frontend URL
- Check browser console for exact error

### AI Generation Not Working
- Verify OPENAI_API_KEY is valid
- Check API key has sufficient credits
- Ensure backend is running

### Build Errors
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Project Structure Verified

```
AI_builder/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Features Available

✅ User Authentication (Register, Login, Logout)
✅ Resume CRUD Operations
✅ AI-Powered Content Generation
✅ 5 Professional Templates
✅ Search & Sort Resumes
✅ User Profile Management
✅ Password Change
✅ Account Deletion
✅ Responsive Design
✅ JWT Security
✅ Rate Limiting
✅ Input Validation
✅ Error Handling

## API Documentation

### Auth Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- PUT /api/auth/profile
- PUT /api/auth/password
- DELETE /api/auth/profile

### Resume Endpoints
- GET /api/resumes
- GET /api/resumes/recent
- GET /api/resumes/stats
- GET /api/resumes/:id
- POST /api/resumes
- PUT /api/resumes/:id
- DELETE /api/resumes/:id
- POST /api/resumes/:id/duplicate

### AI Endpoints
- POST /api/ai/generate

## Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables
# Push to git and deploy
```

## Support

Check error messages in:
- Browser console (Frontend errors)
- Terminal output (Backend errors)
- Network tab (API responses)

Ensure all environment variables are correctly set before reporting issues.
