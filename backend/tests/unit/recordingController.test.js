const request = require('supertest');
const express = require('express');
const { submitRecording, reprocessRecording, approveRecording } = require('../controllers/recordingController');
const Recording = require('../models/Recording');
const User = require('../models/User');
const { processRecording } = require('../utils/aiHelper');

const app = express();
app.use(express.json());
app.post('/api/recordings', submitRecording);
app.put('/api/recordings/:id/reprocess', reprocessRecording);
app.put('/api/recordings/:id/approve', approveRecording);

jest.mock('../models/Recording');
jest.mock('../models/User');
jest.mock('../utils/aiHelper');

describe('Recording Controller', () => {
    describe('submitRecording', () => {
        it('should successfully save a new recording with status "processing", process it using the AI, and update the status to "pending_approval" with the AI result', async () => {
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

    describe('reprocessRecording', () => {
        it('should handle the case where the recording ID does not exist and return a 404 status with a "Recording not found" message', async () => {
            Recording.findById.mockResolvedValueOnce(null);

            const res = await request(app)
                .put('/api/recordings/123/reprocess');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Recording not found');
        });
    });

    describe('approveRecording', () => {
        it('should correctly update the user\'s level and role if the recording score is above the threshold, and provide a promotion message if applicable', async () => {
            const mockRecording = { _id: '1', userId: 'user1', status: 'pending_approval', save: jest.fn() };
            const mockUser = { _id: 'user1', level: 4, role: 'Student', progress: [], save: jest.fn() };

            Recording.findById.mockResolvedValueOnce(mockRecording);
            User.findById.mockResolvedValueOnce(mockUser);

            const res = await request(app)
                .put('/api/recordings/1/approve')
                .send({ score: 75 });

            expect(res.status).toBe(200);
            expect(mockUser.level).toBe(5);
            expect(mockUser.role).toBe('Instructor');
            expect(res.body.promotionMessage).toBe('Congratulations on your promotion to Instructor!');
        });
    });
});