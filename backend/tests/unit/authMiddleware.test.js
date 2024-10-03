// File Path: tests/unit/authMiddleware.test.js
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { protect, instructor, logout } = require('../../middleware/authMiddleware');
const config = require('../../config/keys');

jest.mock('jsonwebtoken');
jest.mock('../../models/User');

describe('Auth Middleware Tests', () => {
    let consoleErrorMock;

    beforeEach(() => {
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorMock.mockRestore();
    });

    // Token is present and valid, user is authenticated successfully
    it('should authenticate user successfully when token is present and valid', async () => {
        const req = {
            headers: {
                authorization: 'Bearer validToken'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const jwt = require('jsonwebtoken');
        jwt.verify = jest.fn().mockReturnValue({ id: 'userId' });

        const User = require('../../models/User');
        User.findById = jest.fn().mockReturnValue({ select: jest.fn().mockReturnValue({ _id: 'userId', username: 'testUser' }) });

        await protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('validToken', 'jwtSecret');
        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(req.user).toEqual({ _id: 'userId', username: 'testUser' });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    // Authorization header is missing
    it('should respond with 401 when authorization header is missing', async () => {
        const req = {
            headers: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, no token' });
    });

    // Token is invalid
    it('should respond with 401 when token is invalid', async () => {
        const req = {
            headers: {
                authorization: 'Bearer invalidToken'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized, token failed' });
    });

    // User with instructor role proceeds to the next middleware
    it('should call next when user has instructor role', () => {
        const req = { user: { role: 'instructor' } };
        const res = {};
        const next = jest.fn();

        instructor(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    // Request without a user object
    it('should return 403 when user object is missing', () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        instructor(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized as an Instructor' });
    });

    // Successfully clears the user from the request object
    it('should clear the user from the request object when user is present', () => {
        const req = { user: { id: 1, name: 'John Doe' } };
        const res = {};
        const next = jest.fn();

        logout(req, res, next);

        expect(req.user).toBeNull();
        expect(next).toHaveBeenCalled();
    });
});