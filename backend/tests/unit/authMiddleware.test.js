const { protect, admin, logout } = require('backend/middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('backend/models/User');
const config = require('backend/config/keys');

jest.mock('jsonwebtoken');
jest.mock('backend/models/User');

describe('Auth Middleware Tests', () => {
    // Token is present in the authorization header and is valid
    it('should call next() when token is valid', async () => {
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
        const decoded = { id: 'userId' };

        jwt.verify.mockReturnValue(decoded);
        User.findById.mockResolvedValue({
            _id: 'userId',
            select: jest.fn().mockReturnValue({ _id: 'userId' })
        });

        await protect(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith('validToken', config.jwtSecret);
        expect(User.findById).toHaveBeenCalledWith(decoded.id);
        expect(next).toHaveBeenCalled();
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

    // User with admin role proceeds to the next middleware
    it('should call next when user has admin role', () => {
        const req = { user: { role: 'admin' } };
        const res = {};
        const next = jest.fn();

        admin(req, res, next);

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

        admin(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Not authorized as an admin' });
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