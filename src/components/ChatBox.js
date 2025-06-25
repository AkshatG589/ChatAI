// src/components/ChatBox.js
import React, { useState, useContext } from "react";
import ChatContext from "../context/chat/chatContext";
import "./css/animation.css"
const ChatBox = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentChatId, sendMessage ,sendGuestMessage} = useContext(ChatContext);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const trimmed = prompt.trim();
  if (!trimmed) return;

  setLoading(true);

  const token = localStorage.getItem("token");

  if (token && currentChatId) {
    // Authenticated user
    await sendMessage(currentChatId, trimmed, token);
  } else {
    // Guest user
     await sendGuestMessage(trimmed);
  }

  setPrompt("");
  setLoading(false);
};

  return (
    <form
      onSubmit={handleSubmit}
      className="position-fixed bottom-0 start-0 w-100 bg-white border-top p-2"
      style={{ zIndex: 10 }}
    >
      <div className="container d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
<button
  className="btn btn-dark d-flex align-items-center justify-content-center"
  type="submit"
  disabled={!prompt.trim() || loading}
  style={{ width: "3rem", height: "3rem" }}
>
  {loading ? (
    <i
      className="bi bi-arrow-repeat"
      style={{
        fontSize: "1.4rem",
        animation: "spin 1s linear infinite",
        display: "inline-block",
      }}
    ></i>
  ) : (
    <i className="bi bi-arrow-up-circle" style={{ fontSize: "1.4rem" }}></i>
  )}
</button>
      </div>
    </form>
  );
};

export default ChatBox;