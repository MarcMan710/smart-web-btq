// backend/utils/authUtils.js
// Mengimport modul yang diperlukan
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Fungsi untuk membuat token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token berlaku selama 1 jam
    });
};

// Fungsi untuk mengenkripsi password menggunakan bcrypt
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Menentukan salt dengan ukuran 10 byte
    return await bcrypt.hash(password, salt); // Enkripsi password dengan salt
};

// Fungsi untuk membandingkan password yang diinput dengan password yang telah dienkripsi
const comparePassword = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword); // Mebandingkan password yang diinput dengan password yang telah dienkripsi
};

// Ekspor fungsi
module.exports = {
    generateToken,
    hashPassword,
    comparePassword
};