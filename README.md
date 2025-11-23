# Task Management Application - Full Stack

A complete end-to-end task management application built with React, Node.js, Express, and MongoDB. This project demonstrates authentication, CRUD operations, and a responsive UI.

## Features

✅ **User Authentication**
- Sign up and login with JWT tokens
- Secure password hashing with bcryptjs
- Token-based authorization

✅ **Task Management**
- Create, read, update, and delete tasks
- Filter tasks by status (pending, in-progress, completed)
- Set task priority (low, medium, high)
- Add due dates to tasks
- Real-time status updates

✅ **User Profile**
- View and update profile information
- Change password securely
- Custom avatar support

✅ **Security**
- JWT authentication with 7-day expiration
- Password hashing with bcryptjs
- Protected routes with auth middleware
- Input validation on both client and server

✅ **Responsive Design**
- Mobile-first design with Tailwind CSS
- Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Environment Management**: dotenv

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite

## Project Structure

\`\`\`
task-app/
- ├── backend/
- │   ├── server.js                    # Express server entry point //
- │   ├── package.json                 # Backend dependencies \\
- │   ├── .env.example                 # Environment variables template
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   └── Task.js                  # Task schema
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── tasks.js                 # Task CRUD routes
│   │   └── profile.js               # Profile routes
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── taskController.js        # Task logic
│   │   └── profileController.js     # Profile logic
│   └── middleware/
│       └── auth.js                  # JWT verification middleware
│
└── frontend/
    ├── src/
    │   ├── main.jsx                 # React entry point
    │   ├── App.jsx                  # Main app component
    │   ├── index.css                # Global styles
    │   ├── pages/
    │   │   ├── Login.jsx            # Login page
    │   │   ├── Register.jsx         # Registration page
    │   │   ├── Dashboard.jsx        # Task dashboard
    │   │   └── Profile.jsx          # Profile settings
    │   ├── components/
    │   │   ├── ProtectedRoute.jsx   # Auth guard component
    │   │   ├── TaskForm.jsx         # Task creation/edit form
    │   │   └── TaskList.jsx         # Task list display
    │   ├── hooks/
    │   │   └── useAuth.js           # Auth context and hook
    │   └── services/
    │       └── api.js               # API service with axios
    ├── package.json                 # Frontend dependencies
    ├── vite.config.js               # Vite configuration
    ├── tailwind.config.js           # Tailwind configuration
    ├── .env                         # Environment variables template
    └── index.html                   # HTML entry point
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud)

### Backend Setup

1. **Navigate to backend directory**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edit `.env` and add your values:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/taskapp
   JWT_SECRET=your_secure_jwt_secret_key_here
   PORT=5000
   \`\`\`

4. **Start the server**
   \`\`\`bash
   npm start        # Production
   npm run dev      # Development with hot reload
   \`\`\`

The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edit `.env`:
   \`\`\`
   VITE_API_URL=http://localhost:5000/api
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks (with optional filters)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `PUT /api/profile/password` - Change password

## API Request/Response Examples

### Register
\`\`\`javascript
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
\`\`\`

### Create Task
\`\`\`javascript
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task app",
  "priority": "high",
  "dueDate": "2024-12-31"
}

Response (201):
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the task app",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-12-31",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

## Features Breakdown

### Authentication Flow
1. User registers with email, password, and name
2. Password is hashed using bcryptjs (10 salt rounds)
3. JWT token is generated with 7-day expiration
4. Token is stored in localStorage on the frontend
5. Token is sent in Authorization header for protected routes
6. Expired tokens automatically redirect to login

### Task Management
- Users can create tasks with title, description, priority, and due date
- Tasks can be filtered by status and priority
- Status can be changed inline from pending → in-progress → completed
- Tasks are sorted by creation date (newest first)
- Dashboard shows statistics for quick overview

### Security Measures
- All passwords are hashed with bcryptjs before storage
- JWT tokens expire after 7 days
- Protected routes check for valid token
- Invalid/expired tokens trigger automatic logout
- Input validation on both frontend and backend
- SQL injection and XSS protected through parameterized queries

## Production Deployment Notes

### Scaling Considerations

1. **Database Optimization**
   - Add indexes on frequently queried fields (userId, status)
   - Implement pagination for large task lists
   - Use database connection pooling

2. **API Security**
   - Implement rate limiting
   - Add request validation with joi or yup
   - Use HTTPS in production
   - Implement CORS policy properly

3. **Frontend Optimization**
   - Code splitting and lazy loading
   - Asset compression and caching
   - CDN for static assets
   - Service workers for offline support

4. **Deployment**
   - Backend: Deploy to Heroku, Railway, or DigitalOcean
   - Frontend: Deploy to Vercel, Netlify, or GitHub Pages
   - Database: Use MongoDB Atlas for cloud hosting

5. **Monitoring**
   - Add error tracking (Sentry)
   - Implement logging (Winston, Pino)
   - Monitor API performance

## Testing

### Manual Testing Steps

1. **Test Registration**
   - Register with a new email
   - Try registering with duplicate email (should fail)
   - Try registering with weak password (should fail)

2. **Test Login**
   - Login with correct credentials
   - Try login with wrong password (should fail)
   - Token should be stored in localStorage

3. **Test Task Management**
   - Create multiple tasks with different priorities
   - Filter tasks by status
   - Update task status
   - Edit and delete tasks

4. **Test Profile**
   - Update profile information
   - Change password
   - Verify changes persist

5. **Test Security**
   - Clear localStorage and try accessing dashboard (should redirect to login)
   - Try modifying token in localStorage (should fail on API call)

## Troubleshooting

### Common Issues

**Backend won't connect to MongoDB**
- Check if MongoDB is running: `mongod`
- Verify MONGODB_URI in .env file
- For MongoDB Atlas, check connection string and IP whitelist

**Frontend can't connect to backend**
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env
- Check browser console for CORS errors
- Verify no firewall is blocking the connection

**Login fails but registration works**
- Ensure password was hashed correctly during registration
- Check that JWT_SECRET is consistent
- Verify token expiration isn't the issue

**Tasks not loading**
- Check network tab in browser DevTools
- Verify token is being sent in Authorization header
- Check MongoDB for data

## Future Enhancements

- Drag and drop task ordering
- Task categories/projects
- Task comments and collaboration
- File attachments to tasks
- Email notifications
- Dark mode support
- Webhook integrations
- Mobile app (React Native)

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Review backend logs for API errors

---

**Built with ❤️ for full-stack development learning**
