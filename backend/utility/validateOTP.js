module.exports = function validateOTP(otpInput, savedOtp, otpExpiry) {
  if (!savedOtp || !otpExpiry) return { success: false, message: "OTP not found or expired" };

  if (savedOtp !== otpInput) return { success: false, message: "Invalid OTP" };

  if (new Date() > otpExpiry) return { success: false, message: "OTP has expired" };

  return { success: true };
};