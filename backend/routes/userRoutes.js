const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getUserProgress, logoutUser } = require('../controllers/userController');
const { protect, logout } = require('../middleware/authMiddleware');

// GET /api/users/profile
// Get the logged-in user's profile
router.get('/profile', protect, getUserProfile);

// PUT /api/users/profile
// Update the logged-in user's profile
router.put('/profile', protect, updateUserProfile);

// GET /api/users/progress
// Get the logged-in user's progress
router.get('/progress', protect, getUserProgress);

// GET /api/users/logout
// Logout the user and redirect to login
router.get('/logout', logout, logoutUser);

module.exports = router;