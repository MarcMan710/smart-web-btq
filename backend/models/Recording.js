// backend/models/Recording.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        default: Date.now
    }
}, {
    timestamps: true
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
