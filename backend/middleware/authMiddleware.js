// backend/middleware/authMiddleware.js
// Importing required modules and controllers
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for token verification
const User = require('../models/User'); // Importing the User model for user operations
const config = require('../config/keys'); // Importing configuration keys for token secret

// Middleware function to protect routes by verifying JWT token
const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header with Bearer token exists
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

            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            console.error(err);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is found in the header
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware function to check if user is an Instructor
const instructor = (req, res, next) => {
    // Check if user exists and has instructor role
    if (req.user && req.user.role === 'instructor') {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Not authorized as an Instructor' });
    }
};

// Middleware function to logout user
const logout = (req, res, next) => {
    // Clear the token or perform any necessary logout operations
    req.user = null; // Clear the user from the request object
    next(); // Proceed to the next middleware or route handler
};

module.exports = {
    protect,
    instructor,
    logout
};