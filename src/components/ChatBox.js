// src/components/ChatBox.js
import React, { useState, useContext } from "react";
import ChatContext from "../context/chat/chatContext";
import "./css/animation.css";

const ChatBox = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentChatId, sendMessage } = useContext(ChatContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = prompt.trim();
    if (!trimmed || !currentChatId) return;

    setLoading(true);

    const token = localStorage.getItem("token");
    await sendMessage(currentChatId, trimmed, token);

    setPrompt("");
    setLoading(false);
  };

  // Submit on Ctrl+Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="position-fixed bottom-0 start-0 w-100 bg-white border-top p-2"
      style={{ zIndex: 10 }}
    >
      <div className="container d-flex gap-2">
        <textarea
          className="form-control text-muted"
          placeholder={
            currentChatId
              ? "Type your message..."
              : "Select or create a chat to type ..."
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!currentChatId}
          rows={1}
          style={{ resize: "none", maxHeight: "200px" }}
        ></textarea>

        <button
          className="btn btn-dark d-flex align-items-center justify-content-center"
          type="submit"
          disabled={!prompt.trim() || loading || !currentChatId}
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
            <i
              className="bi bi-arrow-up-circle"
              style={{ fontSize: "1.4rem" }}
            ></i>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatBox;