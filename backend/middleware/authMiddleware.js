// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/keys');

// Middleware function to protect routes by verifying JWT token
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Middleware function to logout user
const logout = (req, res, next) => {
    req.user = null;
    next();
};

module.exports = {
    protect,
    logout
};