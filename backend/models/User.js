// backend/models/User.js
// Mengimport mongoose untuk membuat model
const { Schema, model } = require('mongoose');

// Mendefinisikan schema untuk model User
const userSchema = new Schema({
    firstName: { type: String, required: true }, // Nama awal pengguna
    lastName: { type: String, required: true }, // Nama akhir pengguna
    email: { 
        type: String, // Kolom email bertipe string
        required: true, // Kolom email harus diisi
        unique: true, // Kolom email harus unik
        match: /.+\@.+\..+/ // Kolom email harus memiliki format email
    }, // 
    password: { type: String, required: true }, // Password akun
});

// Membuat model User berdasarkan schema
const User = model('User', userSchema); 

module.exports = User; // Ekspor model User