// backend/controllers/userController.js
// Importing required modules and controllers
const User = require('../models/User'); // Importing the User model
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing

// Function to get the user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Find the user by ID and exclude the password field
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Respond with the user profile
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to get user progress
exports.getUserProgress = async (req, res) => {
    try {
        // Find progress based on the user ID
        const progress = await Progress.find({ user: req.user.id });
        
        // Respond with the user's progress
        res.json(progress);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.user.id);

        if (user) {
            // Update user details if provided
            user.name = name || user.name;
            user.email = email || user.email;

            // Hash and update password if provided
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            // Save the updated user
            const updatedUser = await user.save();
            
            // Respond with the updated user details
            res.json({
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Function to handle user logout
exports.logoutUser = (req, res) => {
    // Respond with a message indicating successful logout
    res.json({ message: 'User logged out successfully' });
}