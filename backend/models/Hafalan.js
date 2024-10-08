// backend/models/Hafalan.js
// Importing required modules
const mongoose = require('mongoose'); // Importing mongoose for MongoDB object modeling

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

module.exports = Hafalan; // Exporting the 'Hafalan' model for external use