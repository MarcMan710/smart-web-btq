// backend/routes/hafalanRoutes.js
// Importing required modules and controllers
const express = require('express');
const router = express.Router();
const { getAllHafalan, getHafalanDetails, createOrUpdateHafalan, deleteHafalan } = require('../controllers/hafalanController');
const { protect, instructor } = require('../middleware/authMiddleware');

// GET /api/hafalan
// Get all hafalan
router.get('/', protect, getAllHafalan);

// GET /api/hafalan/:id
// Get details of a specific hafalan
router.get('/:id', protect, getHafalanDetails);

// POST /api/hafalan
// Create or update a hafalan (instructor only)
router.post('/', protect, instructor, createOrUpdateHafalan);

// DELETE /api/hafalan/:id
// Delete a specific hafalan (instructor only)
router.delete('/:id', protect, instructor, deleteHafalan);

module.exports = router;