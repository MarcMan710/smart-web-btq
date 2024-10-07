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

// Controller function to reprocess a recording
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

// Controller function to approve a recording based on score
exports.approveRecording = async (req, res) => {
    const { score } = req.body;

    const recording = await findRecordingById(req.params.id, res);
    if (!recording) return;

    try {
        await updateRecordingStatus(recording, score >= 70 ? 'passed' : 'failed', null, score >= 70);

        const user = await User.findById(recording.user);
        user.progress.push({ recordingId: recording._id, score });
        if (score >= 70) user.level += 1;

        let promotionMessage = '';
        if (user.level >= 5 && user.role !== 'instructor') {
            user.role = 'instructor';
            promotionMessage = 'Congratulations on your promotion to Instructor!';
        }

        user.completedModules += 1;
        await user.save();

        res.json({ message: 'Recording approved', recording, promotionMessage });
    } catch (err) {
        handleError(res, err);
    }
};

// Mengirimkan penilaian manual oleh Instructor
exports.handleScoreSubmit = async () => {
    try {
        const res = await axios.post(`/api/recordings/${selectedRecording.id}/approve`, { score });
        const { promotionMessage } = res.data;
        if (promotionMessage) {
            alert(promotionMessage);
        } else if (score >= 70) {
            alert('Selamat, Anda Lulus!');
        } else {
            alert('Score and feedback submitted successfully');
        }
        closeModal();
    } catch (err) {
        console.error(err.message);
        alert('Failed to submit score and feedback');
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

// Controller function to delete AI result of a recording
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

// Fungsi untuk memberikan feedback pada rekaman
exports.giveFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { feedback } = req.body;

        // Temukan rekaman berdasarkan ID
        const recording = await Recording.findById(id);

        if (!recording) {
            return res.status(404).json({ message: 'Recording not found' });
        }

        // Tambahkan feedback ke rekaman
        recording.feedback = feedback;
        await recording.save();

        res.status(200).json({ message: 'Feedback diberikan', recording });
    } catch (error) {
        res.status(500).json({ message: 'Error memberikan feedback', error });
    }
};
