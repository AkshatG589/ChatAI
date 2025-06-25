import React, { useContext, useEffect, useState } from "react";
import ChatContext from "../context/chat/chatContext";
import ChatBox from "./ChatBox";

const GuestMessages = () => {
  const { guestMessages } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  // Sync local messages with context
  useEffect(() => {
    setMessages(guestMessages);
  }, [guestMessages]);

  return (
    <>
      {/* Message Display Area */}
      <div
        style={{
          position: "fixed",
          top: "0%",
          left: "0%",
          width: "100vw",
          height: "80vh",
          overflowY: "scroll",
          padding: "1rem",
          wordWrap: "break-word",
          wordBreak: "break-word",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="bg-light hide-scroll mt-5"
      >
        <style>
          {`
            .hide-scroll::-webkit-scrollbar {
              display: none;
            `}
        </style>

        {messages.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: "100%" }}>
            <h4>Ask something to ChatAI</h4>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-5 mt-5">
              {/* Guest Message */}
              <div className="d-flex justify-content-end">
                <div className="bg-primary text-white p-2 px-3 rounded" style={{ maxWidth: "75%" }}>
                  {msg.request}
                </div>
              </div>

              {/* Gemini AI Response */}
              <div className="d-flex justify-content-start mt-2">
                <div
                  className="bg-white text-dark p-2 px-3 rounded shadow-sm"
                  style={{ maxWidth: "100%", wordBreak: "break-word", width: "fit-content" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: msg.response.replace(/^```+|```+$/g, "").trim(),
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reuse Common ChatBox */}
      <ChatBox />
    </>
  );
};

export default GuestMessages;