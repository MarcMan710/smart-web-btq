// backend/controllers/authController.js
// Mengimpor modul yang diperlukan
const User = require('../models/User');
const { hashPassword } = require('../utils/authUtils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Fungsi untuk mendaftarkan pengguna
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body; // Mengambil data dari request body
    // Memeriksa apakah kata sandi dan konfirmasi kata sandi cocok
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' }); // Pesan error jika kata sandi tidak cocok
    }
    try { // Memeriksa apakah email sudah terdaftar
        const [existingUser] = await Promise.all([ // Menggunakan Promise.all untuk menunggu semua operasi selesai
            User.findOne({ email }) 
        ]);

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' }); // Pesan error jika email sudah terdaftar
        }
        // Mengenkripsi password
        const hashedPassword = await hashPassword(password); 
        // Membuat objek pengguna baru dengan data yang diberikan
        const user = new User({ 
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        // Menyimpan pengguna ke database
        const savedUser = await user.save();
        // Mengirimkan informasi pengguna yang baru didaftarkan dan token ke klien
        res.status(201).json({
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email
        });
    } catch (error) { // Menangani kesalahan ketika terjadi error dalam proses mendaftarkan pengguna
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fungsi untuk melakukan login
const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body; // Mengambil data dari request body

    try {
        const user = await User.findOne({ email }); // Mencari pengguna berdasarkan email
        // Memeriksa apakah pengguna ditemukan
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' }); // Pesan error jika pengguna tidak ditemukan
        }
        // Memeriksa apakah kata sandi cocok
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' }); // Pesan error jika kata sandi tidak cocok
        }
        // Membuat token JWT
        const payload = {
            id: user.id,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: rememberMe ? '7d' : '1h' // Token berlaku selama 7 hari jika rememberMe true, selain itu 1 jam
        });
        // Mengirimkan token ke klien
        console.log('Generated Token:', token);
        res.status(200).json({ token });
    } catch (error) { // Menangani kesalahan ketika terjadi error dalam proses login
        console.error('Error logging in user:', error);
        res.status(500).send('Server Error');
    }
};

// Ekspor fungsi registerUser dan loginUser
module.exports = {
    registerUser,
    loginUser
};