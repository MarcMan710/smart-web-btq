// backend/config/db.js
// Mengimpor modul yang diperlukan
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Fungsi untuk menghubungkan ke MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CLOUD_MONGO_URI);
        console.log('Connected to MongoDB.');
    } catch (err) {
        try {
            await mongoose.connect(process.env.LOCAL_MONGO_URI);
            console.log('Connected to MongoDB.');
        } catch (localErr) {
            console.error(localErr.message);
            throw new Error('Failed to connect to Database.');
        }
    }
};

// Ekspor fungsi connectDB
module.exports = connectDB; 