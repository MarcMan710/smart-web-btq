// backend/config/keys.js
module.exports = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017',
    jwtSecret: process.env.JWT_SECRET || '31311fc66ca1d4629873f551c9f385032386e3691ad97bf7676311b15bd9dc3840550db51b6a9a97dce5e58aaacf5dd7c4f6bd6960718590149f7b68514e6994',
    aiApiKey: process.env.AI_API_KEY || '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',
    aiApiUrl: 'https://huggingface.co/dizzyme/xls-r-300m-model-1', // AI Model URL
};
