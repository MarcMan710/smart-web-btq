// Mengimport mongoose untuk membuat model
const mongoose = require('mongoose'); 

// Mendefinisikan schema untuk model Surah
const surahSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Judul surah
    surahNumber: { type: Number, required: true }, // Nomor surah
    description: { type: String, required: true } // Deskripsi surah
}, {
    timestamps: true // Menggunakan timestamps untuk membuat createdAt dan updatedAt
});
// Membuat model Surah berdasarkan schema
const Surah = mongoose.model('Surah', surahSchema); 

module.exports = Surah; // Ekspor model Surah