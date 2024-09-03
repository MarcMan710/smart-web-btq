// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const hafalanRoutes = require('./routes/hafalanRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/recordings', require('./routes/recordingRoutes'));
app.use('/api/hafalan', hafalanRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to Smart Web BTQ!');
});

// Catch 404 errors for unknown routes
app.use(notFound);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));