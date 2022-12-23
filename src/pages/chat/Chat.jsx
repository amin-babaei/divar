import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { RiMore2Fill } from "react-icons/ri";
import { FiSend } from 'react-icons/fi'
import http from "../../services/httpService";
import Conversation from "../../components/chat/Conversations";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user } = useAuth()

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => users);
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await http.get("/api/conversation/" + user?._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await http.get("/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  return (
    <section className="container mx-auto px-3 mt-10 font-Ilight">
      <div className="grid grid-cols-4 gap-1 items-baseline">
        <ul className="text-sm">
          <li className="flex justify-between p-3 border border-l-0 border-gray-100">
            <h3>چت دیوار</h3>
          </li>
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </ul>
        <div className="col-span-3">
          <div className="flex justify-between items-center border-b border-b-gray-100 py-[3px]">
            <h3 className="mr-4 border-r-2 pr-2">نام طرف</h3>
            <button className='rounded-full duration-500 hover:bg-gray-200 p-3 ml-4'>
              <RiMore2Fill className="text-gray-500" />
            </button>
          </div>
          <div className="border border-gray-100 h-[38rem] overflow-y-auto flex flex-col justify-between">
            <div>
            <div className="bg-blue-100 p-3 rounded-2xl rounded-br-none w-1/2 m-3">
                <h4>متن پیام من</h4>
                <p className="text-xs mt-5">1401/12/3</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none w-1/2 m-3 mr-auto">
                <h4>متن پیام متقابل</h4>
                <p className="text-xs mt-5">1401/12/3</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-2xl rounded-br-none w-1/2 m-3">
                <h4>متن پیام من</h4>
                <p className="text-xs mt-5">1401/12/3</p>
              </div>
            </div>
            <div className="sticky bottom-0">
              <input type='text' placeholder="متنی بنویسید" className='w-full py-3 outline-none border-t-2 border-gray-100 focus:ring-0 focus:border-gray-300' />
              <FiSend className="absolute top-4 left-3 text-gray-500" size={23} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
