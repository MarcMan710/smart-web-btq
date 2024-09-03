// backend/tests/integration/hafalan.integration.test.js
const request = require('supertest');
const app = require('../../server');
const Hafalan = require('../../models/Hafalan');
const mongoose = require('mongoose');
const { protect, admin } = require('../../middleware/authMiddleware');

jest.mock('../../middleware/authMiddleware', () => ({
    protect: jest.fn((req, res, next) => {
        req.user = { id: 'userId', level: 2 }; // Mock user with level 2
        next();
    }),
    admin: jest.fn((req, res, next) => {
        req.user = { id: 'adminId', isAdmin: true }; // Mock admin user
        next();
    }),
}));

describe('Hafalan Management Integration Tests', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/hafalan_test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe('GET /api/hafalan', () => {
        it('should return a sorted list of all Hafalan documents', async () => {
            const hafalanList = [
                { title: 'Hafalan 1', levelRequired: 1 },
                { title: 'Hafalan 2', levelRequired: 2 }
            ];
            await Hafalan.insertMany(hafalanList);

            const res = await request(app).get('/api/hafalan');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(expect.arrayContaining([
                expect.objectContaining({ title: 'Hafalan 1', levelRequired: 1 }),
                expect.objectContaining({ title: 'Hafalan 2', levelRequired: 2 })
            ]));
        });
    });

    describe('GET /api/hafalan/:id', () => {
        it('should return a 404 status code if the Hafalan document is not found', async () => {
            const res = await request(app).get('/api/hafalan/123');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Hafalan not found');
        });

        it('should return the Hafalan document if found', async () => {
            const hafalan = new Hafalan({ title: 'Hafalan 3', levelRequired: 1 });
            await hafalan.save();

            const res = await request(app).get(`/api/hafalan/${hafalan._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toEqual(expect.objectContaining({ title: 'Hafalan 3', levelRequired: 1 }));
        });
    });

    describe('POST /api/hafalan', () => {
        it('should create a new Hafalan document if it does not already exist', async () => {
            const newHafalan = { title: 'New Hafalan', content: 'Content', levelRequired: 1 };

            const res = await request(app)
                .post('/api/hafalan')
                .send(newHafalan);

            expect(res.status).toBe(201);
            expect(res.body).toEqual(expect.objectContaining(newHafalan));
        });
    });
});