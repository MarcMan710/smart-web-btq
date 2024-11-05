// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Destructure methods from userController and authMiddleware for clarity
const { getUserProfile, updateUserProfile, logoutUser } = userController;
const { protect, logout } = authMiddleware;

// Define routes with appropriate HTTP methods and middleware
router.route('/profile')
    .get(protect, getUserProfile) // GET /api/users/profile
    .put(protect, updateUserProfile); // PUT /api/users/profile

router.get('/logout', logout, logoutUser); // GET /api/users/logout

module.exports = router;