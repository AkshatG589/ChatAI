import React, { useContext } from "react";
import ChatContext from "../context/chat/chatContext";

const DisplayCurrent = () => {
  const { currentChatId, messages } = useContext(ChatContext);

  if (!currentChatId) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-muted"
        style={{
          position: "fixed",
          top: "0vh",
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h4>New Chat</h4>
      </div>
    );
  }

  return (
    <>
    <div
      style={{
        position: "fixed",
        left: "0%",
        width: "100vw",
        height: "70vh",
        overflowY: "scroll", // keep scrolling enabled
        padding: "1rem",
        wordWrap: "break-word",
        wordBreak: "break-word",

        /* 🔽 Hide scrollbar (works for modern browsers) */
        scrollbarWidth: "none",       // Firefox
        msOverflowStyle: "none",      // IE/Edge
      }}
      className="bg-light hide-scroll"
    >
      <style>
        {`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {messages.length === 0 ? (
        <p className="text-center text-muted">No messages yet.</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="mb-5 mt-5">
            {/* User Message */}
            <div className="d-flex justify-content-end">
              <div
                className="bg-primary text-white p-2 px-3 rounded"
                style={{ maxWidth: "75%" }}
              >
                {msg.request}
              </div>
            </div>

            {/* Gemini Response */}
            <div className="d-flex justify-content-start mt-2">
              <div
                className="bg-white text-dark p-2 px-3 rounded shadow-sm"
                style={{
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  width: "fit-content",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.response }} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    <div className="bg-dark">hello</div>
    </>
  );
};

export default DisplayCurrent;