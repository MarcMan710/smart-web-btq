// backend/utils/aiHelper.js
const axios = require('axios');
const config = require('../config/keys');

// Function to send recording to AI model for processing
const processRecording = async (audioUrl) => {
    try {
        const response = await axios.post(config.aiApiUrl, {
            audioUrl: audioUrl
        }, {
            headers: {
                'Authorization': `Bearer ${config.aiApiKey}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error processing recording with AI:', error.message);
        throw new Error('AI processing failed');
    }
};

module.exports = {
    processRecording
};