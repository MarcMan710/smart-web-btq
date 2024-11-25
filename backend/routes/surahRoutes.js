// backend/routes/surahRoutes.js
// Mengimport modul yang diperlukan
const express = require('express');
const router = express.Router();
const { getAllSurah } = require('../controllers/surahController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/surah - Rute untuk mendapatkan semua surah
router.get('/', protect, getAllSurah);

// Ekspor router
module.exports = router;