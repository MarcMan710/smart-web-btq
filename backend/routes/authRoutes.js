// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// POST /api/auth/register
// Register a new user
router.post('/register', registerUser);

// POST /api/auth/login
// Authenticate user and return token
router.post('/login', loginUser);

// Tambahkan rute dashboard
router.get('/dashboard', protect, (req, res) => {
    res.json({ message: 'Welcome to the dashboard' });
});

module.exports = router;

module.exports = router;