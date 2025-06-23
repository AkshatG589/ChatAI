const jwt = require("jsonwebtoken");

module.exports = function fetchuser(req, res, next) {
  // Get token from header
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user; // { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};