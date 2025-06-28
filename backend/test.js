const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ✅ Use GPT-3.5
      messages: [{ role: "user", content: "What is Java?" }],
    });

    const response = chatCompletion.choices[0].message.content;
    console.log("✅ OpenAI Response:", response);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

test();