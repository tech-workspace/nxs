// Error handling middleware for the application
const messages = require('./messages');

/**
 * Custom error class for application-specific errors
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle different types of errors
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

/**
 * Send error response in development
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).render('error', {
    error: {
      status: err.statusCode,
      message: err.message,
      stack: err.stack,
      name: err.name
    },
    messages: messages,
    title: `Error ${err.statusCode} | Nexus Plater`,
    description: `We apologize for the inconvenience. An error occurred while processing your request. Please try again or contact us for assistance.`,
    canonical: "/error",
    layout: "layouts/minimal"
  });
};

/**
 * Send error response in production
 */
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).render('error', {
      error: {
        status: err.statusCode,
        message: err.message
      },
      messages: messages,
      title: `Error ${err.statusCode} | Nexus Plater`,
      description: `We apologize for the inconvenience. An error occurred while processing your request. Please try again or contact us for assistance.`,
      canonical: "/error",
      layout: "layouts/minimal"
    });
  } else {
    // Programming or other unknown error: don't leak error details
    
    res.status(500).render('error', {
      error: {
        status: 500,
        message: 'Something went wrong!'
      },
      messages: messages,
      title: "Error 500 | Nexus Plater",
      description: "We apologize for the inconvenience. An internal server error occurred. Please try again or contact us for assistance.",
      canonical: "/error",
      layout: "layouts/minimal"
    });
  }
};

/**
 * Main error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

/**
 * Catch async errors
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * Handle 404 errors
 */
const notFound = (req, res, next) => {
  // Check if the request is for a static file (has a file extension)
  const path = req.path;
  const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(path);
  
  // For static files (images, css, js, etc.), return a simple 404 without redirect
  if (hasFileExtension) {
    return res.status(404).send('File not found');
  }
  
  // For page routes, redirect to error page with 404 status
  return res.redirect(`/error?status=404&message=${encodeURIComponent('The page you are looking for does not exist.')}`);
};

/**
 * Handle form validation errors
 */
const handleValidationError = (errors) => {
  const errorMessages = Object.values(errors).join('. ');
  return new AppError(`Validation failed: ${errorMessages}`, 400);
};

/**
 * Handle rate limiting errors
 */
const handleRateLimitError = (req, res, next) => {
  const error = new AppError('Too many requests from this IP, please try again later.', 429);
  next(error);
};

/**
 * Log errors for monitoring
 */
const logError = (err, req) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack
    }
  };
  
};

module.exports = {
  AppError,
  errorHandler,
  catchAsync,
  notFound,
  handleValidationError,
  handleRateLimitError,
  logError
};
