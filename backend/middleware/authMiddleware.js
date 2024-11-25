// backend/middleware/authMiddleware.js
// Mengimpor modul yang diperlukan
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Fungsi Middleware untuk memastikan pengguna sudah login
const protect = async (req, res, next) => {
    // Memeriksa apakah header Authorization ada dan dimulai dengan 'Bearer'
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) { 
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    // Memeriksa apakah token valid
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Memverifikasi token
        const user = await User.findById(decoded.id).select('-password'); // Mengambil data pengguna
        if (!user) { // Pesan error jika pengguna tidak ditemukan
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        req.user = user; 
        next(); 
    } catch (error) { // Pesan error jika terjadi kesalahan dalam verifikasi token
        console.error('Token verification error:', error); 
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Ekspor fungsi protect
module.exports = {
    protect,
};

// // Middleware function to logout user
// const logout = (req, res, next) => {
//     req.user = null;
//     next();
// };