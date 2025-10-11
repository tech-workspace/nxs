const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGODB_URI);

// Check database connected or not
connect
  .then(() => {
  })
  .catch(() => {
  });

// Create Schema
const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name must be less than 100 characters'],
    },
    mobile: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          if (!v || typeof v !== 'string') return false;
          
          // Remove all non-digit characters except +
          const cleanMobile = v.replace(/[^\d+]/g, '').trim();
          
          // Valid UAE mobile prefixes
          const validPrefixes = ['50', '51', '52', '54', '55', '56'];
          
          // Check different UAE mobile number formats
          if (cleanMobile.startsWith('+971') && cleanMobile.length === 13) {
            // International format: +971501234567, +971568863388
            const prefix = cleanMobile.substring(4, 6);
            return validPrefixes.includes(prefix);
          } else if (cleanMobile.startsWith('971') && cleanMobile.length === 12) {
            // International format without +: 971501234567, 971568863388
            const prefix = cleanMobile.substring(3, 5);
            return validPrefixes.includes(prefix);
          } else if (cleanMobile.startsWith('0') && cleanMobile.length === 10) {
            // Local format: 0501234567, 0568863388
            const prefix = cleanMobile.substring(1, 3);
            return validPrefixes.includes(prefix);
          } else if (cleanMobile.length === 9) {
            // Local format without 0: 501234567, 568863388
            const prefix = cleanMobile.substring(0, 2);
            return validPrefixes.includes(prefix);
          }
          
          return false;
        },
        message: (props) => `${props.value} is not a valid UAE mobile number! Please use formats like 0501234567, or +971501234567`,
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          if (!v || typeof v !== 'string') return false;
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailPattern.test(v.trim());
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    message: {
      type: String,
      required: true,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [2000, 'Message must be less than 2000 characters'],
    },
    isRead: {
      type: Boolean,
      required: true,
      default: false, // Default value for isread
    },
  },
  {
    timestamps: true,
  }
);

// collection part
const newCollection = new mongoose.model("inquiries", InquirySchema);

module.exports = newCollection;
