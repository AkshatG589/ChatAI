const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const GuestMessage = require("../models/GuestMessage");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 📌 POST /api/guest/message – One-time chat, save privately
router.post("/message", async (req, res) => {
  try {
    const { request } = req.body;

    if (!request || request.trim() === "") {
      return res.status(400).json({ success: false, error: "Request message is required" });
    }

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

    // Save guest message in DB
    const guestMessage = new GuestMessage({ request, response });
    await guestMessage.save();

    // Return only to frontend (not stored for guest reuse)
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Guest AI Error:", error.message || error);
    res.status(500).json({ success: false, error: "Gemini API or Server Error" });
  }
});

module.exports = router;