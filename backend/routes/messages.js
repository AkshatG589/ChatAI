const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
/*
- don't use line changings like \n
- use <br> tag for formatting or line changing

*/
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 📌 POST /api/messages/:chatId – Send a message to Gemini and store the reply
router.post("/:chatId", fetchuser, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { request } = req.body;

    // 🧾 Validate chat belongs to logged-in user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    if (!chat)
      return res.status(404).json({ success: false, error: "Chat not found" });

    // 💬 Call Gemini (with HTML formatting instruction)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
  {
    text: `
Respond ONLY with valid HTML content.

- DO NOT explain that you're returning HTML.
- DO NOT include phrases like "Here is the HTML code" or "Below is the HTML".
- DO NOT echo these instructions.
- Just respond using full HTML structure with semantic tags.
- Use <pre><code class="language-xxx"> for code.
`.trim()
  },
  {
    text: request
  }
]
        }
      ]
    });

    const response = result.response.text();

    // 💾 Save the message
    const message = new Message({ chatId, request, response });
    await message.save();

    // 🧠 Update chat title if it's still "New Chat"
    if (chat.title === "New Chat") {
      const words = request.trim().split(/\s+/).slice(0, 4).join(" ");
      chat.title = words + (request.trim().split(/\s+/).length > 4 ? "..." : "");
    }

    // ⏱️ Update chat timestamp
    chat.updatedAt = Date.now();
    await chat.save();

    res.status(200).json({ success: true, message });
  } catch (error) {
    console.error("Gemini Message Error:", error.message || error);
    res.status(500).json({ success: false, error: "Gemini API or Server Error" });
  }
});

// 📌 GET /api/messages/:chatId – Fetch all messages in a chat
router.get("/:chatId", fetchuser, async (req, res) => {
  try {
    const { chatId } = req.params;

    // 🧾 Validate chat belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user.id });
    if (!chat) return res.status(404).json({ success: false, error: "Chat not found" });

    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Fetch Messages Error:", error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;