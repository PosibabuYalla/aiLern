const express = require('express');
const { User, Progress, Course } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { profile, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { profile, preferences } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const [completedCourses, inProgressCourses, totalProgress] = await Promise.all([
      Progress.countDocuments({ user: userId, status: 'completed' }),
      Progress.countDocuments({ user: userId, status: 'in-progress' }),
      Progress.find({ user: userId })
    ]);

    const totalTimeSpent = totalProgress.reduce((sum, p) => sum + p.timeSpent, 0);
    const averageScore = totalProgress.length > 0 
      ? totalProgress.reduce((sum, p) => sum + p.completionPercentage, 0) / totalProgress.length 
      : 0;

    res.json({
      coursesCompleted: completedCourses,
      coursesInProgress: inProgressCourses,
      totalTimeSpent,
      averageScore: Math.round(averageScore)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;