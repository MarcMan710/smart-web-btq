const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/keys');

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Auth Utils', () => {
    describe('generateToken', () => {
        // Generates a valid JWT for a user with correct id and role
        it('should generate a valid JWT when user has correct id and role', () => {
            const user = { _id: '12345', role: 'admin' };
            const token = generateToken(user);
            const decoded = jwt.verify(token, config.jwtSecret);
            expect(decoded.id).toBe(user._id);
            expect(decoded.role).toBe(user.role);
        });

        // Handles missing user id gracefully
        it('should throw an error when user id is missing', () => {
            const user = { role: 'admin' };
            expect(() => generateToken(user)).toThrow();
        });
    });

    describe('hashPassword', () => {
        // hashes password correctly with valid input
        it('should hash password correctly when given valid input', async () => {
            const password = 'validPassword123';
            const hashedPassword = await hashPassword(password);
            const isMatch = await bcrypt.compare(password, hashedPassword);
            expect(isMatch).toBe(true);
        });

        // handles empty password input
        it('should return a hashed value when given an empty password', async () => {
            const password = '';
            const hashedPassword = await hashPassword(password);
            const isMatch = await bcrypt.compare(password, hashedPassword);
            expect(isMatch).toBe(true);
        });
    });

    describe('comparePassword', () => {
        // Correct password returns true
        it('should return true when the input password matches the hashed password', async () => {
            const inputPassword = 'correct_password';
            const hashedPassword = await bcrypt.hash(inputPassword, 10);
            const result = await comparePassword(inputPassword, hashedPassword);
            expect(result).toBe(true);
        });

        // Empty input password
        it('should return false when the input password is empty', async () => {
            const inputPassword = '';
            const hashedPassword = await bcrypt.hash('some_password', 10);
            const result = await comparePassword(inputPassword, hashedPassword);
            expect(result).toBe(false);
        });
    });
});