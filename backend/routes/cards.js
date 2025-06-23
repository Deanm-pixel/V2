const express = require('express');
const Card = require('../models/Card');
const { verifyRole } = require('../middleware/auth');

const router = express.Router();

// Karte erstellen
router.post('/', async (req, res) => {
  const { title, content, tags, expiresAt } = req.body;
  const createdBy = req.user.id;
  try {
    const card = new Card({ title, content, tags, createdBy, expiresAt });
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Card creation failed', error: err });
  }
});

// Alle Karten abrufen
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find().populate('createdBy', 'username');
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Fetching cards failed', error: err });
  }
});

// Karte aktualisieren
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, expiresAt } = req.body;
  try {
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    if (card.createdBy.toString() !== req.user.id && req.user.role === 'User') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    card.title = title;
    card.content = content;
    card.tags = tags;
    card.expiresAt = expiresAt;
    await card.save();

    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err });
  }
});

// Karte löschen
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    if (card.createdBy.toString() !== req.user.id && req.user.role === 'User') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await card.deleteOne();
    res.status(200).json({ message: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err });
  }
});

module.exports = router;
