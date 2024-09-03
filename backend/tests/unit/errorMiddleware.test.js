const request = require('supertest');
const express = require('express');
const { errorHandler, notFound } = require('../middleware/errorMiddleware');

const app = express();
app.use(express.json());

// Mock routes to trigger middleware
app.get('/error', (req, res) => {
    throw new Error('Test error');
});
app.use(notFound);
app.use(errorHandler);

describe('Error Middleware', () => {
    it('test_errorHandler_returns_500_on_error', async () => {
        const res = await request(app).get('/error');
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Test error');
    });

    it('test_errorHandler_returns_stack_trace_in_non_production', async () => {
        process.env.NODE_ENV = 'development';
        const res = await request(app).get('/error');
        expect(res.status).toBe(500);
        expect(res.body.stack).toBeDefined();
    });

    it('test_notFound_sets_404_and_passes_error', async () => {
        const res = await request(app).get('/nonexistent');
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Not Found - /nonexistent');
    });
});