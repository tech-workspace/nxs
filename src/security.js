const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create DOMPurify instance for server-side sanitization
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Rate limiting configuration for different routes
 */
const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// General rate limiting (1000 requests per 15 minutes) - More lenient for browsing
const generalLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  1000, // 1000 requests - more reasonable for normal browsing
  'Too many requests from this IP, please try again later.'
);

// Strict rate limiting for form submissions (5 requests per 15 minutes)
const formSubmissionLimiter = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // 5 requests
  'Too many form submissions from this IP, please try again later.'
);


/**
 * Helmet configuration for security headers
 */
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", // Required for inline styles in templates
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com"
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Required for inline scripts in templates (error page)
        "https://cdnjs.cloudflare.com"
      ],
      scriptSrcAttr: ["'none'"], // Block inline event handlers
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "blob:"
      ],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable if causing issues with your assets
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

/**
 * Input sanitization middleware
 */
const sanitizeInput = (req, res, next) => {
  // Sanitize all string inputs in req.body
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        // Remove potentially dangerous HTML/script tags
        req.body[key] = DOMPurify.sanitize(req.body[key], {
          ALLOWED_TAGS: [], // No HTML tags allowed
          ALLOWED_ATTR: [], // No attributes allowed
          KEEP_CONTENT: true // Keep text content
        }).trim();
      }
    }
  }

  // Sanitize query parameters
  if (req.query && typeof req.query === 'object') {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = DOMPurify.sanitize(req.query[key], {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
          KEEP_CONTENT: true
        }).trim();
      }
    }
  }

  next();
};

/**
 * Validation rules for inquiry form
 */
const inquiryValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\u0600-\u06FF]+$/) // Allow English and Arabic characters
    .withMessage('Name can only contain letters and spaces'),
  
  body('mobile')
    .trim()
    .matches(/^(\+971|971)?(50|51|52|54|55|56)\d{7}$|^0(50|51|52|54|55|56)\d{7}$/)
    .withMessage('Please enter a valid UAE mobile number'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape() // Escape HTML characters
];


/**
 * Middleware to check validation results
 */
const checkValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {})
    });
  }
  next();
};

/**
 * Additional XSS protection middleware
 */
const xssProtection = (req, res, next) => {
  // Set X-XSS-Protection header
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Set X-Content-Type-Options header
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Set Referrer-Policy header
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
};

module.exports = {
  helmetConfig,
  generalLimiter,
  formSubmissionLimiter,
  sanitizeInput,
  inquiryValidationRules,
  checkValidationResults,
  xssProtection,
  DOMPurify
};
