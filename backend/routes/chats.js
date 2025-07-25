const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const mongoose = require("mongoose");
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

// 📌 DELETE /api/chats/:id — Delete a chat and its messages
router.delete("/:id", fetchuser, async (req, res) => {
  try {
    const chatIdParam = req.params.id;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(chatIdParam)) {
      return res.status(400).json({ success: false, error: "Invalid chat ID" });
    }

    const chatId = new mongoose.Types.ObjectId(chatIdParam);

    // Step 1: Delete the chat owned by the user
    const chat = await Chat.findOneAndDelete({
      _id: chatId,
      userId: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({ success: false, error: "Chat not found" });
    }

    // Step 2: Delete all messages linked to this chat
    const deleteResult = await Message.deleteMany({ chatId: chatId });

    res.status(200).json({
      success: true,
      message: "Chat and its messages deleted successfully",
      deletedMessages: deleteResult.deletedCount,
    });
  } catch (err) {
    console.error("Delete Chat Error:", err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});


module.exports = router;