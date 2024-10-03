// Import necessary modules and configurations
const express = require('express');
const dotenv = require('dotenv');
const winston = require('winston');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const hafalanRoutes = require('./routes/hafalanRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
(async () => {
    try {
        await connectDB();
    } catch (err) {
        winston.error(`Database connection failed: ${err.message}`);
        process.exit(1);
    }
})();

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies

// Define routes for different functionalities
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/recordings', require('./routes/recordingRoutes'));
app.use('/api/hafalan', hafalanRoutes);

// Root route response
app.get('/', (req, res) => {
    res.send('Welcome to Smart Web BTQ!');
});

// Middleware to handle 404 errors for unknown routes
app.use(notFound);

// Error Handling Middleware setup
app.use(errorHandler);

// Start the server on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));