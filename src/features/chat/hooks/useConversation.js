import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import ChatContext from "@/context/ChatContext";
import { useGetConversation } from "./useUsersConversationApi";
import { useAuth } from "@/context/AuthContext";

export const useConversation = () => {
  const {
    setConversations,
    setCurrentChat,
    setentryMessage,
    socket
  } =
  useContext(ChatContext);

  const { user } = useAuth();
  const { data: conversations, isLoading } = useGetConversation(user?._id);

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io(
      import.meta.env.VITE_BASE_API_URL, {
        transports: ["websocket", "polling"],
      });

    socket.current.on("getMessage", (data) => {
      setentryMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [setentryMessage, socket]);

  useEffect(() => {
    if (!user?._id) return;

    socket.current.emit("addUser", user._id);

    socket.current.on("users:update", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [socket, user]);

  useEffect(() => {
    if (conversations) {
      setConversations(conversations.map((c) => c));
    }
  }, [conversations, setConversations]);

  return {
    conversations,
    isLoading,
    onlineUsers,
    setCurrentChat,
    user
  };
};