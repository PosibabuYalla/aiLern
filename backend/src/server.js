const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const assessmentRoutes = require('./routes/assessments');
const progressRoutes = require('./routes/progress');
const aiRoutes = require('./routes/ai');
const communityRoutes = require('./routes/community');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection with better error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ailern-db';
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed:', error.message);
    console.log('📝 Server will run without database functionality');
    console.log('💡 To fix: Install MongoDB locally or use MongoDB Atlas');
  }
};

// Connect to database
connectDB();

// Middleware to check database connection
const checkDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: 'Database unavailable. Please check MongoDB connection.',
      error: 'DB_UNAVAILABLE'
    });
  }
  next();
};

// Routes with database check
app.use('/api/auth', checkDBConnection, authRoutes);
app.use('/api/users', checkDBConnection, userRoutes);
app.use('/api/courses', checkDBConnection, courseRoutes);
app.use('/api/assessments', checkDBConnection, assessmentRoutes);
app.use('/api/progress', checkDBConnection, progressRoutes);
app.use('/api/ai', aiRoutes); // AI routes might work without DB
app.use('/api/community', checkDBConnection, communityRoutes);

// Health check with database status
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: dbStatus,
    message: dbStatus === 'disconnected' ? 'Server running without database' : 'All systems operational'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;