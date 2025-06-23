const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  [String],
  createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  favorites:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  expiresAt:  { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
