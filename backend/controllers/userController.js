// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserProgress = async (req, res) => {
    try {
        const progress = await Progress.find({ user: req.user.id });
        res.json(progress);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;

            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }

            const updatedUser = await user.save();
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

// backend/controllers/userController.js
exports.logoutUser = (req, res) => {
    res.json({ message: 'User logged out successfully' });
}