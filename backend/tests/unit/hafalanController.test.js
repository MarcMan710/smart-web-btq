const request = require('supertest');
const express = require('express');
const { getAllHafalan, getHafalanDetails, createOrUpdateHafalan } = require('../controllers/hafalanController');
const Hafalan = require('../models/Hafalan');

const app = express();
app.use(express.json());
app.get('/api/hafalan', getAllHafalan);
app.get('/api/hafalan/:id', getHafalanDetails);
app.post('/api/hafalan', createOrUpdateHafalan);

jest.mock('../models/Hafalan');

describe('Hafalan Controller', () => {
    describe('getAllHafalan', () => {
        it('should return a sorted list of all Hafalan documents', async () => {
            const hafalanList = [
                { title: 'Hafalan 1', levelRequired: 1 },
                { title: 'Hafalan 2', levelRequired: 2 }
            ];
            Hafalan.find.mockResolvedValueOnce(hafalanList);

            const res = await request(app).get('/api/hafalan');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(hafalanList);
            expect(Hafalan.find).toHaveBeenCalledWith();
        });
    });

    describe('getHafalanDetails', () => {
        it('should return a 404 status code if the Hafalan document is not found', async () => {
            Hafalan.findById.mockResolvedValueOnce(null);

            const res = await request(app).get('/api/hafalan/123');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Hafalan not found');
        });
    });

    describe('createOrUpdateHafalan', () => {
        it('should create a new Hafalan document if it does not already exist', async () => {
            Hafalan.findById.mockResolvedValueOnce(null);
            const newHafalan = { title: 'New Hafalan', content: 'Content', levelRequired: 1 };
            Hafalan.prototype.save = jest.fn().mockResolvedValueOnce(newHafalan);

            const res = await request(app)
                .post('/api/hafalan')
                .send(newHafalan);

            expect(res.status).toBe(201);
            expect(res.body).toEqual(newHafalan);
        });
    });
});