import { createContext, useRef, useState } from "react";

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [entryMessage, setentryMessage] = useState(null);
    const socket = useRef();
    return (
        <ChatContext.Provider
            value={{
                conversations,setConversations,
                currentChat,setCurrentChat,
                entryMessage,setentryMessage,
                socket
            }}>{children}</ChatContext.Provider>
    )
}

export default ChatContext;