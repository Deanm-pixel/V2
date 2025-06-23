const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

// Create comment
router.post('/', async (req, res) => {
  const { text, cardId } = req.body;
  try {
    const comment = new Comment({ text, card: cardId, user: req.user.id });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Comment creation failed', error: err });
  }
});

// Get comments for a card
router.get('/:cardId', async (req, res) => {
  try {
    const comments = await Comment.find({ card: req.params.cardId }).populate('user', 'username');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Fetching comments failed', error: err });
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.user.toString() !== req.user.id && req.user.role === 'User') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err });
  }
});

module.exports = router;
