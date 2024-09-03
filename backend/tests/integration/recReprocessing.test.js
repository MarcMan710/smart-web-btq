const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { reprocessRecording } = require('../controllers/recordingController');
const Recording = require('../models/Recording');
const User = require('../models/User');
const { processRecording } = require('../utils/aiHelper');

const app = express();
app.use(express.json());
app.put('/api/recordings/:id/reprocess', reprocessRecording);

jest.mock('../models/Recording');
jest.mock('../models/User');
jest.mock('../utils/aiHelper');

describe('Integration Test - Recording Reprocessing', () => {
    beforeAll(async () => {
        // Connect to a test database if needed
        // await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Disconnect from the test database if needed
        // await mongoose.disconnect();
    });

    it('should reprocess a recording and update its AI result', async () => {
        const mockRecording = {
            _id: '1',
            userId: 'user1',
            audioUrl: 'http://example.com/audio.mp3',
            status: 'processing',
            aiResult: { score: 50 },
            save: jest.fn()
        };
        const mockAIResult = { score: 85 };

        Recording.findById.mockResolvedValueOnce(mockRecording);
        processRecording.mockResolvedValueOnce(mockAIResult);

        const res = await request(app)
            .put('/api/recordings/1/reprocess')
            .send();

        expect(res.status).toBe(200);
        expect(mockRecording.aiResult).toEqual(mockAIResult);
        expect(mockRecording.status).toBe('pending_approval');
        expect(mockRecording.save).toHaveBeenCalled();
    });

    it('should return 404 if the recording does not exist', async () => {
        Recording.findById.mockResolvedValueOnce(null);

        const res = await request(app)
            .put('/api/recordings/123/reprocess')
            .send();

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Recording not found');
    });
});