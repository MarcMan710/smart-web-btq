// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { handleError } = require('../middleware/errorMiddleware');

// Helper function to handle server errors
const handleServerError = (res, err) => {
    console.error(err.message);
    res.status(500).send('Server Error');
};

// Function to get the user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        handleServerError(res, err);
    }
};

// Function to update user profile
exports.updateUserProfile = async (req, res) => {
    const { firstName, lastName, password } = req.body; // Ensure password is destructured if used

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
        });
    } catch (err) {
        handleError(res, err);
    }
};

// Function to handle user logout
exports.logoutUser = (req, res) => {
    req.user = null; // Clear the user from the request object
    res.json({ message: 'User logged out successfully' });
};