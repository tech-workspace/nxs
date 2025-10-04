// Validation utilities for form data
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const messages = require('./messages');

// Create DOMPurify instance for server-side sanitization
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Sanitize input to prevent XSS attacks
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return '';
  
  const original = input;
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true // Keep text content
  }).trim();
  
  
  return sanitized;
}

/**
 * Validates UAE mobile number
 * @param {string} mobile - Mobile number to validate
 * @returns {object} - { isValid: boolean, error: string|null }
 */
function validateUAEMobile(mobile) {
  if (!mobile || typeof mobile !== 'string') {
    return { isValid: false, error: messages.validation.mobileRequired };
  }

  // Remove all non-digit characters except +
  const cleanMobile = mobile.replace(/[^\d+]/g, '').trim();
  
  // UAE mobile number patterns:
  // Local format: 0501234567, 0511234567, 0521234567, 0541234567, 0551234567, 0561234567
  // International format: +971501234567, +971511234567, etc.
  // Also accepts: 0568863388 (10 digits starting with 0)
  
  // Valid UAE mobile prefixes
  const validPrefixes = ['50', '51', '52', '54', '55', '56'];
  
  // Check if it's a valid UAE mobile number
  if (cleanMobile.startsWith('+971') && cleanMobile.length === 13) {
    // International format: +971501234567, +971568863388
    const prefix = cleanMobile.substring(4, 6);
    if (validPrefixes.includes(prefix)) {
      return { isValid: true, error: null };
    }
  } else if (cleanMobile.startsWith('971') && cleanMobile.length === 12) {
    // International format without +: 971501234567, 971568863388
    const prefix = cleanMobile.substring(3, 5);
    if (validPrefixes.includes(prefix)) {
      return { isValid: true, error: null };
    }
  } else if (cleanMobile.startsWith('0') && cleanMobile.length === 10) {
    // Local format: 0501234567, 0568863388
    const prefix = cleanMobile.substring(1, 3);
    if (validPrefixes.includes(prefix)) {
      return { isValid: true, error: null };
    }
  } else if (cleanMobile.length === 9) {
    // Local format without 0: 501234567, 568863388
    const prefix = cleanMobile.substring(0, 2);
    if (validPrefixes.includes(prefix)) {
      return { isValid: true, error: null };
    }
  }
  
  return { 
    isValid: false, 
    error: messages.validation.mobileInvalid 
  };
}

/**
 * Validates email address
 * @param {string} email - Email to validate
 * @returns {object} - { isValid: boolean, error: string|null }
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: messages.validation.emailRequired };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailPattern.test(email.trim());
  
  if (!isValid) {
    return { isValid: false, error: messages.validation.emailInvalid };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validates name
 * @param {string} name - Name to validate
 * @returns {object} - { isValid: boolean, error: string|null }
 */
function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { isValid: false, error: messages.validation.nameRequired };
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    return { isValid: false, error: messages.validation.nameMinLength };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, error: 'Name must be less than 100 characters' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates message
 * @param {string} message - Message to validate
 * @returns {object} - { isValid: boolean, error: string|null }
 */
function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: messages.validation.messageRequired };
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length < 10) {
    return { isValid: false, error: messages.validation.messageMinLength };
  }

  if (trimmedMessage.length > 2000) {
    return { isValid: false, error: 'Message must be less than 2000 characters' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates all inquiry form data
 * @param {object} data - Form data object
 * @returns {object} - { isValid: boolean, errors: object, sanitizedData: object }
 */
function validateInquiryData(data) {
  const errors = {};
  let isValid = true;
  const sanitizedData = {};

  // Check for malicious content in name BEFORE sanitization
  if (data.name && (data.name.includes('<script') || data.name.includes('<') || data.name.includes('>'))) {
    errors.name = messages.validation.nameInvalidCharacters;
    isValid = false;
  }
  
  // Sanitize and validate name
  sanitizedData.name = sanitizeInput(data.name);
  
  // Additional check: if sanitized data is empty but original had content, it contained malicious code
  if (sanitizedData.name === '' && data.name && data.name.trim() !== '') {
    errors.name = messages.validation.nameInvalidCharacters;
    isValid = false;
  } else if (!errors.name) {
    const nameValidation = validateName(sanitizedData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
      isValid = false;
    }
  }

  // Sanitize and validate mobile
  sanitizedData.mobile = sanitizeInput(data.mobile);
  const mobileValidation = validateUAEMobile(sanitizedData.mobile);
  if (!mobileValidation.isValid) {
    errors.mobile = mobileValidation.error;
    isValid = false;
  }

  // Sanitize and validate email
  sanitizedData.email = sanitizeInput(data.email);
  const emailValidation = validateEmail(sanitizedData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
    isValid = false;
  }

  // Check for malicious content in message BEFORE sanitization
  if (data.message && (data.message.includes('<script') || data.message.includes('<') || data.message.includes('>'))) {
    errors.message = messages.validation.messageInvalidCharacters;
    isValid = false;
  }
  
  // Sanitize and validate message
  sanitizedData.message = sanitizeInput(data.message);
  
  // Additional check: if sanitized data is empty but original had content, it contained malicious code
  if (sanitizedData.message === '' && data.message && data.message.trim() !== '') {
    errors.message = messages.validation.messageInvalidCharacters;
    isValid = false;
  } else if (!errors.message) {
    const messageValidation = validateMessage(sanitizedData.message);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.error;
      isValid = false;
    }
  }

  return { isValid, errors, sanitizedData };
}

module.exports = {
  validateUAEMobile,
  validateEmail,
  validateName,
  validateMessage,
  validateInquiryData,
  sanitizeInput
};
