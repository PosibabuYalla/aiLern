const express = require('express');
const { Progress, Course } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user progress
router.get('/user', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.userId })
      .populate('course', 'title difficulty estimatedDuration')
      .sort({ lastAccessed: -1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update course progress
router.post('/course/:courseId', auth, async (req, res) => {
  try {
    const { completionPercentage, timeSpent, status } = req.body;
    
    let progress = await Progress.findOne({
      user: req.user.userId,
      course: req.params.courseId
    });

    if (!progress) {
      progress = new Progress({
        user: req.user.userId,
        course: req.params.courseId,
        status: 'in-progress'
      });
    }

    if (completionPercentage !== undefined) progress.completionPercentage = completionPercentage;
    if (timeSpent !== undefined) progress.timeSpent += timeSpent;
    if (status) progress.status = status;
    progress.lastAccessed = new Date();

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get recent activity
router.get('/recent', auth, async (req, res) => {
  try {
    const recentProgress = await Progress.find({ user: req.user.userId })
      .populate('course', 'title')
      .sort({ lastAccessed: -1 })
      .limit(5);

    const activities = recentProgress.map(p => ({
      title: `Studied ${p.course.title}`,
      timestamp: p.lastAccessed,
      type: 'course_progress'
    }));

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;