const request = require('supertest');
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/User');
const { hashPassword, generateToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/keys');

const app = express();
app.use(express.json());
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

jest.mock('../models/User');
jest.mock('../utils/auth');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    describe('registerUser', () => {
        it('should return 400 if passwords do not match', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: 'password123',
                    confirmPassword: 'password456'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Passwords do not match');
        });

        it('should return 400 if email is already registered', async () => {
            User.findOne.mockResolvedValueOnce({ email: 'john@example.com' });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'johndoe',
                    email: 'john@example.com',
                    password: 'password123',
                    confirmPassword: 'password123'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Email already registered');
        });
    });

    describe('loginUser', () => {
        it('should return a token with longer expiration when rememberMe is true', async () => {
            const user = {
                id: '123',
                email: 'john@example.com',
                password: 'hashedpassword',
                role: 'user'
            };

            User.findOne.mockResolvedValueOnce(user);
            bcrypt.compare.mockResolvedValueOnce(true);
            jwt.sign.mockReturnValueOnce('token');

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'password123',
                    rememberMe: true
                });

            expect(res.status).toBe(200);
            expect(res.body.token).toBe('token');
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: user.id, email: user.email, role: user.role },
                config.jwtSecret,
                { expiresIn: '7d' }
            );
        });
    });
});