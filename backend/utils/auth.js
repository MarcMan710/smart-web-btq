// backend/utils/auth.js
// Importing required modules and configuration keys
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for token operations
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing and comparison
const config = require('../config/keys'); // Importing configuration keys for JWT secret

// Function to generate JWT token based on user information
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
        expiresIn: '1h' // Token expiration set to 1 hour
    });
};

// Function to hash a password using bcrypt
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generate salt with cost factor
    return await bcrypt.hash(password, salt); // Hash the password with the generated salt
};

// Function to compare an input password with a hashed password using bcrypt
const comparePassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword); // Compare input password with hashed password
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword
};