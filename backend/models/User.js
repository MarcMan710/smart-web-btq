// backend/models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'instructor'],
        default: 'student'  
    },
    level: {
        type: Number,
        default: 1
    },
    progress: [{
        recordingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recording'
        },
        score: Number,
        feedback: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;