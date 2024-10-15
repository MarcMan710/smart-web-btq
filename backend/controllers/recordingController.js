// backend/controllers/recordingController.js
const Recording = require('../models/Recording');
const User = require('../models/User');
const { processRecording } = require('../utils/aiHelper');
const Hafalan = require('../models/Hafalan');
const axios = require('axios');

// Utility function to handle errors
const handleError = (res, err) => {
    console.error(err.message);
    res.status(500).send('Server Error');
};

// Utility function to find a recording by ID
const findRecordingById = async (id, res) => {
    try {
        const recording = await Recording.findById(id);
        if (!recording) {
            return res.status(404).json({ message: 'Recording not found' });
        }
        return recording;
    } catch (err) {
        return handleError(res, err);
    }
};

// Utility function to update and save recording status
const updateRecordingStatus = async (recording, status, aiResult = undefined, passed = undefined) => {
    recording.status = status;
    if (aiResult !== undefined) recording.aiResult = aiResult;
    if (passed !== undefined) recording.passed = passed;
    await recording.save();
};

// Controller function to submit a new recording
exports.submitRecording = async (req, res) => {
    const { audioUrl, hafalanId } = req.body;
    const userId = req.user.id;

    try {
        const hafalan = await Hafalan.findById(hafalanId);
        if (!hafalan) {
            return res.status(404).json({ message: 'Hafalan not found' });
        }

        const recording = new Recording({
            user: userId,
            hafalan: hafalanId,
            audioUrl,
            status: 'processing'
        });

        await recording.save();

        const aiResult = await processRecording(audioUrl);
        await updateRecordingStatus(recording, 'pending_approval', aiResult);

        res.status(201).json({ message: 'Recording submitted and processed, awaiting approval', recording });
    } catch (err) {
        handleError(res, err);
    }
};


// Controller function to get details of a recording
exports.getRecordingDetails = async (req, res) => {
    const recording = await findRecordingById(req.params.id, res);
    if (!recording) return;

    try {
        res.json(recording);
    } catch (err) {
        handleError(res, err);
    }
};

