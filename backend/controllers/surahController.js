// Menghubungkan model Surah
const Surah = require('../models/Surah');

// Controller untuk mendapatkan semua surah5
exports.getAllSurah = async (req, res) => {
    try {
        const surah = await Surah.find().sort({ surahNumber: 1 }); // Mengurutkan surah berdasarkan nomor surah
        res.json(surah); // Mengirimkan data surah sebagai response
    } catch (err) {
        console.error(err.message); // Menampilkan pesan kesalahan ketika terjadi error
        res.status(500).send('Server Error'); // Mengirimkan response dengan status 500
    }
};

