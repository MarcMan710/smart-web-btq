// backend/middleware/authMiddleware.js
// Importing required modules and controllers
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for token verification
const User = require('../models/User'); // Importing the User model for user operations
const config = require('../config/keys'); // Importing configuration keys for token secret

// Middleware function to protect routes by verifying JWT token
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
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