const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password:{ 
    type: String, 
    required: true 
  },
  otp:{ 
    type: String 
  },
  otpExpiry:{ 
    type: Date 
  },
  verified:{ 
    type: Boolean, 
    default: false 
  }  // ✅ Add this field
});

module.exports = mongoose.model("User", UserSchema);