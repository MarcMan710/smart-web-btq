// backend/config/db.js
// Importing required modules
const mongoose = require('mongoose');
const config = require('./keys'); // Import the keys configuration file

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the URI from the keys configuration
        await mongoose.connect(config.mongoURI);
        console.log('MongoDB Connected...'); // Log a success message if the connection is successful
    } catch (err) {
        console.error(err.message); // Log any error that occurs during the connection process
        process.exit(1); // Exit the Node.js process with a failure status code
    }
};

module.exports = connectDB; // Export the connectDB function to be used in other parts of the application