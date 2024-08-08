const OTP = require('../models/otp');
const crypto = require('crypto');
const { Op } = require('sequelize');

const generateOTP = () => crypto.randomBytes(3).toString('hex');

const saveOTP = async (user_id) => {
  await OTP.destroy({ where: { user_id } });

  const otp = generateOTP();
//   console.log(otp)
  const expires_at = new Date(Date.now() + 15 * 60 * 1000);
  await OTP.create({ user_id, otp, expires_at });
  return otp;
};

const verifyOTP = async (user_id, otp) => {
  const record = await OTP.findOne({ where: { user_id, otp} });
  if (record) {
    await OTP.destroy({ where: { id: record.id } });
    return true;
  }
  return false;
};

module.exports = { saveOTP, verifyOTP };
