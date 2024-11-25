// backend/routes/userRoutes.js
// Mengimport modul yang diperlukan
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = userController;
const { protect } = authMiddleware;

// Rute untuk menangani profil pengguna
router.route('/profile')
    .get(protect, getUserProfile) // GET /api/users/profile - Rute untuk mendapatkan profil pengguna
    .put(protect, updateUserProfile); // PUT /api/users/profile - Rute untuk memperbarui profil pengguna

// Ekspor router
module.exports = router;

