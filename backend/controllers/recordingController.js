const Recording = require('../models/Recording');
const { processRecording } = require('../utils/aiHelper');
const multer = require('multer');
const { handleError } = require('../middleware/errorMiddleware');
const mongoose = require('mongoose');

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

exports.submitRecording = async (req, res) => {
    const userId = req.user.id;
    const audioFile = req.file;

    if (!audioFile) {
        return res.status(400).json({ message: 'No audio file uploaded' });
    }

    try {
        const recording = new Recording({
            userId: userId,
            audioUrl: audioFile.path, // Store the file path, not the file itself
            status: 'pending_approval'
        });

        await recording.save();

        try {
            const aiResult = await processRecording(audioFile.path);
            recording.aiResult = aiResult;
            await recording.save();
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

            res.status(201).json({ message: 'Recording submitted with fallback score, awaiting approval', recording });
        }
    } catch (err) {
        console.error('Error during recording submission:', err);
        // Fallback logic
        const initialScore = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        const wer = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        const finalScore = initialScore - wer;

        const recording = new Recording({
            userId: userId,
            audioUrl: audioFile.path,
            initialScore: initialScore,
            wer: wer,
            finalScore: finalScore,
            passed: finalScore >= 70,
            status: 'pending_approval'
        });

        await recording.save();
        res.status(500).json({ message: 'Recording submitted with fallback score due to an error', recording });
    }
};

exports.getUserRecordings = async (req, res) => {
    const userId = req.user.id;

    try {
        const recordings = await Recording.find({ userId: userId }).select('finalScore passed recordedAt');
        res.status(200).json(recordings);
    } catch (err) {
        console.error('Error fetching user recordings:', err);
        res.status(500).json({ message: 'Error fetching recordings' });
    }
};