import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import http from "../../services/httpService";
import Conversation from "../../components/chat/Conversations";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ChatContext from "../../context/ChatContext";
import {Helmet} from "react-helmet"

const Chat = () => {

  const [loading, setLoading] = useState(false)
  const { conversations,setConversations,setCurrentChat,setentryMessage, socket } = useContext(ChatContext)
  const location = useLocation()

  const { user } = useAuth()

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
    const getConversations = async () => {
      setLoading(true)
      try {
        const res = await http.get("/api/conversation/" + user?._id);
        setConversations(res.data);
        setLoading(false)
      } catch{
        toast.error('مشکلی در دریافت گفتگو ها رخ داد')
        setLoading(false)
      }
    };
    getConversations();
  }, [setConversations, user]);

  useEffect(() => {
    setCurrentChat(conversations?.map(c => c))
  }, [conversations, setCurrentChat])

  return (
    <section className="container mx-auto px-3 mt-10 font-Ilight">
      <Helmet>
        <title>چت های شما</title>
      </Helmet>
      {conversations.length > 0 && !loading ? (
        <div className="grid grid-cols-4 items-baseline">
          <ul className={`text-sm col-span-4 md:col-span-1 ${location.pathname !== '/chat' && 'hidden md:block'}`}>
            <li className="flex justify-between p-3 border border-l-0 border-gray-100">
              <h3>چت دیوار</h3>
            </li>
            {conversations.map((c) => (
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
        ) : loading ? <p className="text-center">لطفا منتظر بمانید ...</p> : <p className="text-center">شما هنوز گفتگو نکردید !</p>}
    </section>
  );
}
export default Chat;