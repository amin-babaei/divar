import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import ChatContext from "@/context/ChatContext";
import http from "@/services/httpService";

export const useChatMessages = (chatId, loadMessages, submit) => {
  const { socket, entryMessage, currentChat, conversations, setCurrentChat } =
    useContext(ChatContext);
  const { user } = useAuth();
  const [messages, setMessages] = useState(loadMessages);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    setMessages(loadMessages);
  }, [loadMessages]);

  useEffect(() => {
    let current = conversations.filter((c) => c._id === chatId);
    if (current) setCurrentChat(current[0]);
  }, [chatId, conversations, setCurrentChat]);

  useEffect(() => {
    if (entryMessage) {
      currentChat?.members.includes(entryMessage.sender);
      setMessages((prev) => [...prev, entryMessage]);
    }
  }, [entryMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loadingMsg]);

  useEffect(() => {
    setNewMessage("");
    setIsTyping(false);
    socket.current.emit("stopTyping");
  }, [currentChat?._id, socket]);

  useEffect(() => {
    socket.current.on("typing", ({ senderId, receiverId }) => {
      const values = [senderId, receiverId[0]];
      if (
        senderId !== user._id &&
        values.every((val) => currentChat?.members?.includes(val))
      ) {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });
    socket.current.on("stopTyping", () => {
      setIsTyping(false);
    });
  }, [currentChat?.members, user._id]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value !== "") {
      socket.current.emit("typing", {
        senderId: user._id,
        receiverId: currentChat.members.filter((m) => m !== user._id),
      });
    } else {
      socket.current.emit("stopTyping");
    }
  };

  const handleSubmit = async (e, userReceiver) => {
    e.preventDefault();
    setLoadingMsg(true);

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: chatId,
    };

    socket?.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: userReceiver,
      text: newMessage,
    });

    if (newMessage.trim().length === 0) {
      toast.error("متن ارسالی شما خالی است !");
      setLoadingMsg(false);
      return;
    }

    try {
      const res = await http.post("/api/messages", message);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
      socket.current.emit("stopTyping");
    } catch (err) {
      toast.error("دوباره تلاش کنید");
    } finally {
      setLoadingMsg(false);
    }
  };

  const handleDeleteChat = (userId) => {
    const formData = new FormData();
    formData.append("userId", userId);
    submit(formData, { method: "DELETE", action: `/chat/${chatId}` });
  };

  return {
    messages,
    newMessage,
    isTyping,
    loadingMsg,
    scrollRef,
    handleChange,
    handleSubmit,
    handleDeleteChat,
  };
};
