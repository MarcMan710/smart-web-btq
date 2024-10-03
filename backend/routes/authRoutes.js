// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect, instructor } = require('../middleware/authMiddleware');

// POST /api/auth/register
// Route to handle user registration
router.post('/register', registerUser);

// POST /api/auth/login
// Route to handle user login authentication and token generation
router.post('/login', loginUser);

// GET /api/auth/dashboard
// Add a dashboard route that requires authentication
router.get('/dashboard', protect, (req, res) => {
    res.json({ message: 'Welcome to the Smart Web BTQ!' });
});

module.exports = router;
