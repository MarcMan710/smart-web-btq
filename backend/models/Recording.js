const mongoose = require('mongoose');

const RecordingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    initialScore: Number,
    wer: Number,
    finalScore: Number,
    passed: Boolean,
    recordedAt: {
        type: Date,
        default: Date.now // Set default to current date and time
    }
});

module.exports = mongoose.model('Recording', RecordingSchema);