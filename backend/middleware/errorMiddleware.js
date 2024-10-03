// backend/middleware/errorMiddleware.js
// Error handling middleware function to handle errors in the application
const errorHandler = (err, req, res, next) => {
    // Determine the status code based on the response status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Send JSON response with error message and stack trace (in development mode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

// Middleware function to handle 404 errors for unknown routes
const notFound = (req, res, next) => {
    // Create a new Error object for the not found route
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the error handling middleware
};

module.exports = { errorHandler, notFound };