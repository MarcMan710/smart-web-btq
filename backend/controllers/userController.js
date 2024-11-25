// backend/controllers/userController.js
// Mengimpor modul yang diperlukan
const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const { handleError } = require('../middleware/errorMiddleware');

// Fungsi untuk mendapatkan profil pengguna
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Mengambil data pengguna tanpa password
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Pesan error jika pengguna tidak ditemukan
        }
        res.json(user);
    } catch (err) { // Menangani kesalahan ketika terjadi error
        handleError(res, err);
    }
};

// Fungsi untuk memperbarui profil pengguna
exports.updateUserProfile = async (req, res) => {
    const { firstName, lastName, password } = req.body;

    try {
        const user = await User.findById(req.user.id); // Mengambil data pengguna
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Pesan error jika pengguna tidak ditemukan
        }
        // Memperbarui informasi pengguna 
        user.firstName = firstName || user.firstName; 
        user.lastName = lastName || user.lastName;

        const updatedUser = await user.save(); // Menyimpan perubahan informasi pengguna ke database
        // Mengirimkan informasi pengguna yang telah diperbarui
        res.json({ 
            id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
        });
    } catch (err) { // Menangani kesalahan ketika terjadi error
        handleError(res, err);
    }
};
