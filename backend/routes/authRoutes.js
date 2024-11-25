// Mengimport modul yang diperlukan
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

// Inisialisasi Express Router
const router = express.Router();

// POST /api/auth/register - Rute untuk registrasi pengguna
router.post('/register', registerUser);

// POST /api/auth/login - Rute untuk login pengguna
router.post('/login', loginUser);

// Ekspor router
module.exports = router;