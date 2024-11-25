// Mengimport modul yang diperlukan
const express = require('express');
const router = express.Router();
const { submitRecording, getUserRecordings, storage } = require('../controllers/recordingController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Menggunakan Multer untuk mengupload file
const upload = multer({ storage: storage });

// POST /api/recordings - Rute untuk mengirim rekaman
router.post('/', protect, upload.single('audioFile'), submitRecording);

// GET /api/recordings/ - Rute untuk mendapatkan daftar rekaman
router.get('/', protect, getUserRecordings);

// Ekspor router
module.exports = router;