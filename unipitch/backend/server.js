const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const verifyToken = require('./middleware/authMiddleware'); // Middleware for protected routes
const bodyParser = require('body-parser');
const passwordResetRoutes = require('./routes/passwordResetRoutes'); // Adjust the path
const emailRoutes = require('./routes/emailRoutes');

const redisClient = require('./redisClient'); // Import Redis client

const session = require('express-session');
const { RedisStore } = require('connect-redis');  // Use object destructuring
  // Correct import for v8.x
const redis = require('redis');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Initialize Express app
app.use(bodyParser.json());

// Initialize Redis client

// Add session middleware
app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        // other options
      }),
      secret: process.env.SESSION_SECRET || 'default_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Public Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/password-reset', passwordResetRoutes); // Add this line
app.use('/api/email', emailRoutes);

// Protected Routes (Apply `verifyToken` middleware)
app.use('/api/protected', verifyToken, protectedRoutes); // Protected routes

// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log({
    SESSION_SECRET: process.env.SESSION_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
});
