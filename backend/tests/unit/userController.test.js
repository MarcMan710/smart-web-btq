const { getUserProfile } = require('../../controllers/userController.js');
const User = require('../../models/User.js');
const httpMocks = require('node-mocks-http');

describe('User Controller', () => {
    it('should return user profile when user exists', async () => {
        const req = httpMocks.createRequest({
            user: { id: '123' }
        });
        const res = httpMocks.createResponse();
        const user = { id: '123', name: 'John Doe', email: 'john@example.com' };
    
        const selectMock = jest.fn().mockResolvedValue(user);
        User.findById = jest.fn().mockReturnValue({ select: selectMock });
    
        await getUserProfile(req, res);
    
        expect(User.findById).toHaveBeenCalledWith('123');
        expect(selectMock).toHaveBeenCalledWith('-password');
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(user);
    });

    it('should return 404 when user is not found', async () => {
        const req = httpMocks.createRequest({
            user: { id: '123' }
        });
        const res = httpMocks.createResponse();
    
        const selectMock = jest.fn().mockResolvedValue(null);
        User.findById = jest.fn().mockReturnValue({ select: selectMock });
    
        await getUserProfile(req, res);
    
        expect(User.findById).toHaveBeenCalledWith('123');
        expect(selectMock).toHaveBeenCalledWith('-password');
        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toEqual({ message: 'User not found' });
    });
});

    // Successfully retrieves user progress when valid user ID is provided
    it('should return user progress when valid user ID is provided', async () => {
        const req = { user: { id: 'validUserId' } };
        const res = { json: jest.fn() };
        const progressData = [{ progress: 'data' }];
    
        Progress.find = jest.fn().mockResolvedValue(progressData);
    
        await getUserProgress(req, res);
    
        expect(Progress.find).toHaveBeenCalledWith({ user: 'validUserId' });
        expect(res.json).toHaveBeenCalledWith(progressData);
    });

        // User ID does not exist in the database
    it('should return empty array when user ID does not exist in the database', async () => {
        const req = { user: { id: 'nonExistentUserId' } };
        const res = { json: jest.fn() };
    
        Progress.find = jest.fn().mockResolvedValue([]);
    
        await getUserProgress(req, res);
    
        expect(Progress.find).toHaveBeenCalledWith({ user: 'nonExistentUserId' });
        expect(res.json).toHaveBeenCalledWith([]);
    });

    // Successfully updates user profile with valid name, email, and password
    it('should update user profile with valid name, email, and password', async () => {
        const req = {
            body: { name: 'New Name', email: 'newemail@example.com', password: 'newpassword' },
            user: { id: 'userId123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        const user = {
            _id: 'userId123',
            name: 'Old Name',
            email: 'oldemail@example.com',
            save: jest.fn().mockResolvedValue({
                _id: 'userId123',
                name: 'New Name',
                email: 'newemail@example.com'
            })
        };
        User.findById = jest.fn().mockResolvedValue(user);
        bcrypt.genSalt = jest.fn().mockResolvedValue('salt');
        bcrypt.hash = jest.fn().mockResolvedValue('hashedpassword');

        await updateUserProfile(req, res);

        expect(User.findById).toHaveBeenCalledWith('userId123');
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 'salt');
        expect(user.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            id: 'userId123',
            name: 'New Name',
            email: 'newemail@example.com'
        });
    });

    // User not found in the database
    it('should return 404 when user is not found', async () => {
        const req = {
            body: { name: 'New Name', email: 'newemail@example.com', password: 'newpassword' },
            user: { id: 'userId123' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        User.findById = jest.fn().mockResolvedValue(null);

        await updateUserProfile(req, res);

        expect(User.findById).toHaveBeenCalledWith('userId123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

        // User logs out successfully and receives a success message
    it('should return success message when user logs out successfully', () => {
        const req = {};
        const res = {
            json: jest.fn()
        };
        logoutUser(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: 'User logged out successfully' });
    });