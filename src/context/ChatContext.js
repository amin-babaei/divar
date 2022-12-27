import { createContext, useState } from "react";

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [entryMessage, setentryMessage] = useState(null);

    return (
        <ChatContext.Provider
            value={{
                conversations,setConversations,
                currentChat,setCurrentChat,
                entryMessage,setentryMessage,
            }}>{children}</ChatContext.Provider>
    )
}

export default ChatContext;