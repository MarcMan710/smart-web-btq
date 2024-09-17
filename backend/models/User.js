// backend/models/User.js
// Importing required modules
const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling
const crypto = require('crypto'); // Importing crypto for cryptographic functionality

// Defining the schema for the 'User' model
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // First name of the user
    lastName: { type: String, required: true }, // Last name of the user
    username: { type: String, required: true, unique: true }, // Unique username for the user
    email: { type: String, required: true, unique: true }, // Unique email address of the user
    password: { type: String, required: true }, // Password of the user
    role: { type: String, default: 'student' }, // Role of the user with default as 'student'
    level: { type: Number, default: 1 }, // Level of the user with default as 1
    confirmationToken: { type: String, default: () => crypto.randomBytes(20).toString('hex') }, // Confirmation token generated using crypto
    isConfirmed: { type: Boolean, default: false } // Flag to indicate if the user is confirmed
});

// Creating the 'User' model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Exporting the 'User' model for external use