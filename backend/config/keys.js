// backend/config/keys.js
// Exporting configuration object with keys for MongoDB URI, JWT Secret, AI API Key, and AI API URL
module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017', // MongoDB connection URI
    jwtSecret: process.env.JWT_SECRET || 'jwtSecret', // JWT secret key
    aiApiKey: process.env.AI_API_KEY || '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', // API key for AI services
    aiApiUrl: 'https://huggingface.co/dizzyme/xls-r-300m-model-1', // URL for the AI model
};