const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { submitRecording, approveRecording } = require('../controllers/recordingController');
const Recording = require('../models/Recording');
const User = require('../models/User');
const { processRecording } = require('../utils/aiHelper');

const app = express();
app.use(express.json());
app.post('/api/recordings', submitRecording);
app.put('/api/recordings/:id/approve', approveRecording);

jest.mock('../models/Recording');
jest.mock('../models/User');
jest.mock('../utils/aiHelper');

describe('Integration Test: Recording Approval and User Promotion', () => {
    beforeAll(async () => {
        // Connect to a test database if needed
        // await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Disconnect from the test database if needed
        // await mongoose.disconnect();
    });

    it('should submit a recording, process it, approve it, and promote the user', async () => {
        const mockRecording = { _id: '1', userId: 'user1', audioUrl: 'http://example.com/audio.mp3', status: 'processing', save: jest.fn() };
        const mockAIResult = { score: 85 };
        const mockUser = { _id: 'user1', level: 4, role: 'Student', progress: [], save: jest.fn() };

        Recording.prototype.save = jest.fn().mockResolvedValueOnce(mockRecording);
        processRecording.mockResolvedValueOnce(mockAIResult);
        Recording.findById.mockResolvedValueOnce(mockRecording);
        User.findById.mockResolvedValueOnce(mockUser);

        // Submit a new recording
        let res = await request(app)
            .post('/api/recordings')
            .send({ audioUrl: 'http://example.com/audio.mp3' });

        expect(res.status).toBe(201);
        expect(res.body.recording.status).toBe('pending_approval');
        expect(res.body.recording.aiResult).toEqual(mockAIResult);

        // Approve the recording
        res = await request(app)
            .put('/api/recordings/1/approve')
            .send({ score: 85 });

        expect(res.status).toBe(200);
        expect(mockUser.level).toBe(5);
        expect(mockUser.role).toBe('Instructor');
        expect(res.body.promotionMessage).toBe('Congratulations on your promotion to Instructor!');
    });
});