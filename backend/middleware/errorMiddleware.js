// backend/middleware/errorMiddleware.js
// Fungsi Middleware untuk menangani kesalahan pada server
const serverError = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Menentukan status code berdasarkan kondisi
    res.status(statusCode).json({
        message: err.message, // Menampilkan pesan kesalahan
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Menampilkan stack trace hanya dalam mode development
    });
};

// Fungsi Middleware untuk menangani rute yang tidak ditemukan
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); // Membuat objek kesalahan
    res.status(404); // Mengatur status code
    next(error); // Memanggil middleware selanjutnya
};

// Fungsi untuk menangani kesalahan server
function handleError(res, error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
}

// Ekspor fungsi error middleware
module.exports = { serverError, notFound, handleError };