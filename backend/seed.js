const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User, Course, Assessment } = require('./src/models');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/deepu-ai-course');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Assessment.deleteMany({});

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 12);
    const users = await User.create([
      {
        email: 'admin@deepu.ai',
        password: hashedPassword,
        profile: { firstName: 'Admin', lastName: 'User', language: 'en' },
        skillLevel: 'expert'
      },
      {
        email: 'student@deepu.ai',
        password: hashedPassword,
        profile: { firstName: 'John', lastName: 'Doe', language: 'en' },
        skillLevel: 'beginner'
      }
    ]);

    // Create sample courses
    const courses = await Course.create([
      {
        title: 'Introduction to AI',
        description: 'Learn the fundamentals of Artificial Intelligence',
        difficulty: 'beginner',
        category: 'AI Basics',
        estimatedDuration: 120,
        content: {
          textContent: 'This course covers the basic concepts of AI...',
          videoUrl: 'https://example.com/video1.mp4'
        },
        isPublished: true,
        author: users[0]._id
      },
      {
        title: 'Python for AI',
        description: 'Master Python programming for AI applications',
        difficulty: 'beginner',
        category: 'Programming',
        estimatedDuration: 180,
        content: {
          textContent: 'Learn Python programming specifically for AI...',
          videoUrl: 'https://example.com/video2.mp4'
        },
        isPublished: true,
        author: users[0]._id
      },
      {
        title: 'Machine Learning Fundamentals',
        description: 'Deep dive into machine learning concepts',
        difficulty: 'intermediate',
        category: 'Machine Learning',
        estimatedDuration: 240,
        content: {
          textContent: 'Comprehensive guide to machine learning...',
          videoUrl: 'https://example.com/video3.mp4'
        },
        isPublished: true,
        author: users[0]._id
      }
    ]);

    // Create diagnostic assessment
    await Assessment.create({
      title: 'AI Skills Diagnostic Test',
      type: 'diagnostic',
      timeLimit: 30,
      questions: [
        {
          question: 'What is Machine Learning?',
          type: 'multiple-choice',
          options: [
            'A subset of AI that learns from data',
            'A programming language',
            'A database system',
            'A web framework'
          ],
          correctAnswer: 'A subset of AI that learns from data',
          points: 10,
          category: 'aiBasics'
        },
        {
          question: 'Which programming language is most commonly used for AI?',
          type: 'multiple-choice',
          options: ['Java', 'Python', 'C++', 'JavaScript'],
          correctAnswer: 'Python',
          points: 10,
          category: 'python'
        },
        {
          question: 'What is the purpose of a neural network?',
          type: 'multiple-choice',
          options: [
            'To store data',
            'To mimic human brain processing',
            'To create websites',
            'To manage databases'
          ],
          correctAnswer: 'To mimic human brain processing',
          points: 15,
          category: 'machineLearning'
        },
        {
          question: 'What is supervised learning?',
          type: 'multiple-choice',
          options: [
            'Learning without labeled data',
            'Learning with labeled training data',
            'Learning through trial and error',
            'Learning from user feedback'
          ],
          correctAnswer: 'Learning with labeled training data',
          points: 15,
          category: 'machineLearning'
        }
      ]
    });

    console.log('✅ Database seeded successfully!');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${courses.length} courses`);
    console.log('Created diagnostic assessment');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();