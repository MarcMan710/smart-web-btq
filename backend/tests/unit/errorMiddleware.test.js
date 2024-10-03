// File Path: tests/unit/errorHandling.test.js

const request = require('supertest');
const express = require('express');
const { errorHandler, notFound } = require('../../middleware/errorMiddleware');

const app = express();
app.use(express.json());

// Mock routes to trigger middleware
app.get('/error', (req, res) => {
    throw new Error('Test error');
});
app.use(notFound);
app.use(errorHandler);

describe('Error Handling Middleware', () => {
    it('should return 500 and error message on generic error', async () => {
        const res = await request(app).get('/error');
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Test error');
    });

    it('should return stack trace in development mode', async () => {
        process.env.NODE_ENV = 'development';
        const res = await request(app).get('/error');
        expect(res.status).toBe(500);
        expect(res.body.stack).toBeDefined();
    });

    it('should not return stack trace in production mode', async () => {
        process.env.NODE_ENV = 'production';
        const res = await request(app).get('/error');
        expect(res.status).toBe(500);
        expect(res.body.stack).toBeNull();
    });

    it('should return 404 and error message for unknown routes', async () => {
        const res = await request(app).get('/nonexistent');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found - /nonexistent');
    });
});