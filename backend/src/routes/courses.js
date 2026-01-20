const express = require('express');
const { Course, Progress, User } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get recommended courses
router.get('/recommended', auth, async (req, res) => {
  try {
    const user = req.userDoc;
    const courses = await Course.find({
      difficulty: { $in: [user.skillLevel, 'beginner'] },
      isPublished: true
    }).limit(6);

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { difficulty, category, search } = req.query;
    
    // Sample courses data for development
    const sampleCourses = [
      {
        _id: '1',
        title: 'JavaScript Fundamentals',
        description: 'Master the basics of JavaScript programming language',
        difficulty: 'beginner',
        category: 'programming',
        estimatedDuration: 180,
        tags: ['javascript', 'programming', 'web'],
        isPublished: true
      },
      {
        _id: '2',
        title: 'Python for Beginners',
        description: 'Complete introduction to Python programming',
        difficulty: 'beginner',
        category: 'programming',
        estimatedDuration: 200,
        tags: ['python', 'programming', 'beginner'],
        isPublished: true
      },
      {
        _id: '3',
        title: 'React.js Complete Guide',
        description: 'Build modern web applications with React',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 280,
        tags: ['react', 'javascript', 'frontend'],
        isPublished: true
      },
      {
        _id: '4',
        title: 'Node.js Backend Development',
        description: 'Server-side development with Node.js and Express',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 250,
        tags: ['nodejs', 'backend', 'api'],
        isPublished: true
      },
      {
        _id: '5',
        title: 'React Native Mobile Apps',
        description: 'Build cross-platform mobile apps with React Native',
        difficulty: 'intermediate',
        category: 'mobile-development',
        estimatedDuration: 320,
        tags: ['react-native', 'mobile', 'cross-platform'],
        isPublished: true
      },
      {
        _id: '6',
        title: 'Python for Data Science',
        description: 'Data analysis and visualization with Python',
        difficulty: 'intermediate',
        category: 'data-science',
        estimatedDuration: 280,
        tags: ['python', 'data-science', 'pandas'],
        isPublished: true
      },
      {
        _id: '7',
        title: 'Machine Learning with Python',
        description: 'Introduction to machine learning algorithms',
        difficulty: 'advanced',
        category: 'ai-ml',
        estimatedDuration: 400,
        tags: ['machine-learning', 'python', 'ai'],
        isPublished: true
      },
      {
        _id: '8',
        title: 'Java Programming Essentials',
        description: 'Learn Java programming from basics to advanced concepts',
        difficulty: 'intermediate',
        category: 'programming',
        estimatedDuration: 240,
        tags: ['java', 'programming', 'oop'],
        isPublished: true
      }
    ];
    
    let filteredCourses = sampleCourses;
    
    if (difficulty && difficulty !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.difficulty === difficulty);
    }
    
    if (category && category !== 'all') {
      filteredCourses = filteredCourses.filter(course => course.category === category);
    }
    
    if (search) {
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    res.json(filteredCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course by ID
router.get('/:id', auth, async (req, res) => {
  try {
    // Sample course data
    const sampleCourse = {
      _id: req.params.id,
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming language including variables, functions, objects, and DOM manipulation.',
      difficulty: 'beginner',
      category: 'programming',
      estimatedDuration: 180,
      content: {
        textContent: 'JavaScript is a versatile programming language that runs in web browsers and on servers. In this course, you will learn the fundamental concepts of JavaScript programming including variables, data types, functions, objects, arrays, and DOM manipulation. We will cover modern ES6+ features and best practices for writing clean, maintainable code.',
        codeExamples: [
          'console.log("Hello World");',
          'function greet(name) { return "Hello " + name; }',
          'const numbers = [1, 2, 3, 4, 5];',
          'const person = { name: "John", age: 30 };'
        ]
      },
      tags: ['javascript', 'programming', 'web'],
      isPublished: true,
      userProgress: null
    };
    
    res.json(sampleCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create course (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      author: req.user.userId
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;