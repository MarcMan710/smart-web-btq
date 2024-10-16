// backend/routes/hafalanRoutes.js
// Importing required modules
const express = require('express');
const router = express.Router();

// Importing controllers
const {
    getAllHafalan,
    getHafalanDetails,
    createOrUpdateHafalan,
    deleteHafalan,
    addHafalan
} = require('../controllers/hafalanController');

// Importing middleware
const { protect } = require('../middleware/authMiddleware');

// Route to get all hafalan
// GET /api/hafalan
router.get('/', protect, getAllHafalan);

// Route to get details of a specific hafalan
// GET /api/hafalan/:id
router.get('/:id', protect, getHafalanDetails);

// Route to create or update a hafalan 
// POST /api/hafalan
router.post('/', protect, createOrUpdateHafalan);

// Route to delete a specific hafalan
// DELETE /api/hafalan/:id
router.delete('/:id', protect, deleteHafalan);

// POST request to add a new Hafalan
// POST /api/hafalan
router.post('/', addHafalan);

module.exports = router;