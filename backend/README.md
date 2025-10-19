# Aero Car Store Backend API

This is the backend API for the Aero Car Store e-commerce application.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **User Management**: Profile updates, avatar management, account deletion
- **Security**: Password hashing, rate limiting, CORS protection
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation and sanitization

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/aero-car-store
# Alternative: MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aero-car-store

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:8080
```

### 3. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/aero-car-store` as MONGODB_URI

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Use the connection string as MONGODB_URI

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/avatar` - Update user avatar
- `DELETE /api/users/account` - Delete user account

### Health Check

- `GET /api/health` - API health status

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    // Validation errors
  ]
}
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse with request rate limiting
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: All inputs are validated and sanitized
- **Helmet**: Security headers for protection

## Development

### Project Structure

```
backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── server.js        # Main server file
└── package.json     # Dependencies
```

### Adding New Features

1. Create models in `models/` directory
2. Add routes in `routes/` directory
3. Add middleware in `middleware/` directory
4. Update `server.js` to include new routes

## Testing

The API can be tested using tools like:
- Postman
- Insomnia
- curl
- Frontend application

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Set strong JWT secrets
4. Configure proper CORS origins
5. Use a process manager like PM2
6. Set up reverse proxy with Nginx
7. Enable HTTPS

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Check if MongoDB is running and connection string is correct
2. **JWT Secret Error**: Ensure JWT_SECRET is set in environment variables
3. **CORS Error**: Check FRONTEND_URL configuration
4. **Port Already in Use**: Change PORT in environment variables

### Logs

Check console output for detailed error messages and logs.
