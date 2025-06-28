import React, { useContext, useEffect, useRef } from "react";
import ChatContext from "../context/chat/chatContext";
import { Link } from "react-router-dom";
import ChatBox from "./ChatBox";
import NewChat from "./NewChat";

const AuthMessages = () => {
  const { currentChatId, messages , selectChat} = useContext(ChatContext);
  const messageContainerRef = useRef(null);
  useEffect(() => {
  if (currentChatId) {
    selectChat(currentChatId, localStorage.getItem("token"));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentChatId]);
  // 🔁 Scroll to bottom whenever chat changes or messages update
  
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [currentChatId, messages]);
  return (
    <>
      <div
        ref={messageContainerRef}
        style={{
          position: "fixed",
          left: "0%",
          top: "0%",
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
            }
          `}
        </style>

        {!currentChatId ? (
          <div
            className="d-flex justify-content-center align-items-center text-muted"
            style={{ height: "100%", width: "100%", flexDirection: "column" }}
          >
            <NewChat />
            <h4>Create New Chat</h4>
<Link
  to="/profile"
  className="btn btn-outline-primary fw-bold d-inline-flex align-items-center gap-2"
  style={{ fontSize: "1rem", padding: "8px 16px", borderRadius: "8px" }}
>
  <i className="bi bi-person-lines-fill"></i> Connect with Developer
</Link>
          </div>
        ) : messages.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%", width: "100%" ,flexDirection: "column" }}
          >
            <p className="text-dark fs-4" style={{ fontWeight: "bold" }}>
              What can I help you with?
            </p>
            <Link
  to="/profile"
  className="btn btn-outline-primary fw-bold d-inline-flex align-items-center gap-2"
  style={{ fontSize: "1rem", padding: "8px 16px", borderRadius: "8px" }}
>
  <i className="bi bi-person-lines-fill"></i> Connect with Developer
</Link>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-5 mt-5">
              {/* User */}
              <div className="d-flex justify-content-end">
                <div
                  className="bg-primary text-white p-2 px-3 rounded"
                  style={{ maxWidth: "75%" }}
                >
                  {msg.request}
                </div>
              </div>

              {/* Gemini */}
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

      {/* Fixed ChatBox at bottom */}
      <ChatBox />
    </>
  );
};

export default AuthMessages;