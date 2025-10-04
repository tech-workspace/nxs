require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const multer = require("multer");
const inquiry_collection = require("./src/inquiry-config");
const { validateInquiryData } = require("./src/validation");
const messages = require("./src/messages");
const {
  helmetConfig,
  formSubmissionLimiter,
  sanitizeInput,
  inquiryValidationRules,
  checkValidationResults,
  xssProtection
} = require("./src/security");

const {
  AppError,
  errorHandler,
  catchAsync,
  notFound,
  handleValidationError,
  logError
} = require("./src/errorHandler");


const app = express();

// Security middleware (must be applied early)
app.use(helmetConfig);
app.use(xssProtection);

// Input sanitization middleware
app.use(sanitizeInput);

app.use(expressLayouts);
app.set("layout", "./layouts/layout.ejs");
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
// convert data into json format
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false, limit: '10mb' })); // Limit URL-encoded payload size
//use EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home", { 
    messages: messages,
    title: "Corporate Gifts and Promotional Products | Nexus Plater UAE",
    description: "Nexus Plater provides high-quality corporate gifts and promotional products in UAE with fast turnaround and competitive pricing. Custom branded merchandise, employee gifts, and promotional items.",
    canonical: "/"
  });
});

app.get("/home", (req, res) => {
  res.render("home", { 
    messages: messages,
    title: "Corporate Gifts and Promotional Products | Nexus Plater UAE",
    description: "Nexus Plater provides high-quality corporate gifts and promotional products in UAE with fast turnaround and competitive pricing. Custom branded merchandise, employee gifts, and promotional items.",
    canonical: "/home"
  });
});

// Success page with inquiry details
app.get("/success", catchAsync(async (req, res, next) => {
  try {
    const inquiryId = req.query.id;
    let inquiry = null;
    
    if (inquiryId) {
      inquiry = await inquiry_collection.findById(inquiryId);
    }
    
    res.render("success", { 
      inquiry: inquiry,
      messages: messages,
      title: "Success - Inquiry Submitted | Nexus Plater",
      description: "Your inquiry has been successfully submitted. Thank you for contacting Nexus Plater for your corporate gifts and promotional products needs.",
      canonical: "/success",
      layout: "layouts/minimal"
    });
  } catch (error) {
    next(new AppError('Unable to load inquiry details', 500));
  }
}));

// Professional error page with query parameters
app.get("/error", (req, res) => {
  const statusCode = parseInt(req.query.status) || 500;
  const message = req.query.message || 'An unexpected error occurred';
  
  const error = {
    status: statusCode,
    message: decodeURIComponent(message),
    stack: process.env.NODE_ENV === 'development' ? req.query.stack : undefined
  };
  
  res.status(statusCode).render("error", { 
    error: error,
    messages: messages,
    title: `Error ${statusCode} | Nexus Plater`,
    description: `We apologize for the inconvenience. An error occurred while processing your request. Please try again or contact us for assistance.`,
    canonical: "/error",
    layout: "layouts/minimal"
  });
});



// Configure multer for handling multipart/form-data
const upload = multer();

// Submit Inquiry Form
app.post("/submitInquiry", formSubmissionLimiter, upload.none(), catchAsync(async (req, res, next) => {
  
  // Server-side validation and sanitization FIRST
  const validation = validateInquiryData(req.body);
  
  if (!validation.isValid) {
    // Log validation error
    logError(new AppError(`Validation failed: ${JSON.stringify(validation.errors)}`, 400), req);
    
    // Return JSON response for AJAX requests, HTML for regular form submissions
    const isAjaxRequest = req.headers['x-requested-with'] === 'XMLHttpRequest' || 
                         (req.headers.accept && req.headers.accept.includes('application/json')) ||
                         req.headers['content-type']?.includes('multipart/form-data');
    
    if (isAjaxRequest) {
      // AJAX request - return JSON
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors
      });
    } else {
      // Regular form submission - return HTML error page
      const error = handleValidationError(validation.errors);
      return next(error);
    }
  }

  // Use ONLY sanitized data for database
  const data = {
    name: validation.sanitizedData.name,
    mobile: validation.sanitizedData.mobile,
    email: validation.sanitizedData.email,
    message: validation.sanitizedData.message,
    isRead: false, // Default value for isRead
    createDate: new Date(),
  };

  // Check if the mobile number already exists in the database for today
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
  const existing = await inquiry_collection.findOne({
    mobile: data.mobile,
    createdAt: {
      $gte: startOfToday,
      $lt: endOfToday,
    },
  });

  if (existing) {
    
    // Return appropriate response based on request type
    const isAjaxRequest = req.headers['x-requested-with'] === 'XMLHttpRequest' || 
                         (req.headers.accept && req.headers.accept.includes('application/json'));
    
    if (isAjaxRequest) {
      return res.status(429).json({
        success: false,
        message: messages.error.rateLimitExceeded,
        redirectUrl: "/error?status=429&message=" + encodeURIComponent(messages.error.rateLimitExceeded)
      });
    } else {
      return res.redirect("/error?status=429&message=" + encodeURIComponent(messages.error.rateLimitExceeded));
    }
  } else {
    const inquiryData = await inquiry_collection.insertMany(data);
    
    // Return appropriate response based on request type
    const isAjaxRequest = req.headers['x-requested-with'] === 'XMLHttpRequest' || 
                         (req.headers.accept && req.headers.accept.includes('application/json'));
    
    if (isAjaxRequest) {
      return res.status(201).json({
        success: true,
        message: messages.success.inquirySubmitted,
        redirectUrl: `/success?id=${inquiryData[0]._id}`,
        inquiryId: inquiryData[0]._id
      });
    } else {
      return res.redirect(`/success?id=${inquiryData[0]._id}`);
    }
  }
}));

// Handle 404 errors for all routes
app.use(notFound);

// Global error handling middleware (must be last)
app.use(errorHandler);

// Define Port for Application
const port = process.env.PORT | 5000;
app.listen(port, () => {
});
