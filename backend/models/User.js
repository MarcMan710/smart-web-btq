// backend/models/User.js
// Importing required modules
const { Schema, model } = require('mongoose'); // Destructuring mongoose for cleaner code
const { randomBytes } = require('crypto'); // Destructuring crypto for cleaner code

// Defining the schema for the 'User' model
const userSchema = new Schema({
    // Personal Information
    firstName: { type: String, required: true }, // First name of the user
    lastName: { type: String, required: true }, // Last name of the user

    // Authentication Information
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /.+\@.+\..+/ // Basic email validation
    }, // Unique email address of the user
    password: { type: String, required: true }, // Password of the user

    // User Role and Progress
    level: { type: Number, default: 1 }, // Level of the user with default as 1
    completedModules: { type: Number, default: 0 }, // Number of completed modules
});

// Creating the 'User' model based on the schema
const User = model('User', userSchema);

module.exports = User; // Exporting the 'User' model for external use