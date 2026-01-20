const express = require('express');
const { Community } = require('../models');
const auth = require('../middleware/auth');
const router = express.Router();

// Get discussions
router.get('/discussions', async (req, res) => {
  try {
    const { type, course, search } = req.query;
    let query = {};

    if (type) query.type = type;
    if (course) query.course = course;
    if (search) query.title = { $regex: search, $options: 'i' };

    const discussions = await Community.find(query)
      .populate('author', 'profile.firstName profile.lastName')
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create discussion
router.post('/discussions', auth, async (req, res) => {
  try {
    const discussion = new Community({
      ...req.body,
      author: req.user.userId
    });

    await discussion.save();
    await discussion.populate('author', 'profile.firstName profile.lastName');
    
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add reply
router.post('/discussions/:id/reply', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const discussion = await Community.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    discussion.replies.push({
      author: req.user.userId,
      content,
      createdAt: new Date()
    });

    await discussion.save();
    await discussion.populate('replies.author', 'profile.firstName profile.lastName');
    
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like discussion
router.post('/discussions/:id/like', auth, async (req, res) => {
  try {
    const discussion = await Community.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    const userId = req.user.userId;
    const likeIndex = discussion.likes.indexOf(userId);

    if (likeIndex > -1) {
      discussion.likes.splice(likeIndex, 1);
    } else {
      discussion.likes.push(userId);
    }

    await discussion.save();
    res.json({ likes: discussion.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;