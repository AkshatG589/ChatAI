const mongoose = require('mongoose');
const connectToMongo = async () => {
  const uri = process.env.MONGO_URI
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToMongo;