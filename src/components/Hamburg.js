import React, { useContext, useEffect, useState } from "react";
import ChatContext from "../context/chat/chatContext";
import { useNavigate } from "react-router-dom";
import User from "./User";
import toast from "react-hot-toast";

const Hamburg = () => {
  const { chats, fetchChats, selectChat, currentChatId, deleteChat } = useContext(ChatContext);
  const [search, setSearch] = useState("");
  const [localChats, setLocalChats] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchChats(token);
    }
  }, [token]);

  useEffect(() => {
    setLocalChats(chats);
  }, [chats]);

  const handleSearch = (e) => setSearch(e.target.value);

  const filteredChats = localChats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    await deleteChat(id, token);
    setLocalChats((prev) => prev.filter((chat) => chat._id !== id));
    toast.success("Chat deleted");
  };

  const handleChatClick = (chatId, e) => {
    if (e.target.closest(".delete-icon")) return; // Prevent selecting when clicking trash
    selectChat(chatId, token);
  };

  return (
    <div className="p-2">
      {/* Open Offcanvas */}
      <button
        className="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      >
        <i className="bi bi-list fs-2"></i>
      </button>

      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
        data-bs-backdrop="false" // 🛑 This disables auto-close on outside click
        style={{ width: "80vw" }}
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
          {/* 🔍 Search */}
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
                      className={`list-group-item border-0 list-group-item-action d-flex justify-content-between align-items-center ${
                        chat._id === currentChatId ? "bg-secondary text-white" : ""
                      }`}
                      onClick={(e) => handleChatClick(chat._id, e)}
                      role="button"
                    >
                      <span className="text-truncate">{chat.title}</span>

                      {/* Trash Icon (always visible) */}
                      <i
                        className="bi bi-trash-fill text-danger delete-icon"
                        style={{ cursor: "pointer", fontSize: "1.2rem", zIndex: 1055 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(chat._id);
                        }}
                      ></i>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No chats yet</p>
              )}
            </div>
          </div>

          {/* 👤 Bottom User / Login */}
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