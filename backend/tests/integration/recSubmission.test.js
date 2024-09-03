const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { submitRecording } = require('../controllers/recordingController');
const Recording = require('../models/Recording');
const User = require('../models/User');
const { processRecording } = require('../utils/aiHelper');

const app = express();
app.use(express.json());
app.post('/api/recordings', submitRecording);

jest.mock('../models/Recording');
jest.mock('../models/User');
jest.mock('../utils/aiHelper');

describe('Integration Test: Recording Submission and Processing Flow', () => {
    beforeAll(async () => {
        // Connect to a test database if needed
        // await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Close the database connection
        // await mongoose.connection.close();
    });

    it('should submit a recording, process it with AI, and update its status', async () => {
        const mockRecording = { _id: '1', userId: 'user1', audioUrl: 'http://example.com/audio.mp3', status: 'processing', save: jest.fn() };
        const mockAIResult = { score: 85 };

        Recording.prototype.save = jest.fn().mockResolvedValueOnce(mockRecording);
        processRecording.mockResolvedValueOnce(mockAIResult);

        const res = await request(app)
            .post('/api/recordings')
            .send({ audioUrl: 'http://example.com/audio.mp3' });

        expect(res.status).toBe(201);
        expect(res.body.recording.status).toBe('pending_approval');
        expect(res.body.recording.aiResult).toEqual(mockAIResult);
    });
});