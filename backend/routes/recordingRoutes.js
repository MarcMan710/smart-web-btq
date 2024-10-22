// backend/routes/recordingRoutes.js
const express = require('express');
const router = express.Router();
const {
    submitRecording,
    getRecordingDetails
} = require('../controllers/recordingController');

// POST /recordings - Submit a new recording
router.post('/recordings', submitRecording);


module.exports = router;