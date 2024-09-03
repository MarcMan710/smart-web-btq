// backend/controllers/authController.js
const User = require('../models/User');
const { hashPassword, generateToken } = require('../utils/auth');

const registerUser = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

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
            role: 'student',  // Ubah dari 'user' menjadi 'student'
            level: 1
        });

        await user.save();

        const token = generateToken(user);

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

// backend/controllers/authController.js 
const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        // Cek apakah user ada
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Buat token
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: rememberMe ? '7d' : '1h' // Token akan bertahan lebih lama jika Remember Me diaktifkan
        });

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