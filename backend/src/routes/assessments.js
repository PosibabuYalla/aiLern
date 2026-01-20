const express = require('express');
const { Assessment, User, Progress } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get category-specific assessment
router.get('/category/:category', auth, async (req, res) => {
  try {
    const { category } = req.params;
    
    const assessmentQuestions = {
      'programming': [
        {
          _id: '1',
          question: 'Which of the following is used to declare a variable in JavaScript?',
          type: 'multiple-choice',
          options: ['var', 'let', 'const', 'All of the above'],
          correctAnswer: 'All of the above',
          points: 10,
          category: 'programming'
        },
        {
          _id: '2',
          question: 'What is the correct way to create a function in Python?',
          type: 'multiple-choice',
          options: ['function myFunc():', 'def myFunc():', 'create myFunc():', 'func myFunc():'],
          correctAnswer: 'def myFunc():',
          points: 10,
          category: 'programming'
        },
        {
          _id: '3',
          question: 'Which keyword is used to create a class in Java?',
          type: 'multiple-choice',
          options: ['class', 'Class', 'object', 'Object'],
          correctAnswer: 'class',
          points: 10,
          category: 'programming'
        }
      ],
      'web-development': [
        {
          _id: '4',
          question: 'What does HTML stand for?',
          type: 'multiple-choice',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
          correctAnswer: 'Hyper Text Markup Language',
          points: 10,
          category: 'web-development'
        },
        {
          _id: '5',
          question: 'Which React hook is used for managing state?',
          type: 'multiple-choice',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 'useState',
          points: 10,
          category: 'web-development'
        },
        {
          _id: '6',
          question: 'What is Node.js primarily used for?',
          type: 'multiple-choice',
          options: ['Frontend development', 'Database management', 'Server-side development', 'Mobile development'],
          correctAnswer: 'Server-side development',
          points: 10,
          category: 'web-development'
        }
      ],
      'mobile-development': [
        {
          _id: '7',
          question: 'Which language is primarily used for iOS development?',
          type: 'multiple-choice',
          options: ['Java', 'Swift', 'Kotlin', 'C#'],
          correctAnswer: 'Swift',
          points: 10,
          category: 'mobile-development'
        },
        {
          _id: '8',
          question: 'React Native allows you to build apps for which platforms?',
          type: 'multiple-choice',
          options: ['iOS only', 'Android only', 'Both iOS and Android', 'Web only'],
          correctAnswer: 'Both iOS and Android',
          points: 10,
          category: 'mobile-development'
        }
      ],
      'data-science': [
        {
          _id: '9',
          question: 'Which Python library is commonly used for data manipulation?',
          type: 'multiple-choice',
          options: ['NumPy', 'Pandas', 'Matplotlib', 'All of the above'],
          correctAnswer: 'All of the above',
          points: 10,
          category: 'data-science'
        },
        {
          _id: '10',
          question: 'What does SQL stand for?',
          type: 'multiple-choice',
          options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Sequential Query Language'],
          correctAnswer: 'Structured Query Language',
          points: 10,
          category: 'data-science'
        }
      ],
      'ai-ml': [
        {
          _id: '11',
          question: 'Which algorithm is commonly used for classification problems?',
          type: 'multiple-choice',
          options: ['Linear Regression', 'Decision Tree', 'K-Means', 'PCA'],
          correctAnswer: 'Decision Tree',
          points: 10,
          category: 'ai-ml'
        },
        {
          _id: '12',
          question: 'What is TensorFlow primarily used for?',
          type: 'multiple-choice',
          options: ['Web development', 'Machine learning', 'Database management', 'Mobile development'],
          correctAnswer: 'Machine learning',
          points: 10,
          category: 'ai-ml'
        }
      ]
    };

    const questions = assessmentQuestions[category] || [];
    
    const assessment = {
      _id: `${category}-assessment`,
      title: `${category.replace('-', ' ')} Assessment`,
      type: 'category',
      passingScore: 70,
      questions: questions.map(q => ({
        _id: q._id,
        question: q.question,
        type: q.type,
        options: q.options,
        points: q.points,
        category: q.category
      }))
    };

    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Submit category-specific assessment
router.post('/category/:category/submit', auth, async (req, res) => {
  try {
    const { category } = req.params;
    const { answers } = req.body;

    const correctAnswers = {
      'programming': ['All of the above', 'def myFunc():', 'class'],
      'web-development': ['Hyper Text Markup Language', 'useState', 'Server-side development'],
      'mobile-development': ['Swift', 'Both iOS and Android'],
      'data-science': ['All of the above', 'Structured Query Language'],
      'ai-ml': ['Decision Tree', 'Machine learning']
    };

    const categoryAnswers = correctAnswers[category] || [];
    let correctCount = 0;
    const totalQuestions = categoryAnswers.length;
    const detailedResults = [];

    categoryAnswers.forEach((correctAnswer, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) correctCount++;
      
      detailedResults.push({
        questionIndex: index + 1,
        userAnswer,
        correctAnswer,
        isCorrect
      });
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const totalScore = correctCount * 10;
    const maxScore = totalQuestions * 10;

    let skillLevel = 'beginner';
    if (percentage >= 80) skillLevel = 'expert';
    else if (percentage >= 65) skillLevel = 'advanced';
    else if (percentage >= 40) skillLevel = 'intermediate';

    res.json({
      category,
      totalScore,
      maxScore,
      correctCount,
      totalQuestions,
      percentage,
      skillLevel,
      detailedResults
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
  try {
    // Sample assessment with questions for each technology section
    const assessment = {
      _id: 'diagnostic-test',
      title: 'Technology Skills Assessment',
      type: 'diagnostic',
      timeLimit: 30, // 30 minutes
      passingScore: 70,
      questions: [
        // Programming Languages
        {
          _id: '1',
          question: 'Which of the following is used to declare a variable in JavaScript?',
          type: 'multiple-choice',
          options: ['var', 'let', 'const', 'All of the above'],
          correctAnswer: 'All of the above',
          points: 5,
          category: 'programming'
        },
        {
          _id: '2',
          question: 'What is the correct way to create a function in Python?',
          type: 'multiple-choice',
          options: ['function myFunc():', 'def myFunc():', 'create myFunc():', 'func myFunc():'],
          correctAnswer: 'def myFunc():',
          points: 5,
          category: 'programming'
        },
        {
          _id: '3',
          question: 'Which keyword is used to create a class in Java?',
          type: 'multiple-choice',
          options: ['class', 'Class', 'object', 'Object'],
          correctAnswer: 'class',
          points: 5,
          category: 'programming'
        },
        
        // Web Development
        {
          _id: '4',
          question: 'What does HTML stand for?',
          type: 'multiple-choice',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
          correctAnswer: 'Hyper Text Markup Language',
          points: 5,
          category: 'web-development'
        },
        {
          _id: '5',
          question: 'Which React hook is used for managing state?',
          type: 'multiple-choice',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 'useState',
          points: 5,
          category: 'web-development'
        },
        {
          _id: '6',
          question: 'What is Node.js primarily used for?',
          type: 'multiple-choice',
          options: ['Frontend development', 'Database management', 'Server-side development', 'Mobile development'],
          correctAnswer: 'Server-side development',
          points: 5,
          category: 'web-development'
        },
        
        // Mobile Development
        {
          _id: '7',
          question: 'Which language is primarily used for iOS development?',
          type: 'multiple-choice',
          options: ['Java', 'Swift', 'Kotlin', 'C#'],
          correctAnswer: 'Swift',
          points: 5,
          category: 'mobile-development'
        },
        {
          _id: '8',
          question: 'React Native allows you to build apps for which platforms?',
          type: 'multiple-choice',
          options: ['iOS only', 'Android only', 'Both iOS and Android', 'Web only'],
          correctAnswer: 'Both iOS and Android',
          points: 5,
          category: 'mobile-development'
        },
        
        // Data Science
        {
          _id: '9',
          question: 'Which Python library is commonly used for data manipulation?',
          type: 'multiple-choice',
          options: ['NumPy', 'Pandas', 'Matplotlib', 'All of the above'],
          correctAnswer: 'All of the above',
          points: 5,
          category: 'data-science'
        },
        {
          _id: '10',
          question: 'What does SQL stand for?',
          type: 'multiple-choice',
          options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'Sequential Query Language'],
          correctAnswer: 'Structured Query Language',
          points: 5,
          category: 'data-science'
        },
        
        // AI & Machine Learning
        {
          _id: '11',
          question: 'Which algorithm is commonly used for classification problems?',
          type: 'multiple-choice',
          options: ['Linear Regression', 'Decision Tree', 'K-Means', 'PCA'],
          correctAnswer: 'Decision Tree',
          points: 5,
          category: 'ai-ml'
        },
        {
          _id: '12',
          question: 'What is TensorFlow primarily used for?',
          type: 'multiple-choice',
          options: ['Web development', 'Machine learning', 'Database management', 'Mobile development'],
          correctAnswer: 'Machine learning',
          points: 5,
          category: 'ai-ml'
        }
      ]
    };

    // Remove correct answers from response
    const sanitizedQuestions = assessment.questions.map(q => ({
      _id: q._id,
      question: q.question,
      type: q.type,
      options: q.options,
      points: q.points,
      category: q.category
    }));

    res.json({
      ...assessment,
      questions: sanitizedQuestions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit diagnostic assessment
router.post('/diagnostic/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.userId;

    // Sample assessment questions with correct answers
    const correctAnswers = [
      'All of the above', // JavaScript variables
      'def myFunc():', // Python functions
      'class', // Java classes
      'Hyper Text Markup Language', // HTML
      'useState', // React hooks
      'Server-side development', // Node.js
      'Swift', // iOS development
      'Both iOS and Android', // React Native
      'All of the above', // Python data libraries
      'Structured Query Language', // SQL
      'Decision Tree', // Classification algorithm
      'Machine learning' // TensorFlow
    ];

    // Calculate scores by category
    const scores = {
      programming: 0,
      'web-development': 0,
      'mobile-development': 0,
      'data-science': 0,
      'ai-ml': 0
    };

    const categories = [
      'programming', 'programming', 'programming',
      'web-development', 'web-development', 'web-development',
      'mobile-development', 'mobile-development',
      'data-science', 'data-science',
      'ai-ml', 'ai-ml'
    ];

    let totalScore = 0;
    const maxScore = correctAnswers.length * 5; // 5 points per question

    correctAnswers.forEach((correctAnswer, index) => {
      const userAnswer = answers[index];
      if (userAnswer === correctAnswer) {
        totalScore += 5;
        scores[categories[index]] += 5;
      }
    });

    // Determine skill level
    const percentage = (totalScore / maxScore) * 100;
    let skillLevel = 'beginner';
    if (percentage >= 80) skillLevel = 'expert';
    else if (percentage >= 65) skillLevel = 'advanced';
    else if (percentage >= 40) skillLevel = 'intermediate';

    res.json({
      totalScore,
      maxScore,
      percentage: Math.round(percentage),
      skillLevel,
      categoryScores: scores
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Helper function to generate learning path
async function generateLearningPath(skillLevel, scores) {
  const { Course } = require('../models');
  
  // Define course progression based on skill level
  const pathMap = {
    beginner: ['ai-basics', 'python-fundamentals', 'math-foundations'],
    intermediate: ['machine-learning-basics', 'supervised-learning', 'data-preprocessing'],
    advanced: ['deep-learning', 'nlp-basics', 'computer-vision'],
    expert: ['generative-ai', 'llm-fundamentals', 'ai-ethics']
  };

  // Get courses based on skill level and weak areas
  const recommendedCourses = await Course.find({
    difficulty: { $in: [skillLevel, 'beginner'] },
    isPublished: true
  }).limit(10);

  return recommendedCourses.map(course => ({
    id: course._id,
    title: course.title,
    difficulty: course.difficulty,
    estimatedDuration: course.estimatedDuration
  }));
}

module.exports = router;