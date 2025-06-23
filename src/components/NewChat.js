// src/components/NewChat.js
import React, { useContext } from "react";
import ChatContext from "../context/chat/chatContext";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NewChat = () => {
  const { createChat, createGuestChat } = useContext(ChatContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNewChat = async () => {
    if (token) {
      // Logged-in user
      const newChat = await createChat(token);
      if (newChat && newChat._id) {
        toast.success("New chat created!");
        navigate(`/`);
      } else {
        toast.error("Failed to create chat");
      }
    } else {
      // Guest user: send dummy message or empty one
      const guestResponse = await createGuestChat("Hello");
      if (guestResponse && guestResponse.success) {
        toast.success("Guest chat started!");
        navigate("/guest"); // You can change this route as needed
      } else {
        toast.error(guestResponse.error || "Failed to start guest chat");
      }
    }
  };

  return (
    <button className="btn btn-light d-flex align-items-center gap-2" onClick={handleNewChat}>
      <i className="bi bi-pencil-square fs-2 fs-md-1 fs-lg-1"></i>
    </button>
  );
};

export default NewChat;