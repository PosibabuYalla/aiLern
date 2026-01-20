const express = require('express');
const { Assessment, User, Progress } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get diagnostic assessment
router.get('/diagnostic', auth, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ type: 'diagnostic' });
    if (!assessment) {
      return res.status(404).json({ message: 'Diagnostic assessment not found' });
    }

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
      ...assessment.toObject(),
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

    const assessment = await Assessment.findOne({ type: 'diagnostic' });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Calculate scores by category
    const scores = {
      aiBasics: 0,
      python: 0,
      math: 0,
      machineLearning: 0
    };

    let totalScore = 0;
    let maxScore = 0;

    assessment.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      maxScore += question.points;

      if (userAnswer === question.correctAnswer) {
        const points = question.points;
        totalScore += points;
        scores[question.category] += points;
      }
    });

    // Determine skill level
    const percentage = (totalScore / maxScore) * 100;
    let skillLevel = 'beginner';
    if (percentage >= 80) skillLevel = 'expert';
    else if (percentage >= 65) skillLevel = 'advanced';
    else if (percentage >= 40) skillLevel = 'intermediate';

    // Update user profile
    await User.findByIdAndUpdate(userId, {
      skillLevel,
      assessmentScores: scores
    });

    // Generate personalized learning path
    const learningPath = await generateLearningPath(skillLevel, scores);

    res.json({
      totalScore,
      maxScore,
      percentage: Math.round(percentage),
      skillLevel,
      categoryScores: scores,
      learningPath
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