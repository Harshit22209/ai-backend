/**
 * Global error handling middleware
 */

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Default error message to avoid leaking sensitive information
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    
    res.status(statusCode).json({
      error: message,
      success: false
    });
  };
  
  module.exports = errorHandler;