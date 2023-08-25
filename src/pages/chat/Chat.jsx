import { useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import Conversation from "../../components/chat/Conversations";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ChatContext from "../../context/ChatContext";
import { SEO } from "../../utils/SEO";
import { FiChevronRight } from "react-icons/fi";
import { useConversation } from "../../hooks/api/useUserApi";

const Chat = () => {

  const { setConversations,setCurrentChat,setentryMessage, socket } = useContext(ChatContext)
  const location = useLocation()
  const navigate = useNavigate()
  
  const { user } = useAuth()
  const {data:conversations, isLoading} = useConversation(user?._id)
const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BASE_API_URL,{
      transports:['websocket', 'polling']
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
    socket.current.emit("addUser", user._id);
    socket.current.on('users:update', (users) => {
      setOnlineUsers(users);
    });
    socket.current.on('getUsers' , (users)=> {
      setOnlineUsers(users)
    })
    return () => {
      socket.current.disconnect();
    };
  }, [socket, user]);

  useEffect(() => {
    if(conversations){
      setConversations(conversations?.map(c => c))
    }
  }, [conversations, setConversations])

  return (
    <section className="container mx-auto px-3 mt-10 font-light">
      <SEO title="امین دیوار - چت"/>
      {conversations?.length > 0 && !isLoading ? (
        <div className="grid grid-cols-4 items-baseline">
          <button onClick={() => navigate(location.pathname !== '/chat' ? '/chat' : '/')} className='rounded w-12 h-10 mb-6 -mt-3 flex shadow-md items-center justify-center md:hidden'>
              <FiChevronRight size={25}/>
          </button> 
          <ul className={`text-sm col-span-4 md:col-span-1 ${location.pathname !== '/chat' && 'hidden md:block'}`}>
            <li className="flex justify-between p-3 border border-l-0 border-gray-100">
              <h3 className="font-normal">چت دیوار</h3>
            </li>
            {conversations?.map((c) => (
              <Link to={`/chat/${c._id}`} key={c._id}>
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} onlineUsers={onlineUsers}/>
                </div>
              </Link>
            ))}
          </ul>
          <div className={`col-span-4 md:col-span-3 ${location.pathname === '/chat' ? 'hidden' : 'block'}`}>
              <Outlet />
          </div>
        </div>
        ) : isLoading ? <p className="text-center">لطفا منتظر بمانید ...</p> : <p className="text-center">شما هنوز گفتگو نکردید !</p>}
    </section>
  );
}
export default Chat;