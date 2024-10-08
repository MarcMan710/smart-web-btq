// backend/controllers/authController.js
const User = require('../models/User');
const { hashPassword, generateToken } = require('../utils/authUtils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

// Function to register a new user
const registerUser = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const [existingUser, existingUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username })
        ]);

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            role: 'student',
            level: 1
        });

        const savedUser = await user.save();

        const token = generateToken(savedUser);

        res.status(201).json({
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            username: savedUser.username,
            email: savedUser.email,
            role: savedUser.role,
            level: savedUser.level,
            token
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to authenticate user login
const loginUser = async (req, res) => {
    const { emailOrUsername, password, rememberMe } = req.body;

    try {
        const user = await User.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: rememberMe ? '7d' : '1h'
        });

        console.log('Generated Token:', token);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    registerUser,
    loginUser
};