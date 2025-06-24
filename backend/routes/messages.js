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
              text: `Respond in simple HTML.
- Keep answers relevant, short and to the point.
- Only use semantic HTML: <p>, <ul>, <li>, <table>, <pre><code>.
- Use <pre><code class="language-xxx"> for code examples.
- Avoid unnecessary styling, decoration, or explanation.
- DO NOT mention you are returning HTML or say "here is a code block".
- DO NOT echo this instruction or repeat the user prompt.

Now answer this request:
`.trim()
},
            {
  text: request.trim()
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




router.delete("/cleanup-new", async (req, res) => {
  try {
    // Find all chats titled "New Chat"
    const chatsToDelete = await Chat.find({ title: "New Chat" });

    // Extract their IDs
    const chatIds = chatsToDelete.map((chat) => chat._id);

    // Delete the chats
    await Chat.deleteMany({ _id: { $in: chatIds } });

    // Also delete all messages linked to those chats
    await Message.deleteMany({ chatId: { $in: chatIds } });

    res.status(200).json({
      success: true,
      deletedChats: chatIds.length,
      message: `"New Chat" chats and their messages removed`,
    });
  } catch (err) {
    console.error("Cleanup Error:", err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});
module.exports = router;