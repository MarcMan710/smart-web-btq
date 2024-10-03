// Initialize Express server setup
const express = require('express'); // Importing Express framework for building web applications
const dotenv = require('dotenv'); // Importing dotenv for loading environment variables from a .env file
const connectDB = require('./config/db'); // Importing the function to connect to the MongoDB database
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); // Importing error handling middleware functions
const hafalanRoutes = require('./routes/hafalanRoutes'); // Importing routes for 'hafalan'

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB().catch(err => {
    winston.error(`Database connection failed: ${err.message}`); // Log an error message if database connection fails
    process.exit(1); // Exit the Node.js process with a failure status code
});

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Middleware for parsing JSON request bodies

// Define routes for different functionalities
app.use('/api/auth', require('./routes/authRoutes')); // Route for authentication
app.use('/api/users', require('./routes/userRoutes')); // Route for user operations
app.use('/api/recordings', require('./routes/recordingRoutes')); // Route for handling recordings
app.use('/api/hafalan', hafalanRoutes); // Route for 'hafalan' operations

// Root route response
app.get('/', (req, res) => {
    res.send('Welcome to Smart Web BTQ!'); // Send a welcome message for the root route
});

// Middleware to handle 404 errors for unknown routes
app.use(notFound);

// Error Handling Middleware setup
app.use(errorHandler); // Middleware to handle errors and send appropriate responses

// Start the server on a specified port
const PORT = process.env.PORT || 5000; // Define the port for the server to run on
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server and log the port it's running on