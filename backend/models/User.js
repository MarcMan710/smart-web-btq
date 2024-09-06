// backend/models/User.js
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    level: { type: Number, default: 1 },
    confirmationToken: { type: String, default: () => crypto.randomBytes(20).toString('hex') },
    isConfirmed: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;