// backend/routes/recordingRoutes.js
const express = require('express');
const router = express.Router();
const {
    submitRecording,
    getRecordingDetails,
    reprocessRecording,
    deleteAIResult
} = require('../controllers/recordingController');

// Routes for recording operations
// POST /recordings - Submit a new recording
router.post('/recordings', submitRecording);

// GET /recordings/:id - Get details of a specific recording
router.get('/recordings/:id', getRecordingDetails);

// POST /recordings/:id/reprocess - Reprocess a specific recording
router.post('/recordings/:id/reprocess', reprocessRecording);

// DELETE /recordings/:id/aiResult - Delete AI result of a specific recording
router.delete('/recordings/:id/aiResult', deleteAIResult);

// POST /recordings/:id/feedback - Instructor memberikan feedback pada rekaman
router.post('/recordings/:id/feedback', protect, instructor, giveFeedback);

module.exports = router;