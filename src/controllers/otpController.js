const otpService = require('../services/otpService');

const requestOTP = async (req, res) => {
  const { user_id } = req.body;
  const otp = await otpService.saveOTP(user_id);
  res.json({ message: 'OTP generated', otp });
};

const verifyOTP = async (req, res) => {
  const { user_id, otp } = req.body;
  const isValid = await otpService.verifyOTP(user_id, otp);
  if (isValid) {
    res.json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ message: 'Invalid or expired OTP' });
  }
};

module.exports = { requestOTP, verifyOTP };
