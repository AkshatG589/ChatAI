import React, { useContext, useEffect, useState } from "react";
import ChatContext from "../context/chat/chatContext";
import { useNavigate } from "react-router-dom";
import User from "./User"

const Hamburg = () => {
  const { chats, fetchChats, selectChat ,currentChatId } = useContext(ChatContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchChats(token);
  }, [token]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-2">
      {/* Button trigger */}
      <button
        className="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        <i className="bi bi-list fs-2"></i>
      </button>

      {/* Bootstrap Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
        style={{ width: "80vw" }} // ✅ Custom width
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column justify-content-between h-100">
          {/* Top: Search + Chat List */}
          <div>
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2 mb-3 shadow-sm"
              placeholder="Search chats..."
              value={search}
              onChange={handleSearch}
            />

            <h6 className="fw-bold mb-2">Chats</h6>
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              {filteredChats.length > 0 ? (
                <ul className="list-group">
                  {filteredChats.map((chat) => (
                    <li
                      key={chat._id}
                      className={`list-group-item list-group-item-action ${chat._id === currentChatId ? "bg-secondary text-white" : ""}`}
                      onClick={() => selectChat(chat._id, token)}
                      data-bs-dismiss="offcanvas"
                      role="button"
                    >
                      {chat.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No chats yet</p>
              )}
            </div>
          </div>

          {/* Bottom: User or Login */}
          <div className="mt-3">
            {token ? (
            <User />
            ) : (
              <button
                className="btn btn-dark text-white w-100"
                onClick={() => navigate("/login")}
              >
                Login to Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburg;