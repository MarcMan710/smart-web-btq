// backend/controllers/recordingController.js
const Recording = require('../models/Recording');
const User = require('../models/User');
const { processRecording } = require('../utils/aiHelper');
const Hafalan = require('../models/Hafalan');
const axios = require('axios');
const multer = require('multer');
const path = require('path');

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

// backend/controllers/recordingController.js
exports.submitRecording = async (req, res) => {
    const { hafalanId } = req.body;
    const userId = req.user.id;
    const audioFile = req.file;

    if (!audioFile) {
        return res.status(400).json({ message: 'No audio file uploaded' });
    }

    try {
        const hafalan = await Hafalan.findById(hafalanId);
        if (!hafalan) {
            return res.status(404).json({ message: 'Hafalan not found' });
        }

        const recording = new Recording({
            userId,
            hafalanId,
            audioUrl: audioFile.path,
        });

        await recording.save();

        try {
            const aiResult = await processRecording(audioFile.path);
            await updateRecordingStatus(recording, 'pending_approval', aiResult);
            res.status(201).json({ message: 'Recording submitted and processed, awaiting approval', recording });
        } catch (aiError) {
            console.error('AI processing failed:', aiError);

            // Fallback logic
            const initialScore = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
            const wer = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
            const finalScore = initialScore - wer;

            // Determine pass/fail status
            const passed = finalScore >= 70;

            // Update the recording with fallback scores and pass/fail status
            recording.initialScore = initialScore;
            recording.wer = wer;
            recording.finalScore = finalScore;
            recording.passed = passed;
            await recording.save();

            await updateRecordingStatus(recording, 'pending_approval', { finalScore });
            res.status(201).json({ message: 'Recording submitted with fallback score, awaiting approval', recording });
        }
    } catch (err) {
        handleError(res, err);
    }
};


