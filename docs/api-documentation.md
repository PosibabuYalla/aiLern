# API Documentation - Deepu AI Course Generator

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.deepu-ai-course.com/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user
```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "language": "en"
}

// Response
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "language": "en"
    },
    "skillLevel": "beginner"
  }
}
```

#### POST /auth/login
Login user
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "profile": {...},
    "skillLevel": "intermediate",
    "gamification": {
      "points": 1250,
      "level": 3,
      "badges": ["first-course", "python-master"],
      "streak": 7
    }
  }
}
```

### Assessments

#### GET /assessments/diagnostic
Get diagnostic assessment questions
```json
// Response
{
  "_id": "assessment_id",
  "title": "AI Skills Diagnostic Test",
  "type": "diagnostic",
  "timeLimit": 30,
  "questions": [
    {
      "_id": "question_id",
      "question": "What is Machine Learning?",
      "type": "multiple-choice",
      "options": [
        "A subset of AI that learns from data",
        "A programming language",
        "A database system",
        "A web framework"
      ],
      "points": 10,
      "category": "aiBasics"
    }
  ]
}
```

#### POST /assessments/diagnostic/submit
Submit diagnostic assessment
```json
// Request
{
  "answers": ["A subset of AI that learns from data", "Python", "Statistics", "Supervised Learning"]
}

// Response
{
  "totalScore": 75,
  "maxScore": 100,
  "percentage": 75,
  "skillLevel": "intermediate",
  "categoryScores": {
    "aiBasics": 20,
    "python": 25,
    "math": 15,
    "machineLearning": 15
  },
  "learningPath": [
    {
      "id": "course_id",
      "title": "Machine Learning Fundamentals",
      "difficulty": "intermediate",
      "estimatedDuration": 120
    }
  ]
}
```

### Courses

#### GET /courses/recommended
Get recommended courses for user
```json
// Response
[
  {
    "_id": "course_id",
    "title": "Python for AI",
    "description": "Learn Python programming for AI applications",
    "difficulty": "beginner",
    "category": "Programming",
    "estimatedDuration": 180,
    "thumbnail": "https://example.com/thumbnail.jpg",
    "tags": ["python", "programming", "ai"],
    "isPublished": true
  }
]
```

#### GET /courses/:id
Get specific course details
```json
// Response
{
  "_id": "course_id",
  "title": "Deep Learning Fundamentals",
  "description": "Introduction to neural networks and deep learning",
  "difficulty": "advanced",
  "category": "Machine Learning",
  "estimatedDuration": 240,
  "prerequisites": ["ml-basics", "python-advanced"],
  "content": {
    "videoUrl": "https://example.com/video.mp4",
    "textContent": "Course content here...",
    "subtitles": [
      {
        "language": "en",
        "url": "https://example.com/subtitles-en.vtt"
      }
    ],
    "codeExamples": ["import tensorflow as tf"],
    "resources": ["https://tensorflow.org"]
  },
  "exercises": [
    {
      "type": "coding",
      "title": "Build a Neural Network",
      "description": "Create a simple neural network using TensorFlow",
      "difficulty": "medium",
      "points": 50,
      "solution": "# Solution code here"
    }
  ],
  "tags": ["deep-learning", "neural-networks", "tensorflow"]
}
```

### Progress Tracking

#### GET /progress/user
Get user's learning progress
```json
// Response
{
  "overallProgress": {
    "coursesCompleted": 5,
    "coursesInProgress": 2,
    "totalTimeSpent": 1200, // minutes
    "averageScore": 85
  },
  "courseProgress": [
    {
      "course": {
        "_id": "course_id",
        "title": "Python Basics"
      },
      "status": "completed",
      "completionPercentage": 100,
      "timeSpent": 180,
      "lastAccessed": "2024-01-15T10:30:00Z",
      "finalScore": 92
    }
  ],
  "recentActivity": [
    {
      "type": "course_completed",
      "title": "Completed Python Basics",
      "timestamp": "2024-01-15T10:30:00Z",
      "points": 100
    }
  ]
}
```

### AI Mentor

#### POST /ai/ask
Ask AI mentor a question
```json
// Request
{
  "question": "Can you explain gradient descent?",
  "context": {
    "courseId": "course_id",
    "lessonId": "lesson_id"
  }
}

// Response
{
  "answer": "Gradient descent is an optimization algorithm used to minimize the cost function in machine learning models...",
  "relatedTopics": ["backpropagation", "optimization", "learning-rate"],
  "suggestedResources": [
    {
      "title": "Gradient Descent Visualization",
      "url": "https://example.com/gradient-descent"
    }
  ]
}
```

#### POST /ai/code-review
Submit code for AI review
```json
// Request
{
  "code": "import numpy as np\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))",
  "language": "python",
  "context": "neural network activation function"
}

// Response
{
  "feedback": "Good implementation of sigmoid function. Consider adding input validation and handling overflow for large values.",
  "suggestions": [
    "Add docstring documentation",
    "Handle numerical overflow with np.clip",
    "Consider using scipy.special.expit for better numerical stability"
  ],
  "score": 85,
  "improvements": [
    {
      "line": 3,
      "suggestion": "Add: np.clip(x, -500, 500) to prevent overflow"
    }
  ]
}
```

### Community

#### GET /community/discussions
Get community discussions
```json
// Response
[
  {
    "_id": "discussion_id",
    "type": "question",
    "title": "How to implement backpropagation?",
    "content": "I'm struggling with understanding backpropagation...",
    "author": {
      "_id": "user_id",
      "profile": {
        "firstName": "Jane",
        "lastName": "Doe"
      }
    },
    "course": {
      "_id": "course_id",
      "title": "Deep Learning Basics"
    },
    "tags": ["backpropagation", "neural-networks"],
    "likes": ["user1", "user2"],
    "replies": [
      {
        "author": {...},
        "content": "Backpropagation is the process of...",
        "createdAt": "2024-01-15T11:00:00Z",
        "likes": ["user3"]
      }
    ],
    "isResolved": false,
    "views": 45,
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

## Error Responses

All endpoints return consistent error format:
```json
{
  "message": "Error description",
  "error": "Detailed error information (development only)",
  "code": "ERROR_CODE"
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error