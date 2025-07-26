const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGODB_URI);

// Check database connected or not
connect
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Database cannot be Connected");
  });

// Create Schema
const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      /*validate: {
        validator: function (v) {
          // Accepts: +9715XXXXXXXX or 05XXXXXXXX
          return /^(\+9715\d{8}|05\d{8})$/.test(v);
        },
        message: (props) => `${props.value} is not a valid UAE mobile number!`,
      },*/
    },
    email: {
      type: String,
      required: true,
    },
    inquiry: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// collection part
const newCollection = new mongoose.model("inquiries", InquirySchema);

module.exports = newCollection;
