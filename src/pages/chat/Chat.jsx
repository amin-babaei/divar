import { useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import Conversation from "../../components/chat/Conversations";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ChatContext from "../../context/ChatContext";
import {Helmet} from "react-helmet"
import { FiChevronRight } from "react-icons/fi";
import { useConversation } from "../../hooks/fetchData";

const Chat = () => {

  const { setConversations,setCurrentChat,setentryMessage, socket } = useContext(ChatContext)
  const location = useLocation()
  const navigate = useNavigate()
  
  const { user } = useAuth()
  const {data:conversations, isLoading} = useConversation(user?._id)

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
  }, [socket, user]);

  useEffect(() => {
    if(conversations){
      setConversations(conversations?.map(c => c))
    }
  }, [conversations, setConversations])

  return (
    <section className="container mx-auto px-3 mt-10 font-Ilight">
      <Helmet>
        <title>چت های شما</title>
      </Helmet>
      {conversations?.length > 0 && !isLoading ? (
        <div className="grid grid-cols-4 items-baseline">
          <button onClick={() => navigate(location.pathname !== '/chat' ? '/chat' : '/')} className='rounded-xl w-12 h-10 mb-6 -mt-3 bg-red-700 flex items-center justify-center md:hidden'>
              <FiChevronRight size={25} className='text-white'/>
          </button> 
          <ul className={`text-sm col-span-4 md:col-span-1 ${location.pathname !== '/chat' && 'hidden md:block'}`}>
            <li className="flex justify-between p-3 border border-l-0 border-gray-100">
              <h3>چت دیوار</h3>
            </li>
            {conversations?.map((c) => (
              <Link to={`/chat/${c._id}`} key={c._id}>
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
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