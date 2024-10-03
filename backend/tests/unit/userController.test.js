const { getUserProfile, updateUserProfile, getUserProgress, logoutUser } = require('../../controllers/userController');
const User = require('../../models/User');

describe('User Controller', () => {
    // Successfully retrieve user profile by ID
    it('should retrieve user profile by ID when user exists', async () => {
        const req = { user: { id: 'userId' } };
        const res = { json: jest.fn() };
        const user = { _id: 'userId', name: 'John Doe', email: 'john@example.com' };
    
        User.findById = jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue(user)
        });
    
        await getUserProfile(req, res);
    
        expect(User.findById).toHaveBeenCalledWith('userId');
        expect(res.json).toHaveBeenCalledWith(user);
    });

    // Successfully retrieve user progress by user ID
    it('should retrieve user progress by user ID when progress exists', async () => {
            const req = {
                user: { id: 'userId' }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const userProgress = {
                role: 'student',
                level: 2,
                completedModules: 5
            };

            User.findById.mockResolvedValue(userProgress);

            await getUserProgress(req, res);

            expect(User.findById).toHaveBeenCalledWith('userId', 'role level completedModules');
            expect(res.json).toHaveBeenCalledWith({
                role: userProgress.role,
                level: userProgress.level,
                completedModules: userProgress.completedModules
            });
        });

    // Handle server error when retrieving user profile
    it('should handle server error when retrieving user profile', async () => {
        const req = { user: { id: 'userId' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        User.findById = jest.fn().mockReturnValue({
            select: jest.fn().mockRejectedValue(new Error('Server Error'))
        });
    
        await getUserProfile(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Server Error');
    });

    // Handle server error when retrieving user progress
    it('should handle server error when retrieving user progress', async () => {
        const req = { user: { id: 'userId' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        User.find = jest.fn().mockRejectedValue(new Error('Server Error'));
    
        await getUserProgress(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Server Error');
    });

    // Handle server error when updating user profile
    it('should handle server error when updating user profile', async () => {
        const req = { user: { id: 'userId' }, body: {} };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
        User.findById = jest.fn().mockReturnValue({
            select: jest.fn().mockRejectedValue(new Error('Server Error'))
        });
    
        await updateUserProfile(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Server Error');
    });
});