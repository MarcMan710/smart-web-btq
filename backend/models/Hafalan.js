// backend/models/Hafalan.js
// Importing required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the schema for the 'Hafalan' model
const hafalanSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    levelRequired: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields
});

// Creating the 'Hafalan' model based on the schema
const Hafalan = mongoose.model('Hafalan', hafalanSchema);

module.exports = Hafalan;