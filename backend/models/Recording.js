// backend/models/Recording.js
// Importing required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining the schema for the 'Recording' model
const recordingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    aiResult: {
        score: Number,
        corrections: [{
            originalText: String,
            correctedText: String
        }]
    },
    feedback: String,
    passed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now // Default date is the current date
    }
}, {
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields
});

// Creating the 'Recording' model based on the schema
const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;