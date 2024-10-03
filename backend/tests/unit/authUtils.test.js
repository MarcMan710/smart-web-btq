const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken, hashPassword, comparePassword } = require('../../utils/authUtils');
const config = require('../../config/keys');

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../../config/keys', () => ({
    jwtSecret: 'testSecret'
}));

describe('Auth Utility Functions', () => {
    describe('generateToken', () => {
        it('should create a valid JWT token when given a user object', () => {
            const user = { _id: '12345', role: 'admin' };
            const token = 'testToken';
            jwt.sign.mockReturnValue(token);

            const result = generateToken(user);

            expect(jwt.sign).toHaveBeenCalledWith(
                { id: user._id, role: user.role },
                config.jwtSecret,
                { expiresIn: '1h' }
            );
            expect(result).toBe(token);
        });
    });

    describe('hashPassword', () => {
        beforeAll(() => {
            bcrypt.genSalt.mockResolvedValue('salt');
            bcrypt.hash.mockResolvedValue('hashedPassword');
        });

        it('should hash a plain text password successfully', async () => {
            const password = 'plainTextPassword';
            const hashedPassword = await hashPassword(password);

            expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
            expect(hashedPassword).toBe('hashedPassword');
        });
    });

    describe('comparePassword', () => {
        it('should correctly compare a plain text password with a hashed password', async () => {
            const inputPassword = 'plainTextPassword';
            const hashedPassword = '$2a$10$hashedPasswordHash';

            bcrypt.compare.mockResolvedValue(true);

            const result = await comparePassword(inputPassword, hashedPassword);

            expect(bcrypt.compare).toHaveBeenCalledWith(inputPassword, hashedPassword);
            expect(result).toBe(true);
        });
    });
});