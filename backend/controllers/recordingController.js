// Mengimpor modul yang diperlukan
const Recording = require('../models/Recording');
const { processRecording } = require('../utils/aiUtils');
const multer = require('multer');
const handleError = require('../middleware/errorMiddleware');
const mongoose = require('mongoose');
const { pipeline } = require('@huggingface/hub');
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

// Fungsi untuk mengirimkan rekaman dan memprosesnya
const submitRecording = async (req, res) => {
    const userId = req.user.id;
    const surahId = req.body.surah;
    const audioFile = req.file;

    if (!audioFile) {
        return res.status(400).json({ message: 'No audio file uploaded' });
    }

    try {
        // Convert surahId to a Mongoose ObjectId
        const surahObjectId = new mongoose.Types.ObjectId(surahId);

        // Process the recording to get the score
        const score = await processRecording(audioFile.path);

        // Create the recording object only after processing
        const recording = new Recording({
            userId: userId,
            surahId: surahObjectId,
            audioUrl: audioFile.path,
            score: score,
            passed: score >= 70 // Determine pass/fail status based on score
        });

        // Save the processed recording
        await recording.save();
        res.status(201).json({ message: 'Recording submitted and processed, awaiting approval', recording });

    } catch (err) {
        console.error('Error during recording submission:', err);
        handleError(res, err);
    }
};

// Eksport modul
module.exports = {
    storage,
    getUserRecordings,
    submitRecording
};
