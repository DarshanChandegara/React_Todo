# Todo List Full-Stack Application

A modern, secure full-stack todo list application with user authentication, built with React frontend and Node.js/Express backend with MongoDB database.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todolist-fullstack
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secrets
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

Frontend will be available at `http://localhost:3000`

Backend API will be available at `http://localhost:5000`


---

## 📁 Project Structure

```
todolist-fullstack/
├── client/                          # React frontend
│   ├── package.json                # Frontend dependencies
│   ├── public/
│   │   └── index.html              # Main HTML template
│   └── src/
│       ├── App.js                  # Main app component
│       ├── App.css                 # Global styles
│       ├── index.js                # React entry point
│       ├── index.css               # Base styles
│       ├── component/
│       │   ├── Login.jsx           # Login/Register modal
│       │   └── Todo.jsx            # Todo management component
│       ├── context/
│       │   └── AuthContext.js      # Authentication context
│       └── services/
│           └── api.js              # API service functions
├── server/                         # Node.js backend
│   ├── server.js                   # Main server file
│   ├── package.json                # Backend dependencies
│   ├── .env.example                # Environment variables template
│   ├── controller/
│   │   ├── user.controller.js      # User authentication logic
│   │   └── todo.controller.js      # Todo CRUD operations
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                 # User MongoDB schema
│   │   └── Todo.js                 # Todo MongoDB schema
│   └── routes/
│       ├── auth.js                 # Authentication routes
│       └── todos.js                # Todo CRUD routes
├── package.json                    # Root package.json
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Create React App** - Build tool and development server
- **Context API** - State management for authentication
- **CSS3** - Custom styling with responsive design
- **Font Awesome** - Icons for UI elements

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation and sanitization

### Security & Authentication
- **JWT Tokens** - Access tokens (15min) and refresh tokens (30 days)
- **HTTP-Only Cookies** - Secure token storage
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Server-side validation with express-validator
- **CORS** - Cross-origin resource sharing configuration

---

## 📝 Features

### Authentication
- ✅ User Registration with validation
- ✅ Secure Login with JWT authentication
- ✅ Automatic token refresh
- ✅ HTTP-only cookies for security
- ✅ Logout with token cleanup
- ✅ Protected routes and API endpoints

### Todo Management
- ✅ Create, Read, Update, Delete todos
- ✅ User-specific todo lists
- ✅ Real-time todo updates
- ✅ Auto-focus on edit mode
- ✅ Delete all todos functionality
- ✅ Character limit validation (200 chars)

### UI/UX
- ✅ Modern, clean interface
- ✅ Dark theme with purple accents
- ✅ Loading states and error handling
- ✅ Modal-based login/register
- ✅ Scrollable todo list with fixed height
- ✅ Hover effects and animations
- ✅ Accessible form controls

---

## 🔧 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and receive tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/refresh`
Refresh access token using refresh token.

#### POST `/api/auth/logout`
Logout user and clear tokens.

#### GET `/api/auth/me`
Get current authenticated user info (requires authentication).

### Todo Endpoints

All todo endpoints require authentication.

#### GET `/api/todos`
Get all todos for authenticated user.

**Response:**
```json
[
  {
    "_id": "todo_id",
    "title": "Buy groceries",
    "completed": false,
    "user": "user_id",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

#### POST `/api/todos`
Create a new todo.

**Request Body:**
```json
{
  "title": "Buy groceries"
}
```

#### PUT `/api/todos/:id`
Update a todo.

**Request Body:**
```json
{
  "title": "Buy groceries and milk",
  "completed": true
}
```

#### DELETE `/api/todos/:id`
Delete a specific todo.

#### DELETE `/api/todos`
Delete all todos for authenticated user.

---

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/todolist
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist

# JWT Secrets (generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-here

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 Deployment

### Frontend (Create React App)
```bash
cd client
npm run build
```

### Backend (Node.js)
```bash
cd server
npm start
```

---

### API Testing
Use tools like Postman or curl to test endpoints:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# Get todos (uses cookies)
curl -X GET http://localhost:5000/api/todos \
  -b cookies.txt
```

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Short-lived access tokens (15min) with refresh tokens (30 days)
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Input Validation**: Server-side validation with express-validator
- **CORS Configuration**: Restricted cross-origin requests

---

### Development Guidelines
- Follow React best practices and hooks patterns
- Use meaningful commit messages
- Test your changes before submitting
- Update documentation for new features
- Ensure responsive design works on all devices

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running locally or check your Atlas connection string
- Verify network access for MongoDB Atlas

**Frontend Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Create React App configuration for correct paths

**Authentication Issues**
- Verify JWT secrets are set correctly
- Check cookie settings for HTTPS in production
- Ensure CORS is configured for your frontend URL

**Port Conflicts**
- Change PORT in .env if 5000 is occupied
- Update FRONTEND_URL accordingly

---

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review the API documentation
3. Open an issue on GitHub with detailed information

---

## 🎯 Future Enhancements

- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Todo sharing between users
- [ ] Dark/light theme toggle
- [ ] PWA capabilities
- [ ] Real-time updates with WebSockets
- [ ] API rate limiting
- [ ] Comprehensive test suite

---

*Built with ❤️ using React, Node.js, Express, and MongoDB*