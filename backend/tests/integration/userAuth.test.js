const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
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

describe('Integration Test: User Registration and Authentication', () => {
    beforeAll(async () => {
        // Connect to the test database
        const url = `mongodb://127.0.0.1/auth_test_db`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        // Disconnect from the test database
        await mongoose.connection.close();
    });

    afterEach(async () => {
        // Clear the database after each test
        await User.deleteMany({});
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
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

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.email).toBe('john@example.com');
        });

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
            await new User({
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                email: 'john@example.com',
                password: await hashPassword('password123')
            }).save();

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

    describe('POST /api/auth/login', () => {
        it('should login a user and return a token', async () => {
            const hashedPassword = await hashPassword('password123');
            await new User({
                firstName: 'John',
                lastName: 'Doe',
                username: 'johndoe',
                email: 'john@example.com',
                password: hashedPassword
            }).save();

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'password123',
                    rememberMe: true
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 400 if credentials are invalid', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'wrongpassword'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Invalid credentials');
        });
    });
});