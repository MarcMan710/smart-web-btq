const request = require('supertest');
const express = require('express');
const { getUserProfile, updateUserProfile, getUserProgress } = require('../controllers/userController');
const User = require('../models/User');
const Recording = require('../models/Recording');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.get('/api/user/profile', getUserProfile);
app.put('/api/user/profile', updateUserProfile);
app.get('/api/user/progress', getUserProgress);

jest.mock('../models/User');
jest.mock('../models/Recording');
jest.mock('bcryptjs');

describe('User Controller', () => {
    describe('getUserProfile', () => {
        it('should return the user profile excluding the password field when a valid user ID is provided', async () => {
            const mockUser = { _id: '1', name: 'John Doe', email: 'john@example.com', password: 'hashedpassword' };
            User.findById.mockResolvedValueOnce(mockUser);

            const res = await request(app)
                .get('/api/user/profile')
                .set('Authorization', 'Bearer validtoken');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ _id: '1', name: 'John Doe', email: 'john@example.com' });
        });
    });

    describe('updateUserProfile', () => {
        it('should update the user\'s name, email, and password when valid data is provided', async () => {
            const mockUser = { _id: '1', name: 'John Doe', email: 'john@example.com', password: 'hashedpassword', save: jest.fn() };
            User.findById.mockResolvedValueOnce(mockUser);
            bcrypt.genSalt.mockResolvedValueOnce('salt');
            bcrypt.hash.mockResolvedValueOnce('newhashedpassword');

            const res = await request(app)
                .put('/api/user/profile')
                .send({ name: 'Jane Doe', email: 'jane@example.com', password: 'newpassword' })
                .set('Authorization', 'Bearer validtoken');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: '1', name: 'Jane Doe', email: 'jane@example.com' });
            expect(mockUser.name).toBe('Jane Doe');
            expect(mockUser.email).toBe('jane@example.com');
            expect(mockUser.password).toBe('newhashedpassword');
        });
    });

    describe('getUserProgress', () => {
        it('should return a 404 status with a "User not found" message when the user ID does not exist', async () => {
            User.findById.mockResolvedValueOnce(null);

            const res = await request(app)
                .get('/api/user/progress')
                .set('Authorization', 'Bearer validtoken');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('User not found');
        });
    });
});