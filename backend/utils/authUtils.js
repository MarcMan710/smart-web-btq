// backend/utils/authUtils.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config/keys');

/**
 * Generates a JWT token based on user information.
 * @param {Object} user - The user object containing user details.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: '1h'
    });
};

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

/**
 * Compares an input password with a hashed password using bcrypt.
 * @param {string} inputPassword - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - True if passwords match, otherwise false.
 */
const comparePassword = (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword
};