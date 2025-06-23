const express = require('express');
const User = require('../models/User');
const { verifyRole } = require('../middleware/auth');

const router = express.Router();

// Get all users (Admin only)
router.get('/', verifyRole(['Admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Fetching users failed', error: err });
  }
});

// Update user role (Admin only)
router.put('/:id/role', verifyRole(['Admin']), async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Role update failed', error: err });
  }
});

module.exports = router;
