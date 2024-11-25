// Mengimport mongoose
const mongoose = require('mongoose');

// Mendefinisikan schema untuk model Recording
const RecordingSchema = new mongoose.Schema({
    userId: { // Relasi ke model User
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    audioUrl: { // URL audio
        type: String,
        required: true
    },
    score: Number, // Skor hafalan
    passed: Boolean, // Status hafalan
    recordedAt: { // Waktu dilakukan rekaman
        type: Date,
        default: Date.now // Menyimpan waktu saat ini
    }
});

// Membuat model Recording berdasarkan schema
module.exports = mongoose.model('Recording', RecordingSchema);