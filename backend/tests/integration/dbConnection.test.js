const connectDB = require('../../config/db');
const mongoose = require('mongoose'); // Import mongoose

// Mock process.exit to prevent the test process from exiting
jest.spyOn(process, 'exit').mockImplementation((code) => {
    throw new Error(`process.exit: ${code}`);
});

test('Database connection should be established successfully', async () => {
    await expect(connectDB()).resolves.not.toThrow();
});

test('Database connection should fail with an error', async () => {
    // Simulate a failure scenario
    jest.spyOn(mongoose, 'connect').mockImplementationOnce(() => Promise.reject(new Error('Connection failed')));
    await expect(connectDB()).rejects.toThrow('Connection failed');
});

// Ensure all connections are closed after tests
afterAll(async () => {
    await mongoose.disconnect();
    jest.restoreAllMocks(); // Restore all mocked functions
});