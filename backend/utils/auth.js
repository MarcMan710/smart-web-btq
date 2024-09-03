// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/keys');

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
        expiresIn: '1h'
    });
};

// Hash Password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare Password
const comparePassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};


module.exports = {
    generateToken,
    hashPassword,
    comparePassword
};