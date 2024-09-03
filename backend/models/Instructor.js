// backend/models/Instructor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specialty: String,
    experience: Number, // Number of years of experience
    feedbackGiven: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        feedback: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
