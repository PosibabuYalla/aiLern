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
    let query = { isPublished: true };

    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get course by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Get user progress for this course
    const progress = await Progress.findOne({
      user: req.user.userId,
      course: req.params.id
    });

    res.json({ ...course.toObject(), userProgress: progress });
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