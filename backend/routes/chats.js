const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const fetchuser = require("../middleware/fetchuser");

// 📌 POST /api/chats — Create a new chat
router.post("/", fetchuser, async (req, res) => {
  try {
    const chat = new Chat({ userId: req.user.id });
    await chat.save();
    res.status(201).json({ success: true, chat });
  } catch (err) {
    console.error("Create Chat Error:", err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// 📌 GET /api/chats — Get all user's chats
router.get("/", fetchuser, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, chats });
  } catch (err) {
    console.error("Fetch Chats Error:", err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// 📌 DELETE /api/chats/:id — Delete a chat
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    // Step 1: Delete the chat
    const chat = await Chat.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!chat) {
      return res.status(404).json({ success: false, error: "Chat not found" });
    }

    // ✅ Step 2: Delete all messages for this chat
    await Message.deleteMany({ chatId: req.params.id });

    res.status(200).json({ success: true, message: "Chat and its messages deleted successfully" });
  } catch (err) {
    console.error("Delete Chat Error:", err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// 📌 PUT /api/chats/:id — Rename chat title
router.put("/:id", fetchuser, async (req, res) => {
  try {
    const { title } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, updatedAt: Date.now() },
      { new: true }
    );
    if (!chat) return res.status(404).json({ success: false, error: "Chat not found" });

    res.status(200).json({ success: true, chat });
  } catch (err) {
    console.error("Rename Chat Error:", err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;