"use client"
import { useEffect, useContext, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";
import ChatContext from "@/context/ChatContext";
import { FiChevronRight } from "react-icons/fi";
import { useConversation } from "@/hooks/fetchData";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Conversation from "./Conversations";

const ChatContainer = ({child}) => {

  const { setConversations,setCurrentChat,setentryMessage, socket } = useContext(ChatContext)
  const pathname = usePathname()
  const router = useRouter()
  
  const { user } = useAuth()
  const {data:conversations, isLoading} = useConversation(user?._id)
const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_BASE_API_URL,{
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
    socket.current.emit("addUser", user?._id);
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
    <section className="container mx-auto px-3 mt-10 font-Ilight">
      {conversations?.length > 0 && !isLoading ? (
        <div className="grid grid-cols-4 items-baseline">
          <button onClick={() => router.push(pathname !== '/chat' ? '/chat' : '/')} className='rounded-xl w-12 h-10 mb-6 -mt-3 bg-red-700 flex items-center justify-center md:hidden'>
              <FiChevronRight size={25} className='text-white'/>
          </button> 
          <ul className={`text-sm col-span-4 md:col-span-1 ${pathname !== '/chat' && 'hidden md:block'}`}>
            <li className="flex justify-between p-3 border border-l-0 border-gray-100">
              <h3>چت دیوار</h3>
            </li>
            {conversations?.map((c) => (
              <Link href={`/chat/${c._id}`} key={c._id}>
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} onlineUsers={onlineUsers}/>
                </div>
              </Link>
            ))}
          </ul>
          <div className={`col-span-4 md:col-span-3 ${pathname === '/chat' ? 'hidden' : 'block'}`}>
              {child}
          </div>
        </div>
        ) : isLoading ? <p className="text-center">لطفا منتظر بمانید ...</p> : <p className="text-center">شما هنوز گفتگو نکردید !</p>}
    </section>
  );
}
export default ChatContainer;