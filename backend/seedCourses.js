const mongoose = require('mongoose');
const { Course } = require('./src/models');
require('dotenv').config();

const courses = [
  // Programming Languages
  {
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming language',
    difficulty: 'beginner',
    category: 'programming',
    estimatedDuration: 180,
    content: {
      textContent: 'Learn JavaScript from scratch including variables, functions, objects, and DOM manipulation.',
      codeExamples: ['console.log("Hello World");', 'function greet(name) { return "Hello " + name; }']
    },
    tags: ['javascript', 'programming', 'web'],
    isPublished: true
  },
  {
    title: 'Python for Beginners',
    description: 'Complete introduction to Python programming',
    difficulty: 'beginner',
    category: 'programming',
    estimatedDuration: 200,
    content: {
      textContent: 'Learn Python syntax, data structures, functions, and object-oriented programming.',
      codeExamples: ['print("Hello World")', 'def greet(name):\n    return f"Hello {name}"']
    },
    tags: ['python', 'programming', 'beginner'],
    isPublished: true
  },
  {
    title: 'Java Programming Essentials',
    description: 'Learn Java programming from basics to advanced concepts',
    difficulty: 'intermediate',
    category: 'programming',
    estimatedDuration: 240,
    content: {
      textContent: 'Master Java programming including OOP, collections, exception handling, and multithreading.',
      codeExamples: ['public class Hello {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}']
    },
    tags: ['java', 'programming', 'oop'],
    isPublished: true
  },
  {
    title: 'C++ Advanced Programming',
    description: 'Advanced C++ concepts and system programming',
    difficulty: 'advanced',
    category: 'programming',
    estimatedDuration: 300,
    content: {
      textContent: 'Advanced C++ topics including templates, STL, memory management, and performance optimization.',
      codeExamples: ['#include <iostream>\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}']
    },
    tags: ['cpp', 'programming', 'system'],
    isPublished: true
  },

  // Web Development
  {
    title: 'React.js Complete Guide',
    description: 'Build modern web applications with React',
    difficulty: 'intermediate',
    category: 'web-development',
    estimatedDuration: 280,
    content: {
      textContent: 'Learn React components, hooks, state management, and building full-stack applications.',
      codeExamples: ['function App() {\n  return <h1>Hello React!</h1>;\n}']
    },
    tags: ['react', 'javascript', 'frontend'],
    isPublished: true
  },
  {
    title: 'Node.js Backend Development',
    description: 'Server-side development with Node.js and Express',
    difficulty: 'intermediate',
    category: 'web-development',
    estimatedDuration: 250,
    content: {
      textContent: 'Build REST APIs, handle databases, authentication, and deploy Node.js applications.',
      codeExamples: ['const express = require("express");\nconst app = express();\napp.get("/", (req, res) => res.send("Hello World"));']
    },
    tags: ['nodejs', 'backend', 'api'],
    isPublished: true
  },
  {
    title: 'HTML & CSS Mastery',
    description: 'Complete guide to modern HTML and CSS',
    difficulty: 'beginner',
    category: 'web-development',
    estimatedDuration: 150,
    content: {
      textContent: 'Learn semantic HTML, CSS Grid, Flexbox, responsive design, and modern CSS features.',
      codeExamples: ['<div class="container">\n  <h1>Hello World</h1>\n</div>']
    },
    tags: ['html', 'css', 'frontend'],
    isPublished: true
  },
  {
    title: 'Vue.js Framework',
    description: 'Progressive JavaScript framework for building UIs',
    difficulty: 'intermediate',
    category: 'web-development',
    estimatedDuration: 220,
    content: {
      textContent: 'Learn Vue.js components, directives, Vuex state management, and Vue Router.',
      codeExamples: ['<template>\n  <div>{{ message }}</div>\n</template>']
    },
    tags: ['vuejs', 'javascript', 'frontend'],
    isPublished: true
  },

  // Mobile Development
  {
    title: 'React Native Mobile Apps',
    description: 'Build cross-platform mobile apps with React Native',
    difficulty: 'intermediate',
    category: 'mobile-development',
    estimatedDuration: 320,
    content: {
      textContent: 'Create iOS and Android apps using React Native, navigation, and native modules.',
      codeExamples: ['import { View, Text } from "react-native";\nexport default function App() {\n  return <View><Text>Hello Mobile!</Text></View>;\n}']
    },
    tags: ['react-native', 'mobile', 'cross-platform'],
    isPublished: true
  },
  {
    title: 'Flutter Development',
    description: 'Build beautiful mobile apps with Flutter and Dart',
    difficulty: 'intermediate',
    category: 'mobile-development',
    estimatedDuration: 300,
    content: {
      textContent: 'Learn Dart language, Flutter widgets, state management, and app deployment.',
      codeExamples: ['class MyApp extends StatelessWidget {\n  Widget build(BuildContext context) {\n    return MaterialApp(home: Text("Hello Flutter"));\n  }\n}']
    },
    tags: ['flutter', 'dart', 'mobile'],
    isPublished: true
  },
  {
    title: 'iOS Development with Swift',
    description: 'Native iOS app development using Swift',
    difficulty: 'advanced',
    category: 'mobile-development',
    estimatedDuration: 350,
    content: {
      textContent: 'Master Swift programming, UIKit, SwiftUI, and iOS app architecture patterns.',
      codeExamples: ['import UIKit\nclass ViewController: UIViewController {\n    override func viewDidLoad() {\n        super.viewDidLoad()\n    }\n}']
    },
    tags: ['swift', 'ios', 'mobile'],
    isPublished: true
  },

  // Data Science
  {
    title: 'Python for Data Science',
    description: 'Data analysis and visualization with Python',
    difficulty: 'intermediate',
    category: 'data-science',
    estimatedDuration: 280,
    content: {
      textContent: 'Learn pandas, numpy, matplotlib, and data manipulation techniques.',
      codeExamples: ['import pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.head())']
    },
    tags: ['python', 'data-science', 'pandas'],
    isPublished: true
  },
  {
    title: 'SQL Database Mastery',
    description: 'Complete guide to SQL and database management',
    difficulty: 'beginner',
    category: 'data-science',
    estimatedDuration: 200,
    content: {
      textContent: 'Master SQL queries, joins, indexes, and database design principles.',
      codeExamples: ['SELECT * FROM users WHERE age > 18;', 'CREATE TABLE products (id INT PRIMARY KEY, name VARCHAR(100));']
    },
    tags: ['sql', 'database', 'data'],
    isPublished: true
  },
  {
    title: 'R Programming for Statistics',
    description: 'Statistical computing and graphics with R',
    difficulty: 'intermediate',
    category: 'data-science',
    estimatedDuration: 250,
    content: {
      textContent: 'Learn R programming, statistical analysis, and data visualization with ggplot2.',
      codeExamples: ['data <- c(1, 2, 3, 4, 5)\nmean(data)', 'library(ggplot2)\nggplot(data, aes(x, y)) + geom_point()']
    },
    tags: ['r', 'statistics', 'data-science'],
    isPublished: true
  },

  // AI & Machine Learning
  {
    title: 'Machine Learning with Python',
    description: 'Introduction to machine learning algorithms',
    difficulty: 'advanced',
    category: 'ai-ml',
    estimatedDuration: 400,
    content: {
      textContent: 'Learn supervised and unsupervised learning, scikit-learn, and model evaluation.',
      codeExamples: ['from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)']
    },
    tags: ['machine-learning', 'python', 'ai'],
    isPublished: true
  },
  {
    title: 'Deep Learning Fundamentals',
    description: 'Neural networks and deep learning concepts',
    difficulty: 'expert',
    category: 'ai-ml',
    estimatedDuration: 450,
    content: {
      textContent: 'Master neural networks, backpropagation, CNNs, RNNs, and TensorFlow.',
      codeExamples: ['import tensorflow as tf\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(128, activation="relu"),\n    tf.keras.layers.Dense(10, activation="softmax")\n])']
    },
    tags: ['deep-learning', 'tensorflow', 'neural-networks'],
    isPublished: true
  },
  {
    title: 'Natural Language Processing',
    description: 'Text processing and language understanding',
    difficulty: 'advanced',
    category: 'ai-ml',
    estimatedDuration: 350,
    content: {
      textContent: 'Learn text preprocessing, sentiment analysis, and transformer models.',
      codeExamples: ['import nltk\nfrom nltk.sentiment import SentimentIntensityAnalyzer\nsia = SentimentIntensityAnalyzer()']
    },
    tags: ['nlp', 'python', 'text-processing'],
    isPublished: true
  }
];

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ailern');
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');
    
    // Insert new courses
    await Course.insertMany(courses);
    console.log(`Seeded ${courses.length} courses successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();