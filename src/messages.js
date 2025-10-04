/**
 * Centralized message texts for the application
 * This file contains all user-facing messages to ensure consistency and easy maintenance
 */

const messages = {
  // Form validation messages
  validation: {
    nameRequired: 'Name is required',
    nameMinLength: 'Name must be at least 2 characters long',
    nameInvalidCharacters: 'Name contains invalid characters',
    
    mobileRequired: 'Mobile number is required',
    mobileInvalid: 'Please enter a valid UAE mobile number (e.g. 0501234567, or +971501234567)',
    mobileInvalidCharacters: 'Mobile contains invalid characters',
    
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    emailInvalidCharacters: 'Email contains invalid characters',
    
    messageRequired: 'Message is required',
    messageMinLength: 'Message must be at least 10 characters long',
    messageInvalidCharacters: 'Message contains invalid characters'
  },

  // Success messages
  success: {
    inquirySubmitted: 'Inquiry submitted successfully!',
    thankYouMessage: 'Thank you for reaching out to us. Your inquiry has been received and we will get back to you within 24 hours.',
    referenceId: 'Reference ID',
    submittedOn: 'Submitted',
    contactInfo: 'Need immediate assistance? Contact us at:',
    autoRedirectMessage: 'Would you like to return to the home page?'
  },

  // Error messages
  error: {
    // Rate limiting
    rateLimitExceeded: 'You have already submitted an inquiry today. We will get back to you within 24 hours.',
    tooManyRequests: 'Too many requests. Please try again later.',
    
    // General errors
    validationFailed: 'Validation failed',
    submissionFailed: 'Submission failed',
    serverError: 'Internal server error. Please try again later.',
    networkError: 'Network error. Please check your connection and try again.',
    
    // Page not found
    pageNotFound: 'The page you are looking for does not exist.',
    
    // Error page titles
    pageNotFoundTitle: 'Page Not Found',
    badRequestTitle: 'Bad Request',
    tooManyRequestsTitle: 'Too Many Requests',
    internalServerErrorTitle: 'Internal Server Error',
    genericErrorTitle: 'Error',
    
    // Error page descriptions
    genericErrorMessage: 'An unexpected error occurred',
    helpMessage: 'Need help? Contact us at',
    
    // Development error details
    errorCode: 'Error Code',
    stackTrace: 'Stack Trace'
  },

  // Navigation
  navigation: {
    backToHome: 'Back',
    goBack: '← Go Back',
    viewCatalog: '📋 View Catalog'
  },

  // Contact information
  contact: {
    email: 'info@nexusplater.com',
    phone: '+971 50 123 4567',
    emailLabel: '📧',
    phoneLabel: '📱'
  },

  // Form labels and placeholders
  form: {
    labels: {
      name: 'Name',
      mobile: 'Mobile',
      email: 'Email',
      message: 'Message'
    },
    placeholders: {
      name: 'Name',
      mobile: 'Mobile (e.g. 0501234567, or +971501234567)',
      email: 'Email',
      message: 'Message'
    },
    buttons: {
      submit: 'Send Inquiry',
      submitting: 'Sending...'
    }
  },

  // Server-side messages (for logging and internal use)
  server: {
    inquiryAlreadySent: 'Inquiry already sent today for mobile',
    inquirySubmittedSuccessfully: 'Inquiry submitted successfully',
    validationFailed: 'Validation failed',
    databaseError: 'Database error',
    inputSanitized: 'Input sanitized'
  }
};

module.exports = messages;
