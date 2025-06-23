module.exports = function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 1 * 60 * 1000); // 10 mins
  return { otp, otpExpiry };
};