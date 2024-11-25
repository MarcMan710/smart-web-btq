// Mengimport modul yang diperlukan
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, serverError } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const recordingRoutes = require('./routes/recordingRoutes');
const surahRoutes = require('./routes/surahRoutes');
const cors = require('cors');

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Koneksi ke database
(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
})();

// Inisialisasi Express
const app = express();

// Mengizinkan Frontend untuk mengakses backend
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Setup middleware
app.use(express.json()); // Middleware untuk mengurai permintaan JSON
app.use(express.urlencoded({ extended: true })); // Middleware untuk mengurai permintaan URL

// Mendefinisikan rute untuk berbagai fungsionalitas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recordings', recordingRoutes);
app.use('/api/surah', surahRoutes);

// Middleware untuk menangani rute yang tidak ditemukan
app.use(notFound);

// Middleware untuk menangani kesalahan server
app.use(serverError);

// Memulai server pada port tertentu
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));