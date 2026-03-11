const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');

// GET all listings (public)
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single listing (public)
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('createdBy', 'username');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE listing (protected)
router.post('/', auth, async (req, res) => {
  const { title, location, imageUrl, description, price } = req.body;
  try {
    const listing = await Listing.create({
      title, location, imageUrl, description, price,
      createdBy: req.user.id
    });
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE listing (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    if (listing.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;