// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/keys');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('Token:', token);

            // Verify token
            const decoded = jwt.verify(token, config.jwtSecret);
            console.log('Decoded:', decoded);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            console.log('User:', req.user);

            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

const logout = (req, res, next) => {
    // Clear the token or perform any necessary logout operations
    req.user = null;
    next();
};

module.exports = {
    protect,
    admin,
    logout
};