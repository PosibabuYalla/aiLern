const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: String,
    language: { type: String, default: 'en' },
    timezone: String
  },
  skillLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'beginner'
  },
  assessmentScores: {
    aiBasics: { type: Number, default: 0 },
    python: { type: Number, default: 0 },
    math: { type: Number, default: 0 },
    machineLearning: { type: Number, default: 0 }
  },
  learningPath: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  gamification: {
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    badges: [String],
    streak: { type: Number, default: 0 },
    lastActivity: Date
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    emailUpdates: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false }
  }
}, { timestamps: true });

// Course Schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true
  },
  category: String,
  estimatedDuration: Number, // in minutes
  prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  content: {
    videoUrl: String,
    textContent: String,
    subtitles: [{
      language: String,
      url: String
    }],
    codeExamples: [String],
    resources: [String]
  },
  exercises: [{
    type: { type: String, enum: ['coding', 'quiz', 'project'] },
    title: String,
    description: String,
    difficulty: String,
    points: Number,
    solution: String
  }],
  tags: [String],
  isPublished: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Assessment Schema
const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['diagnostic', 'quiz', 'final'], required: true },
  questions: [{
    question: String,
    type: { type: String, enum: ['multiple-choice', 'coding', 'text'] },
    options: [String],
    correctAnswer: String,
    points: Number,
    category: String // aiBasics, python, math, machineLearning
  }],
  timeLimit: Number, // in minutes
  passingScore: Number,
  difficulty: String
}, { timestamps: true });

// Progress Schema
const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['not-started', 'in-progress', 'completed'], default: 'not-started' },
  completionPercentage: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // in minutes
  lastAccessed: Date,
  exerciseResults: [{
    exerciseId: String,
    score: Number,
    attempts: Number,
    completed: Boolean,
    submittedCode: String,
    feedback: String
  }],
  quizResults: [{
    quizId: String,
    score: Number,
    totalQuestions: Number,
    correctAnswers: Number,
    completedAt: Date
  }]
}, { timestamps: true });

// Community Schema
const communitySchema = new mongoose.Schema({
  type: { type: String, enum: ['discussion', 'project', 'question'], required: true },
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  tags: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replies: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  isResolved: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', userSchema),
  Course: mongoose.model('Course', courseSchema),
  Assessment: mongoose.model('Assessment', assessmentSchema),
  Progress: mongoose.model('Progress', progressSchema),
  Community: mongoose.model('Community', communitySchema)
};