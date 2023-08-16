// server/routes/api.js
const express = require('express');
const router = express.Router();
const OtpModel = require('../models/OTPSchema');
const nodemailer = require('nodemailer');

router.post('/generateOTP', async (req, res) => {
  const email = req.body.email;
  
  // Generate OTP and save it in the database
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OtpModel.findOneAndUpdate({ email }, { otp }, { upsert: true });

  // Send OTP via Email
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'Gmail'
    auth: {
      user: 'globalsuccess080@gmail.com',
      pass: 'zjymkcbmjxaslkgk',
    },
  });
 
  const mailOptions = {
    from: 'globalsuccess080@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.json({ message: 'OTP generated and sent successfully' });
});

router.post('/verifyOTP', async (req, res) => {
  const email = req.body.email;
  const userOTP = req.body.otp;

  // Retrieve user's OTP from the database
  const user = await OtpModel.findOne({ email });

  if (!user || user.otp !== userOTP) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // Mark the user as verified
  user.isVerified = true;
  await user.save();

  res.json({ message: 'OTP verified successfully' });
});

module.exports = router;
