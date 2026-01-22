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
      // Programming Languages
      {
        _id: '1',
        title: 'JavaScript Fundamentals',
        description: 'Master the basics of JavaScript programming language',
        difficulty: 'beginner',
        category: 'programming',
        estimatedDuration: 180,
        content: {
          videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
          textContent: 'Learn JavaScript from scratch including variables, functions, objects, and DOM manipulation.'
        },
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
        content: {
          videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
          textContent: 'Learn Python syntax, data structures, functions, and object-oriented programming.'
        },
        tags: ['python', 'programming', 'beginner'],
        isPublished: true
      },
      {
        _id: '3',
        title: 'Java Programming Essentials',
        description: 'Learn Java programming from basics to advanced concepts',
        difficulty: 'intermediate',
        category: 'programming',
        estimatedDuration: 240,
        content: {
          videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
          textContent: 'Master Java programming including OOP, collections, exception handling, and multithreading.'
        },
        tags: ['java', 'programming', 'oop'],
        isPublished: true
      },
      {
        _id: '4',
        title: 'C++ Programming Complete Course',
        description: 'Advanced C++ concepts and system programming',
        difficulty: 'advanced',
        category: 'programming',
        estimatedDuration: 300,
        content: {
          videoUrl: 'https://www.youtube.com/embed/8jLOx1hD3_o',
          textContent: 'Advanced C++ topics including templates, STL, memory management, and performance optimization.'
        },
        tags: ['cpp', 'programming', 'system'],
        isPublished: true
      },
      {
        _id: '5',
        title: 'C# Programming Tutorial',
        description: 'Complete C# programming for .NET development',
        difficulty: 'intermediate',
        category: 'programming',
        estimatedDuration: 220,
        content: {
          videoUrl: 'https://www.youtube.com/embed/GhQdlIFylQ8',
          textContent: 'Learn C# programming, .NET framework, and building Windows applications.'
        },
        tags: ['csharp', 'programming', 'dotnet'],
        isPublished: true
      },
      
      // Web Development
      {
        _id: '6',
        title: 'React.js Complete Guide',
        description: 'Build modern web applications with React',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 280,
        content: {
          videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
          textContent: 'Learn React components, hooks, state management, and building full-stack applications.'
        },
        tags: ['react', 'javascript', 'frontend'],
        isPublished: true
      },
      {
        _id: '7',
        title: 'Node.js Backend Development',
        description: 'Server-side development with Node.js and Express',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 250,
        content: {
          videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4',
          textContent: 'Build REST APIs, handle databases, authentication, and deploy Node.js applications.'
        },
        tags: ['nodejs', 'backend', 'api'],
        isPublished: true
      },
      {
        _id: '8',
        title: 'HTML & CSS Complete Course',
        description: 'Complete guide to modern HTML and CSS',
        difficulty: 'beginner',
        category: 'web-development',
        estimatedDuration: 150,
        content: {
          videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
          textContent: 'Learn semantic HTML, CSS Grid, Flexbox, responsive design, and modern CSS features.'
        },
        tags: ['html', 'css', 'frontend'],
        isPublished: true
      },
      {
        _id: '9',
        title: 'Vue.js Framework Tutorial',
        description: 'Progressive JavaScript framework for building UIs',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 220,
        content: {
          videoUrl: 'https://www.youtube.com/embed/FXpIoQ_rT_c',
          textContent: 'Learn Vue.js components, directives, Vuex state management, and Vue Router.'
        },
        tags: ['vuejs', 'javascript', 'frontend'],
        isPublished: true
      },
      {
        _id: '10',
        title: 'Angular Complete Guide',
        description: 'Build dynamic web applications with Angular',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 300,
        content: {
          videoUrl: 'https://www.youtube.com/embed/k5E2AVpwsko',
          textContent: 'Master Angular framework, TypeScript, components, services, and routing.'
        },
        tags: ['angular', 'typescript', 'frontend'],
        isPublished: true
      },
      
      // Mobile Development
      {
        _id: '11',
        title: 'React Native Mobile Apps',
        description: 'Build cross-platform mobile apps with React Native',
        difficulty: 'intermediate',
        category: 'mobile-development',
        estimatedDuration: 320,
        content: {
          videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc',
          textContent: 'Create iOS and Android apps using React Native, navigation, and native modules.'
        },
        tags: ['react-native', 'mobile', 'cross-platform'],
        isPublished: true
      },
      {
        _id: '12',
        title: 'Flutter Development Course',
        description: 'Build beautiful mobile apps with Flutter and Dart',
        difficulty: 'intermediate',
        category: 'mobile-development',
        estimatedDuration: 300,
        content: {
          videoUrl: 'https://www.youtube.com/embed/VPvVD8t02U8',
          textContent: 'Learn Dart language, Flutter widgets, state management, and app deployment.'
        },
        tags: ['flutter', 'dart', 'mobile'],
        isPublished: true
      },
      {
        _id: '13',
        title: 'iOS Development with Swift',
        description: 'Native iOS app development using Swift',
        difficulty: 'advanced',
        category: 'mobile-development',
        estimatedDuration: 350,
        content: {
          videoUrl: 'https://www.youtube.com/embed/09TeUXjzpKs',
          textContent: 'Master Swift programming, UIKit, SwiftUI, and iOS app architecture patterns.'
        },
        tags: ['swift', 'ios', 'mobile'],
        isPublished: true
      },
      {
        _id: '14',
        title: 'Android Development with Kotlin',
        description: 'Build native Android apps with Kotlin',
        difficulty: 'intermediate',
        category: 'mobile-development',
        estimatedDuration: 280,
        content: {
          videoUrl: 'https://www.youtube.com/embed/F9UC9DY-vIU',
          textContent: 'Learn Kotlin programming, Android SDK, and modern Android development practices.'
        },
        tags: ['kotlin', 'android', 'mobile'],
        isPublished: true
      },
      
      // Data Science
      {
        _id: '15',
        title: 'Python for Data Science',
        description: 'Data analysis and visualization with Python',
        difficulty: 'intermediate',
        category: 'data-science',
        estimatedDuration: 280,
        content: {
          videoUrl: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
          textContent: 'Learn pandas, numpy, matplotlib, and data manipulation techniques.'
        },
        tags: ['python', 'data-science', 'pandas'],
        isPublished: true
      },
      {
        _id: '16',
        title: 'SQL Database Complete Course',
        description: 'Complete guide to SQL and database management',
        difficulty: 'beginner',
        category: 'data-science',
        estimatedDuration: 200,
        content: {
          videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
          textContent: 'Master SQL queries, joins, indexes, and database design principles.'
        },
        tags: ['sql', 'database', 'data'],
        isPublished: true
      },
      {
        _id: '17',
        title: 'R Programming for Data Analysis',
        description: 'Statistical computing and graphics with R',
        difficulty: 'intermediate',
        category: 'data-science',
        estimatedDuration: 250,
        content: {
          videoUrl: 'https://www.youtube.com/embed/_V8eKsto3Ug',
          textContent: 'Learn R programming, statistical analysis, and data visualization with ggplot2.'
        },
        tags: ['r', 'statistics', 'data-science'],
        isPublished: true
      },
      {
        _id: '18',
        title: 'Data Visualization with Tableau',
        description: 'Create stunning data visualizations and dashboards',
        difficulty: 'beginner',
        category: 'data-science',
        estimatedDuration: 180,
        content: {
          videoUrl: 'https://www.youtube.com/embed/TPMlZxRRaBQ',
          textContent: 'Master Tableau for creating interactive dashboards and data storytelling.'
        },
        tags: ['tableau', 'visualization', 'analytics'],
        isPublished: true
      },
      
      // AI & Machine Learning
      {
        _id: '19',
        title: 'Machine Learning with Python',
        description: 'Introduction to machine learning algorithms',
        difficulty: 'advanced',
        category: 'ai-ml',
        estimatedDuration: 400,
        content: {
          videoUrl: 'https://www.youtube.com/embed/7eh4d6sabA0',
          textContent: 'Learn supervised and unsupervised learning, scikit-learn, and model evaluation.'
        },
        tags: ['machine-learning', 'python', 'ai'],
        isPublished: true
      },
      {
        _id: '20',
        title: 'Deep Learning with TensorFlow',
        description: 'Neural networks and deep learning concepts',
        difficulty: 'expert',
        category: 'ai-ml',
        estimatedDuration: 450,
        content: {
          videoUrl: 'https://www.youtube.com/embed/tPYj3fFJGjk',
          textContent: 'Master neural networks, backpropagation, CNNs, RNNs, and TensorFlow.'
        },
        tags: ['deep-learning', 'tensorflow', 'neural-networks'],
        isPublished: true
      },
      {
        _id: '21',
        title: 'Natural Language Processing',
        description: 'Text processing and language understanding',
        difficulty: 'advanced',
        category: 'ai-ml',
        estimatedDuration: 350,
        content: {
          videoUrl: 'https://www.youtube.com/embed/fNxaJsNG3-s',
          textContent: 'Learn text preprocessing, sentiment analysis, and transformer models.'
        },
        tags: ['nlp', 'python', 'text-processing'],
        isPublished: true
      },
      {
        _id: '22',
        title: 'Computer Vision with OpenCV',
        description: 'Image processing and computer vision techniques',
        difficulty: 'advanced',
        category: 'ai-ml',
        estimatedDuration: 320,
        content: {
          videoUrl: 'https://www.youtube.com/embed/oXlwWbU8l2o',
          textContent: 'Learn image processing, object detection, and computer vision applications.'
        },
        tags: ['computer-vision', 'opencv', 'image-processing'],
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
    const courseId = req.params.id;
    
    // Sample courses with videos
    const courses = {
      // Programming
      '1': {
        _id: '1',
        title: 'JavaScript Fundamentals',
        description: 'Master the basics of JavaScript programming language including variables, functions, objects, and DOM manipulation.',
        difficulty: 'beginner',
        category: 'programming',
        estimatedDuration: 180,
        content: {
          videoUrl: 'https://www.youtube.com/embed/PkZNo7MFNFg',
          textContent: 'JavaScript is a versatile programming language that runs in web browsers and on servers. Learn variables, functions, objects, arrays, and DOM manipulation with modern ES6+ features.'
        }
      },
      '2': {
        _id: '2',
        title: 'Python for Beginners',
        description: 'Complete introduction to Python programming with hands-on examples.',
        difficulty: 'beginner',
        category: 'programming',
        estimatedDuration: 200,
        content: {
          videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
          textContent: 'Python is a powerful, easy-to-learn programming language. Master syntax, data structures, functions, and object-oriented programming concepts.'
        }
      },
      '3': {
        _id: '3',
        title: 'Java Programming Essentials',
        description: 'Learn Java programming from basics to advanced concepts.',
        difficulty: 'intermediate',
        category: 'programming',
        estimatedDuration: 240,
        content: {
          videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
          textContent: 'Master Java programming including OOP, collections, exception handling, and multithreading concepts.'
        }
      },
      '4': {
        _id: '4',
        title: 'C++ Programming Complete Course',
        description: 'Advanced C++ concepts and system programming.',
        difficulty: 'advanced',
        category: 'programming',
        estimatedDuration: 300,
        content: {
          videoUrl: 'https://www.youtube.com/embed/8jLOx1hD3_o',
          textContent: 'Advanced C++ topics including templates, STL, memory management, and performance optimization.'
        }
      },
      '5': {
        _id: '5',
        title: 'C# Programming Tutorial',
        description: 'Complete C# programming for .NET development.',
        difficulty: 'intermediate',
        category: 'programming',
        estimatedDuration: 220,
        content: {
          videoUrl: 'https://www.youtube.com/embed/GhQdlIFylQ8',
          textContent: 'Learn C# programming, .NET framework, and building Windows applications.'
        }
      },
      
      // Web Development
      '6': {
        _id: '6',
        title: 'React.js Complete Guide',
        description: 'Build modern web applications with React framework.',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 280,
        content: {
          videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
          textContent: 'Learn React components, hooks, state management, and building full-stack applications with modern React patterns.'
        }
      },
      '7': {
        _id: '7',
        title: 'Node.js Backend Development',
        description: 'Server-side development with Node.js and Express framework.',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 250,
        content: {
          videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4',
          textContent: 'Build REST APIs, handle databases, authentication, and deploy Node.js applications with Express framework.'
        }
      },
      '8': {
        _id: '8',
        title: 'HTML & CSS Complete Course',
        description: 'Complete guide to modern HTML and CSS.',
        difficulty: 'beginner',
        category: 'web-development',
        estimatedDuration: 150,
        content: {
          videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
          textContent: 'Learn semantic HTML, CSS Grid, Flexbox, responsive design, and modern CSS features.'
        }
      },
      '9': {
        _id: '9',
        title: 'Vue.js Framework Tutorial',
        description: 'Progressive JavaScript framework for building UIs.',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 220,
        content: {
          videoUrl: 'https://www.youtube.com/embed/FXpIoQ_rT_c',
          textContent: 'Learn Vue.js components, directives, Vuex state management, and Vue Router.'
        }
      },
      '10': {
        _id: '10',
        title: 'Angular Complete Guide',
        description: 'Build dynamic web applications with Angular.',
        difficulty: 'intermediate',
        category: 'web-development',
        estimatedDuration: 300,
        content: {
          videoUrl: 'https://www.youtube.com/embed/k5E2AVpwsko',
          textContent: 'Master Angular framework, TypeScript, components, services, and routing.'
        }
      },
      
      // Mobile Development
      '11': {
        _id: '11',
        title: 'React Native Mobile Apps',
        description: 'Build cross-platform mobile apps with React Native.',
        difficulty: 'intermediate',
        category: 'mobile-development',
        estimatedDuration: 320,
        content: {
          videoUrl: 'https://www.youtube.com/embed/0-S5a0eXPoc',
          textContent: 'Create iOS and Android apps using React Native, navigation, and native modules for cross-platform development.'
        }
      },
      '12': {
        _id: '12',
        title: 'Flutter Development Course',
        description: 'Build beautiful mobile apps with Flutter and Dart.',
        difficulty: 'intermediate',
        category: 'mobile-development',
        estimatedDuration: 300,
        content: {
          videoUrl: 'https://www.youtube.com/embed/VPvVD8t02U8',
          textContent: 'Learn Dart language, Flutter widgets, state management, and app deployment.'
        }
      },
      '13': {
        _id: '13',
        title: 'iOS Development with Swift',
        description: 'Native iOS app development using Swift.',
        difficulty: 'advanced',
        category: 'mobile-development',
        estimatedDuration: 350,
        content: {
          videoUrl: 'https://www.youtube.com/embed/09TeUXjzpKs',
          textContent: 'Master Swift programming, UIKit, SwiftUI, and iOS app architecture patterns.'
        }
      },
      '14': {
        _id: '14',
        title: 'Android Development with Kotlin',
        description: 'Build native Android apps with Kotlin.',
        difficulty: 'intermediate',
        category: 'mobile-development',
        estimatedDuration: 280,
        content: {
          videoUrl: 'https://www.youtube.com/embed/F9UC9DY-vIU',
          textContent: 'Learn Kotlin programming, Android SDK, and modern Android development practices.'
        }
      },
      
      // Data Science
      '15': {
        _id: '15',
        title: 'Python for Data Science',
        description: 'Data analysis and visualization with Python libraries.',
        difficulty: 'intermediate',
        category: 'data-science',
        estimatedDuration: 280,
        content: {
          videoUrl: 'https://www.youtube.com/embed/LHBE6Q9XlzI',
          textContent: 'Learn pandas, numpy, matplotlib, and data manipulation techniques for data science and analytics.'
        }
      },
      '16': {
        _id: '16',
        title: 'SQL Database Complete Course',
        description: 'Complete guide to SQL and database management.',
        difficulty: 'beginner',
        category: 'data-science',
        estimatedDuration: 200,
        content: {
          videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
          textContent: 'Master SQL queries, joins, indexes, and database design principles.'
        }
      },
      '17': {
        _id: '17',
        title: 'R Programming for Data Analysis',
        description: 'Statistical computing and graphics with R.',
        difficulty: 'intermediate',
        category: 'data-science',
        estimatedDuration: 250,
        content: {
          videoUrl: 'https://www.youtube.com/embed/_V8eKsto3Ug',
          textContent: 'Learn R programming, statistical analysis, and data visualization with ggplot2.'
        }
      },
      '18': {
        _id: '18',
        title: 'Data Visualization with Tableau',
        description: 'Create stunning data visualizations and dashboards.',
        difficulty: 'beginner',
        category: 'data-science',
        estimatedDuration: 180,
        content: {
          videoUrl: 'https://www.youtube.com/embed/TPMlZxRRaBQ',
          textContent: 'Master Tableau for creating interactive dashboards and data storytelling.'
        }
      },
      
      // AI & Machine Learning
      '19': {
        _id: '19',
        title: 'Machine Learning with Python',
        description: 'Introduction to machine learning algorithms and implementation.',
        difficulty: 'advanced',
        category: 'ai-ml',
        estimatedDuration: 400,
        content: {
          videoUrl: 'https://www.youtube.com/embed/7eh4d6sabA0',
          textContent: 'Learn supervised and unsupervised learning, scikit-learn, model evaluation, and machine learning best practices.'
        }
      },
      '20': {
        _id: '20',
        title: 'Deep Learning with TensorFlow',
        description: 'Neural networks and deep learning concepts.',
        difficulty: 'expert',
        category: 'ai-ml',
        estimatedDuration: 450,
        content: {
          videoUrl: 'https://www.youtube.com/embed/tPYj3fFJGjk',
          textContent: 'Master neural networks, backpropagation, CNNs, RNNs, and TensorFlow.'
        }
      },
      '21': {
        _id: '21',
        title: 'Natural Language Processing',
        description: 'Text processing and language understanding.',
        difficulty: 'advanced',
        category: 'ai-ml',
        estimatedDuration: 350,
        content: {
          videoUrl: 'https://www.youtube.com/embed/fNxaJsNG3-s',
          textContent: 'Learn text preprocessing, sentiment analysis, and transformer models.'
        }
      },
      '22': {
        _id: '22',
        title: 'Computer Vision with OpenCV',
        description: 'Image processing and computer vision techniques.',
        difficulty: 'advanced',
        category: 'ai-ml',
        estimatedDuration: 320,
        content: {
          videoUrl: 'https://www.youtube.com/embed/oXlwWbU8l2o',
          textContent: 'Learn image processing, object detection, and computer vision applications.'
        }
      }
    };
    
    const course = courses[courseId];
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ ...course, userProgress: null });
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