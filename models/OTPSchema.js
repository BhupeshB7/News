// server/models/User.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  isVerified: Boolean,
});

module.exports = mongoose.model('OTP', otpSchema);
