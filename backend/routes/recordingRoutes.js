const express = require('express');
const router = express.Router();
const { submitRecording, getRecordingDetails, reprocessRecording, deleteAIResult } = require('../controllers/recordingController');

// Route to submit a new recording
router.post('/recordings', submitRecording);

// Route to get recording details
router.get('/recordings/:id', getRecordingDetails);

router.post('/:id/reprocess', reprocessRecording);

router.delete('/:id/aiResult', deleteAIResult);

module.exports = router;