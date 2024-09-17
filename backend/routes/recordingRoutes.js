// backend/routes/recordingRoutes.js
// Importing required modules and controllers
const express = require('express');
const router = express.Router();
const { submitRecording, getRecordingDetails, reprocessRecording, deleteAIResult } = require('../controllers/recordingController');

// POST /recordings
// Route to submit a new recording
router.post('/recordings', submitRecording);

// GET /recordings/:id
// Route to get recording details
router.get('/recordings/:id', getRecordingDetails);

// POST /:id/reprocess
// Route to reprocess a recording
router.post('/:id/reprocess', reprocessRecording);

// DELETE /:id/aiResult
// Route to delete AI result of a recording
router.delete('/:id/aiResult', deleteAIResult);

module.exports = router;