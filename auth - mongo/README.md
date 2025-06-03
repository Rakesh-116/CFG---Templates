# MERN Authentication System

This is a full-stack authentication system built with:

- MongoDB - Database
- Express - Backend Framework
- React - Frontend Library
- Node.js - Runtime Environment

## Features

- JWT-based authentication
- User registration and login
- Protected routes
- Modern UI with Tailwind CSS

## Project Structure

```
.
├── client/ - React frontend
└── server/ - Express backend
```

## Setup Instructions

### Backend Setup

1. Navigate to the server folder:

   ```
   cd server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and configure your MongoDB connection:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client folder:

   ```
   cd client
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and go to: `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/user` - Get current user info (protected)

## Token Storage

Authentication tokens are stored in localStorage for persistence across sessions. The tokens are sent with each request using the Authorization header.
