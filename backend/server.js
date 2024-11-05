// Import necessary modules and configurations
const express = require('express');
const dotenv = require('dotenv');
const winston = require('winston');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const surahRoutes = require('./routes/surahRoutes');
const cors = require('cors');

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

// Allow requests from frontend running on port 3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Define routes for different functionalities
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/recordings', require('./routes/recordingRoutes'));
app.use('/api/surah', surahRoutes);

// Root route response
app.get('/', (req, res) => {
    res.send('Welcome to Smart Web BTQ!');
});

// Middleware to handle 404 errors for unknown routes
app.use(notFound);

// Error Handling Middleware setup
app.use(errorHandler);

app.post('/api/recordings', (req, res) => {
    // Logika untuk menangani rekaman
    res.status(200).json({ message: 'Recording received' });
});

// Start the server on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));