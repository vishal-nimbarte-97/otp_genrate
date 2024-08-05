const express = require('express');
const otpController = require('../controllers/otpController');

const router = express.Router();

router.post('/request-otp', otpController.requestOTP);
router.post('/verify-otp', otpController.verifyOTP);

module.exports = router;
