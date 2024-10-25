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
    // Remove hafalanId field
    initialScore: Number,
    wer: Number,
    finalScore: Number,
    passed: Boolean
});

module.exports = mongoose.model('Recording', RecordingSchema);