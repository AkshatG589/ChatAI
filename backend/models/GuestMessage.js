const mongoose = require("mongoose");

const GuestMessageSchema = new mongoose.Schema({
  request: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("GuestMessage", GuestMessageSchema);