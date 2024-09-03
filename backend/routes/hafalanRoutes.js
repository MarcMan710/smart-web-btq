const express = require('express');
const router = express.Router();
const { getAllHafalan, getHafalanDetails, createOrUpdateHafalan } = require('../controllers/hafalanController');
const { protect, admin } = require('../middleware/authMiddleware');

// GET /api/hafalan
// Get all hafalan
router.get('/', protect, getAllHafalan);

// GET /api/hafalan/:id
// Get details of a specific hafalan
router.get('/:id', protect, getHafalanDetails);

// POST /api/hafalan
// Create or update a hafalan (admin only)
router.post('/', protect, admin, createOrUpdateHafalan);

module.exports = router;