// backend/controllers/authController.js
// Importing required modules and controllers
const User = require('../models/User'); // Importing the User model
const { hashPassword, generateToken } = require('../utils/auth'); // Importing hashPassword and generateToken functions from auth utils
const { sendConfirmationEmail } = require('../utils/emailService'); // Importing sendConfirmationEmail function from emailService utils

// Function to register a new user
const registerUser = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if email and username are already registered
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        if (existingUsername) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user instance
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            role: 'student',
            level: 1
        });

        // Save the user to the database
        await user.save();

        // Send confirmation email
        await sendConfirmationEmail(user);

        // Generate token for the user
        const token = generateToken(user);

        // Respond with user details and token
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
            level: user.level,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to authenticate user login
const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password validity
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        // Generate JWT token with expiration based on rememberMe option
        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: rememberMe ? '7d' : '1h' // Token will last longer if Remember Me is enabled
        });

        // Respond with the generated token
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    registerUser,
    loginUser 
};