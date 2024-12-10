// Mengimpor modul yang diperlukan
const Recording = require('../models/Recording');
const { processRecording } = require('../utils/aiUtils');
const multer = require('multer');
const { handleError } = require('../middleware/errorMiddleware');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files should be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Fungsi untuk mengirimkan rekaman dan memprosesnya
const submitRecording = async (req, res) => {
    const userId = req.user.id;
    const surahId = req.body.surah;
    const audioFile = req.file;

    if (!audioFile) {
        return res.status(400).json({ message: 'No audio file uploaded' }); // Pesan error jika tidak ada file audio yang diunggah
    }

    try {
        // Convert surahId to a Mongoose ObjectId
        const surahObjectId = new mongoose.Types.ObjectId(surahId);

        // Proses rekaman untuk mendapatkan skor
        const score = await processRecording(audioFile.path);

        // Buat data rekaman baru dengan informasi yang diperlukan
        const recording = new Recording({
            userId: userId,
            surahId: surahObjectId,
            audioUrl: audioFile.path,
            score: score,
            passed: score >= 70 // Menentukan status rekaman berdasarkan skor
        });

        // Menyimpan rekaman ke database
        await recording.save();
        // Delete the audio file after successful save
        fs.unlink(audioFile.path, (err) => {
            if (err) {
                console.error('Error deleting audio file:', err);
            } else {
                console.log('Audio file deleted successfully');
            }
        });
        res.status(201).json({ message: 'Recording success!', recording });

    } catch (err) {
        console.error('Error during recording submission:', err);
        handleError(res, err);
    }
};

// Fungsi untuk mendapatkan daftar riwayat rekaman pengguna
const getUserRecordings = async (req, res) => {
    const userId = req.user.id;
    try {
        // Mengambil riwayat rekaman pengguna dari database
        const recordings = await Recording.find({ userId: userId }).select('score passed recordedAt'); 
        res.status(200).json(recordings);
    } catch (err) {
        console.error('Error fetching user recordings:', err); // Pesan error jika terjadi kesalahan dalam pengambilan riwayat rekaman
        handleError(res, err);
    }
};

// Eksport modul
module.exports = {
    storage,
    getUserRecordings,
    submitRecording
};
