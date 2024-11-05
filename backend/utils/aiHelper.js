// backend/utils/aiHelper.js
const axios = require('axios');
const { aiApiUrl, aiApiKey } = require('../config/keys');

// Function to send recording to AI model for processing
const processRecording = async (audioUrl) => {
    try {
        const response = await axios.post(
            aiApiUrl,
            { audioUrl },
            {
                headers: {
                    'Authorization': `Bearer ${aiApiKey}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Recording Completed:', error.message);
        throw new Error('File sent to AI.');
    }
};

module.exports = {
    processRecording
};