// backend/controllers/recordingController.js
const Recording = require('../models/Recording');
const User = require('../models/User');
const { processRecording } = require('../utils/aiHelper');

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
            res.status(404).json({ message: 'Recording not found' });
            return null;
        }
        return recording;
    } catch (err) {
        handleError(res, err);
        return null;
    }
};

// Utility function to update and save recording status
const updateRecordingStatus = async (recording, status, aiResult = null, passed = null) => {
    recording.status = status;
    if (aiResult !== null) recording.aiResult = aiResult;
    if (passed !== null) recording.passed = passed;
    await recording.save();
};

exports.submitRecording = async (req, res) => {
    const { audioUrl } = req.body;
    let recording;

    try {
        recording = new Recording({
            userId: req.user.id,
            audioUrl,
            status: 'processing',
        });

        await recording.save();

        const aiResult = await processRecording(audioUrl);

        await updateRecordingStatus(recording, 'pending_approval', aiResult);

        res.status(201).json({ message: 'Recording submitted and processed, awaiting approval', recording });
    } catch (err) {
        if (!recording) {
            recording = new Recording({
                userId: req.user.id,
                audioUrl,
                aiResult: { error: err.message },
                passed: false,
                status: 'error',
            });
        } else {
            await updateRecordingStatus(recording, 'error', { error: err.message }, false);
        }

        await recording.save();
        handleError(res, err);
    }
};

exports.reprocessRecording = async (req, res) => {
    const recording = await findRecordingById(req.params.id, res);
    if (!recording) return;

    try {
        await updateRecordingStatus(recording, 'processing');

        const aiResult = await processRecording(recording.audioUrl);

        await updateRecordingStatus(recording, 'completed', aiResult, aiResult.score >= 70);

        res.json({ message: 'Recording reprocessed', recording });
    } catch (err) {
        handleError(res, err);
    }
};

exports.approveRecording = async (req, res) => {
    const { score } = req.body;

    const recording = await findRecordingById(req.params.id, res);
    if (!recording) return;

    try {
        await updateRecordingStatus(recording, score >= 70 ? 'passed' : 'failed', null, score >= 70);

        const user = await User.findById(recording.userId);
        user.progress.push({ recordingId: recording._id, score });
        if (score >= 70) user.level += 1;

        let promotionMessage = '';
        if (user.level >= 5 && user.role !== 'Instructor') {
            user.role = 'Instructor';
            promotionMessage = 'Congratulations on your promotion to Instructor!';
        }

        await user.save();

        res.json({ message: 'Recording approved', recording, promotionMessage });
    } catch (err) {
        handleError(res, err);
    }
};

exports.getRecordingDetails = async (req, res) => {
    const recording = await findRecordingById(req.params.id, res);
    if (!recording) return;

    try {
        res.json(recording);
    } catch (err) {
        handleError(res, err);
    }
};

exports.deleteAIResult = async (req, res) => {
    const recording = await findRecordingById(req.params.id, res);
    if (!recording) return;

    try {
        await updateRecordingStatus(recording, recording.status, null, false);

        res.json({ message: 'AI result deleted', recording });
    } catch (err) {
        handleError(res, err);
    }
};