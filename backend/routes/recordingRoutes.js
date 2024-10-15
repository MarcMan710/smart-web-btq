// backend/routes/recordingRoutes.js
const express = require('express');
const router = express.Router();
const {
    submitRecording,
    getRecordingDetails
} = require('../controllers/recordingController');

// Routes for recording operations
// POST /recordings - Submit a new recording
router.post('/recordings', submitRecording);

// GET /recordings/:id - Get details of a specific recording
router.get('/recordings/:id', getRecordingDetails);


module.exports = router;