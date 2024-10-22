// backend/models/Recording.js
const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hafalanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hafalan',
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    initialScore: {
        type: Number,
        default: null
    },
    wer: {
        type: Number,
        default: null
    },
    finalScore: {
        type: Number,
        default: null
    },
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