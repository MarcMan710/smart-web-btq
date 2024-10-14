// Importing required modules
const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling
const User = require('./User'); // Assuming User model is in the same directory

// Example async function to find a user by email
async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
}

// Defining the schema for the 'Hafalan' model
const hafalanSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the hafalan
    content: { type: String, required: true }, // Content of the hafalan
    levelRequired: { type: Number, required: true }, // Level required to access the hafalan
    description: { type: String, required: true } // Description of the hafalan
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields
});

// Creating the 'Hafalan' model based on the schema
const Hafalan = mongoose.model('Hafalan', hafalanSchema);

module.exports = Hafalan; // Exporting the 'Hafalan' model for external usecd