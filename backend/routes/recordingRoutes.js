const express = require('express');
const router = express.Router();
const { submitRecording, getUserRecordings } = require('../controllers/recordingController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// POST /api/recordings - Submit a new recording
router.post('/', protect, upload.single('audioFile'), submitRecording);

// GET /api/recordings/ - Route to get user recordings
router.get('/', protect, getUserRecordings);

module.exports = router;