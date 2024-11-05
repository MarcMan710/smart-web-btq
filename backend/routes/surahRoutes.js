// backend/routes/surahRoutes.js
// Importing required modules
const express = require('express');
const router = express.Router();

// Importing controllers
const {
    getAllSurah,
    getSurahDetails,
    createOrUpdateSurah,
    deleteSurah
} = require('../controllers/surahController');

// Importing middleware
const { protect } = require('../middleware/authMiddleware');

// Route to get all surah
// GET /api/surah
router.get('/', protect, getAllSurah);

// Route to get details of a specific surah
// GET /api/surah/:id
router.get('/:id', protect, getSurahDetails);

// Route to create or update a surah 
// POST /api/surah
router.post('/', protect, createOrUpdateSurah);

// Route to delete a specific surah
// DELETE /api/surah/:id
router.delete('/:id', protect, deleteSurah);

module.exports = router;