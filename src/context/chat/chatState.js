import { useState } from "react";
import ChatContext from "./chatContext";

const ChatState = ({ children }) => {
  const host = process.env.REACT_APP_API_BASE;

  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
//  const [guestMessages, setGuestMessages] = useState([]);

  // 📌 Fetch all chats
  const fetchChats = async (token) => {
    try {
      const res = await fetch(`${host}/api/chats`, {
        headers: {
          "auth-token": token,
        },
      });
      const data = await res.json();
      if (data.success) setChats(data.chats);
    } catch (err) {
      console.error("Fetch Chats Error:", err);
    }
  };

  // 📌 Create new chat
  const createChat = async (token) => {
    try {
      const res = await fetch(`${host}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setChats([data.chat, ...chats]);
        setCurrentChatId(data.chat._id); // ✅ Fix: chat object is under `data.chat`
        return data.chat;
      }
    } catch (err) {
      console.error("Create Chat Error:", err);
    }
  };

  // 📌 Select a chat and load messages
  const selectChat = async (chatId, token) => {
    try {
      const res = await fetch(`${host}/api/messages/${chatId}`, {
        headers: {
          "auth-token": token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setCurrentChatId(chatId);
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Select Chat Error:", err);
    }
  };

  // 📌 Send message to Gemini and get response
  const sendMessage = async (chatId, request, token) => {
    try {
      const res = await fetch(`${host}/api/messages/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ request }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (err) {
      console.error("Send Message Error:", err);
    }
  };
//deleting chat
const deleteChat = async (chatId, token) => {
  try {
    const res = await fetch(`${host}/api/chats/${chatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const data = await res.json();
    if (data.success) {
      // ✅ Remove chat from local state
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));

      // ✅ If deleted chat was the current chat, clear it
      if (chatId === currentChatId) {
        setCurrentChatId(null);
        setMessages([]);
      }
    }
  } catch (err) {
    console.error("Delete Chat Error:", err.message);
  }
};

//sending guest requests
/*
const sendGuestMessage = async (request) => {
  try {
    const res = await fetch(`${host}/api/guest/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request }),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to get AI response");
    }
    setGuestMessages((prev) => [...prev, { request: request, response: data.response }]);
  } catch (error) {
    console.error("Guest Message Error:", error.message);
    return null;
  }
};
*/
  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        messages,
        fetchChats,
        createChat,
        selectChat,
        sendMessage,
        deleteChat,
        /*sendGuestMessage,
        guestMessages,*/
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatState;