// Import necessary modules
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Initialize the router
const router = express.Router();

// Route to handle user registration
// POST /api/auth/register
router.post('/register', registerUser);

// Route to handle user login authentication and token generation
// POST /api/auth/login
router.post('/login', loginUser);

// Route to access the dashboard, requires authentication
// GET /api/auth/dashboard
router.get('/dashboard', protect, (req, res) => {
    res.json({ message: 'Welcome to the Smart Web BTQ!' });
});

// Export the router
module.exports = router;