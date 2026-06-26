# AI Resume Builder - MERN Stack Application

A modern, production-ready AI-powered resume builder web application built with React, Node.js, Express, MongoDB, and OpenAI integration.

## Features

### Core Functionality
- **User Authentication**: Secure JWT-based auth with bcrypt password hashing
- **Resume Management**: Create, read, update, delete, and duplicate resumes
- **Resume Templates**: 5 professional resume templates (Modern, Professional, Creative, Minimal, Corporate)
- **AI-Powered Content**: Generate career summaries, skills, and descriptions using OpenAI
- **PDF Export**: Download resumes as print-ready PDFs
- **Search & Sort**: Search resumes by title, sort by creation date or last update
- **Responsive Design**: Mobile-first Tailwind CSS for all devices
- **User Profile**: Update personal information, change password, delete account

### Security Features
- JWT authentication with 30-day expiration
- bcrypt password hashing
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Input sanitization and validation
- Helmet security headers
- Environment variable protection

## Tech Stack

### Frontend
- React 18.3
- Vite 5.4
- React Router 6.17
- Tailwind CSS 3.4
- Axios 1.6
- React Icons 5.14

### Backend
- Node.js
- Express.js 4.18
- MongoDB with Mongoose
- OpenAI API
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security
- CORS middleware
- Express Rate Limit

### Database
- MongoDB (local or Atlas)
- Mongoose ODM

## Folder Structure

```
ai-resume-builder/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── layout/        # Navbar, Layout components
│   │   │   └── ui/            # Button, Input, Card, Spinner, Toast
│   │   ├── pages/             # Application pages
│   │   ├── context/           # React Context (Auth, Theme)
│   │   ├── services/          # API service functions
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Helper functions
│   │   ├── assets/            # Images, icons, fonts
│   │   ├── App.jsx            # Root component with routing
│   │   ├── main.jsx           # React DOM entry point
│   │   └── index.css          # Global Tailwind styles
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── package.json
│   └── .env.example
│
├── backend/                   # Backend (Node.js + Express)
│   ├── controllers/           # Request handlers (auth, resume, AI)
│   ├── models/                # Mongoose schemas (User, Resume)
│   ├── routes/                # API route definitions
│   ├── middleware/            # Auth, error, sanitization, rate limit
│   ├── config/                # Database connection
│   ├── utils/                 # Helper functions
│   ├── server.js              # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas cluster)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai_resume_builder
JWT_SECRET=your_secure_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key_here
CLIENT_URL=http://localhost:5173
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the dev server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   mongod
   ```
3. Use connection string: `mongodb://localhost:27017/ai_resume_builder`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and database
3. Get connection string and add to `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai_resume_builder
   ```

## OpenAI API Setup

1. Sign up at https://platform.openai.com
2. Create API key in settings
3. Add to `.env`:
   ```env
   OPENAI_API_KEY=sk-...your-key-here...
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/password` - Change password (protected)
- `DELETE /api/auth/profile` - Delete account (protected)

### Resume Management
- `POST /api/resumes` - Create resume (protected)
- `GET /api/resumes` - Get all resumes (protected)
- `GET /api/resumes/recent` - Get recent 4 resumes (protected)
- `GET /api/resumes/stats` - Get resume statistics (protected)
- `GET /api/resumes/:id` - Get resume by ID (protected)
- `PUT /api/resumes/:id` - Update resume (protected)
- `DELETE /api/resumes/:id` - Delete resume (protected)
- `POST /api/resumes/:id/duplicate` - Duplicate resume (protected)

### AI Content Generation
- `POST /api/ai/generate` - Generate AI content (protected)
  - Types: `summary`, `skills`, `project`, `experience`

## Frontend Pages

- `/` - Landing page with features showcase
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard with resume list and statistics
- `/resumes/new` - Create new resume
- `/resumes/edit/:id` - Edit existing resume
- `/resumes/preview/:id` - Preview resume before download
- `/templates` - Browse resume templates
- `/profile` - User profile and account settings
- `/404` - Not found page

## Code Quality

- **Clean Architecture**: MVC pattern for both frontend and backend
- **Reusable Components**: Button, Input, Card, Spinner, Toast components
- **Error Handling**: Comprehensive try-catch blocks and error middleware
- **Input Validation**: Frontend and backend validation on all inputs
- **Security**: JWT tokens, bcrypt hashing, CORS, rate limiting, input sanitization
- **Comments**: All complex functions documented
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Async/Await**: Modern promise handling throughout

## Running the Application

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Frontend
```bash
cd client
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Building for Production

### Frontend
```bash
cd client
npm run build
```

### Backend
Ensure all environment variables are properly configured and the server runs with:
```bash
npm start
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **HTTPS**: Use HTTPS in production
3. **CORS**: Configure allowed origins for production
4. **Rate Limiting**: Adjust based on your traffic needs
5. **JWT Secret**: Use strong, randomly generated secret
6. **MongoDB**: Enable authentication and use strong passwords
7. **OpenAI API**: Rotate keys periodically and monitor usage

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check firewall and network settings

### CORS Issues
- Verify `CLIENT_URL` in backend `.env`
- Check `VITE_API_URL` in frontend `.env`

### OpenAI API Errors
- Verify API key is valid and has sufficient credits
- Check rate limits on your account

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Vite will auto-increment port if 5173 is busy

## Future Enhancements

- Resume version history and rollback
- Share resume link feature
- Resume download tracking and analytics
- Theme switcher (dark mode)
- More resume templates
- Collaborative editing
- Export to multiple formats (DOCX, RTF)
- Resume optimization suggestions
- Bulk operations on resumes

## Support

For issues or questions, please check the code comments and error messages. Ensure all dependencies are installed and environment variables are properly configured.

## License

This project is built for educational purposes as a BCA Final Year Project.

---

**Built with ❤️ using MERN Stack**
