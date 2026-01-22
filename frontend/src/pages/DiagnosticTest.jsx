import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  LightBulbIcon 
} from '@heroicons/react/24/outline';
import api from '../utils/api';

const DiagnosticTest = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const categories = [
    { id: 'programming', name: 'Programming Languages', icon: '💻', description: 'JavaScript, Python, Java, C++' },
    { id: 'web-development', name: 'Web Development', icon: '🌐', description: 'HTML, CSS, React, Node.js' },
    { id: 'mobile-development', name: 'Mobile Development', icon: '📱', description: 'React Native, Flutter, iOS, Android' },
    { id: 'data-science', name: 'Data Science', icon: '📊', description: 'Python, SQL, R, Tableau' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: '🤖', description: 'ML, Deep Learning, NLP, Computer Vision' }
  ];

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

  useEffect(() => {
    if (selectedCategory) {
      const questions = assessmentQuestions[selectedCategory] || [];
      const assessmentData = {
        _id: `${selectedCategory}-assessment`,
        title: `${selectedCategory.replace('-', ' ')} Assessment`,
        type: 'category',
        questions: questions.map(q => ({
          _id: q._id,
          question: q.question,
          type: q.type,
          options: q.options,
          points: q.points,
          category: q.category
        }))
      };
      setAssessment(assessmentData);
      setTimeLeft(questions.length * 60); // 1 minute per question
    }
  }, [selectedCategory]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && assessment) {
      handleSubmit();
    }
  }, [timeLeft, assessment]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Get correct answers for the selected category
    const correctAnswers = {
      'programming': ['All of the above', 'def myFunc():', 'class'],
      'web-development': ['Hyper Text Markup Language', 'useState', 'Server-side development'],
      'mobile-development': ['Swift', 'Both iOS and Android'],
      'data-science': ['All of the above', 'Structured Query Language'],
      'ai-ml': ['Decision Tree', 'Machine learning']
    };

    const categoryAnswers = correctAnswers[selectedCategory] || [];
    let correctCount = 0;
    const totalQuestions = categoryAnswers.length;
    const detailedResults = [];

    categoryAnswers.forEach((correctAnswer, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) correctCount++;
      
      detailedResults.push({
        questionIndex: index + 1,
        userAnswer: userAnswer || 'No answer',
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

    // Update user skill level if assessment result is higher
    const currentSkillLevel = user?.skillLevel || 'beginner';
    const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const currentIndex = skillLevels.indexOf(currentSkillLevel);
    const newIndex = skillLevels.indexOf(skillLevel);
    
    // Add to recent activity
    const newActivity = {
      id: Date.now(),
      title: `Completed ${selectedCategory.replace('-', ' ')} assessment (${percentage}%)`,
      timestamp: new Date(),
      type: 'assessment'
    };
    
    const currentActivity = user?.recentActivity || [];
    const updatedActivity = [newActivity, ...currentActivity].slice(0, 5);
    
    if (newIndex > currentIndex) {
      updateUser({ 
        skillLevel,
        recentActivity: updatedActivity
      });
      showToast(`Skill level upgraded to ${skillLevel}! 🎉`, 'success');
    } else {
      updateUser({ recentActivity: updatedActivity });
    }

    const results = {
      category: selectedCategory,
      totalScore,
      maxScore,
      correctCount,
      totalQuestions,
      percentage,
      skillLevel,
      detailedResults
    };
    
    setResults(results);
    setShowResults(true);
    setIsSubmitting(false);
    
    showToast('Assessment completed successfully!', 'success');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedCategory) {
    return <CategorySelection categories={categories} onSelect={setSelectedCategory} />;
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showResults) {
    return <ResultsView results={results} onContinue={() => navigate('/dashboard')} onReset={() => {
      setSelectedCategory(null);
      setAssessment(null);
      setCurrentQuestion(0);
      setAnswers({});
      setTimeLeft(0);
      setShowResults(false);
      setResults(null);
    }} />;
  }

  const question = assessment.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{categories.find(c => c.id === selectedCategory)?.name} Assessment</h1>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:text-blue-700 text-sm mt-1"
            >
              ← Back to Categories
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-orange-600">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {assessment.questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {question.category}
            </span>
            <span className="ml-2 text-sm text-gray-600">
              {question.points} points
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
        </div>

        {/* Answer Options */}
        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === option
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    answers[currentQuestion] === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === option && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          {currentQuestion === assessment.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !answers[currentQuestion]}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!answers[currentQuestion]}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CategorySelection = ({ categories, onSelect }) => (
  <div className="max-w-6xl mx-auto px-4 py-8">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Assessment Category</h1>
      <p className="text-xl text-gray-600">Select a technology area to test your knowledge</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(category => (
        <div
          key={category.id}
          onClick={() => onSelect(category.id)}
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-blue-500"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
            <p className="text-gray-600 mb-6">{category.description}</p>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Start Assessment
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ResultsView = ({ results, onContinue, onReset }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
      <div className="text-center mb-8">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
        <p className="text-gray-600 capitalize">{results.category.replace('-', ' ')} Assessment Results</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Score</h3>
          <p className="text-3xl font-bold text-blue-600">
            {results.totalScore}/{results.maxScore}
          </p>
          <p className="text-sm text-gray-600">{results.percentage}%</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Correct</h3>
          <p className="text-3xl font-bold text-green-600">
            {results.correctCount}/{results.totalQuestions}
          </p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <p className="text-2xl font-bold text-purple-600 capitalize">
            {results.skillLevel}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Detailed Results</h3>
        <div className="space-y-3">
          {results.detailedResults.map((result, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-medium">Question {result.questionIndex}</span>
                {result.isCorrect ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div className="mt-2 text-sm">
                <p><strong>Your Answer:</strong> {result.userAnswer}</p>
                <p><strong>Correct Answer:</strong> {result.correctAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium mr-4"
        >
          Back to Dashboard
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
        >
          Take Another Test
        </button>
      </div>
    </div>
  </div>
);

export default DiagnosticTest;