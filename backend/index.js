require("dotenv").config()
const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors'); // ✅ Import cors

// ✅ Enable CORS for all origins (or configure it)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/chats", require("./routes/chats"))
app.use("/api/messages", require("./routes/messages"))
app.use("/api/guest", require("./routes/guestMessages"))
// Test route*/

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`gpt clone backend listening on port ${port}`);
});