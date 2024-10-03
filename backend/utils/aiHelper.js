// backend/utils/aiHelper.js
// Importing required modules and controllers
const axios = require('axios'); // Importing axios for making HTTP requests
const config = require('../config/keys'); // Importing configuration keys for AI API URL and API Key

// Function to send recording to AI model for processing
const processRecording = async (audioUrl) => {
    try {
        // Sending a POST request to the AI model API with the audio URL
        const response = await axios.post(config.aiApiUrl, {
            audioUrl: audioUrl
        }, {
            headers: {
                'Authorization': `Bearer ${config.aiApiKey}` // Including API Key in the request headers
            }
        });

        return response.data; // Returning the response data from the AI model
    } catch (error) {
        console.error('Error processing recording with AI:', error.message); // Logging error message if processing fails
        throw new Error('AI processing failed'); // Throwing an error if AI processing fails
    }
};

module.exports = {
    processRecording // Exporting the processRecording function for use in other modules
};