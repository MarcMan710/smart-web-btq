// backend/models/Hafalan.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    timestamps: true
});

const Hafalan = mongoose.model('Hafalan', hafalanSchema);

module.exports = Hafalan;