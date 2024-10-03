const { registerUser, loginUser } = require('../../controllers/authController');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword, generateToken } = require('../../utils/authUtils');

jest.mock('../../models/User');
jest.mock('../../utils/authUtils');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user when provided with valid details', async () => {
        req.body = {
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        };

        const mockUserSave = jest.fn().mockResolvedValue({
            _id: 'userId123',
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            role: 'student',
            level: 1
        });

        User.findOne.mockResolvedValue(null);
        User.prototype.save = mockUserSave;
        hashPassword.mockResolvedValue('hashedPassword123');
        generateToken.mockReturnValue('token123');

        await registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            _id: 'userId123',
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            role: 'student',
            level: 1,
            token: 'token123'
        });
    });

    it('should login with valid email and password', async () => {
        req.body = { emailOrUsername: 'test@example.com', password: 'password123' };

        User.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedPassword' });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('generatedToken');

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: 'generatedToken' });
    });

    it('should login with valid username and password', async () => {
        req.body = { emailOrUsername: 'testuser', password: 'password123' };

        User.findOne.mockResolvedValue({ username: 'testuser', password: 'hashedPassword' });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('generatedToken');

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: 'generatedToken' });
    });
});