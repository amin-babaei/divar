import { Link, useLocation } from "react-router";
import Conversation from "./Conversation";

const ChatList = ({ conversations, currentUser, onlineUsers, setCurrentChat }) => {
    const location = useLocation();

    return (
        <ul
            className={`text-sm col-span-4 md:col-span-1 ${location.pathname !== "/chat" && "hidden md:block"
                }`}
        >
            <li className="flex justify-between p-3 border border-l-0 border-gray-100">
                <h3 className="font-normal">چت دیوار</h3>
            </li>
            {conversations?.map((c) => (
                <Link to={`/chat/${c._id}`} key={c._id}>
                    <div onClick={() => setCurrentChat(c)}>
                        <Conversation
                            conversation={c}
                            currentUser={currentUser}
                            onlineUsers={onlineUsers}
                        />
                    </div>
                </Link>
            ))}
        </ul>
    );
};

export default ChatList;