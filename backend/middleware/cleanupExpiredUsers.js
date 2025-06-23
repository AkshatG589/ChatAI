// middleware/cleanupExpiredUsers.js
const User = require("../models/User");

const cleanupExpiredUsers = async (req, res, next) => {
  try {
    // Remove all unverified users regardless of expiry
    const result = await User.deleteMany({ verified: false });
    console.log(`🧹 Deleted ${result.deletedCount} unverified users`);
  } catch (error) {
    console.error("🛑 Cleanup error:", error.message);
  }

  next(); // ✅ Proceed to next middleware/route
};

module.exports = cleanupExpiredUsers;