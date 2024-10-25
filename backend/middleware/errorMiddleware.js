// backend/middleware/errorMiddleware.js
// Error handling middleware function
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Middleware function to handle 404 errors for unknown routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Utility function to handle errors
const handleError = (res, err) => {
    console.error(err.message);
    res.status(500).send('Server Error');
};

module.exports = { errorHandler, notFound, handleError };