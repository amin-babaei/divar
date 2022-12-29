import moment from 'jalali-moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { RiMore2Fill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import ChatContext from '../../context/ChatContext'
import { useUser } from '../../hooks/fetchData'
import http from '../../services/httpService'

const Message = () => {
    const {socket,entryMessage,currentChat} = useContext(ChatContext)
    const {user} = useAuth()

    const [messages, setMessages] = useState([]);
    const [userReceiver, setUserReceiver] = useState(user._id);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();

    const {data} = useUser(userReceiver)

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
      
      useEffect(() => {
          entryMessage &&
          currentChat?.members.includes(entryMessage.sender) &&
          setMessages((prev) => [...prev, entryMessage]);
      }, [entryMessage, currentChat]);
      useEffect(()=>{
        const receiverId = currentChat?.members.find(
          (member) => member !== user._id
        );
        setUserReceiver(receiverId)
      },[currentChat?.members, user._id])
      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat?._id,
        };
    
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
    
        socket?.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });

        try {
          if(newMessage.trim().length === 0){
            toast.error('متن ارسالی شما خالی است !')
          }else{
            const res = await http.post("/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
          }
        } catch (err) {
          toast.error(err.message)
        }
      };
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
      
    return (
        <>
            <div className="flex justify-between items-center border-b border-b-gray-100 py-[3px]">
                <h3 className="mr-4 border-r-2 pr-2">{data?.data?.name}</h3>
                <button className='rounded-full duration-500 hover:bg-gray-200 p-3 ml-4'>
                    <RiMore2Fill className="text-gray-500" />
                </button>
            </div>
            <div className="border border-gray-100 h-[39rem] overflow-y-auto flex flex-col justify-between">
                <div>
                    {messages.map(m => (
                        <div key={m._id} ref={scrollRef} className={`p-3 rounded-2xl rounded-br-none w-2/5 m-3 ${m.sender === user._id ? 'bg-blue-100' : 'bg-gray-100 mr-auto rounded-bl-none'}`}>
                            <p className='text-sm'>{m.text}</p>
                            <p className="text-xs mt-5">{moment(m.createdAt).locale('fa').fromNow()}</p>
                        </div>
                    ))}
                </div>
                <div className="sticky bottom-0">
                    <input type='text' placeholder="متنی بنویسید ..." className='w-full py-3 outline-none border-t-2 border-gray-100 focus:ring-0 focus:border-gray-300' onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}/>
                    <button className='absolute top-2 left-5 rounded-full duration-500 bg-red-700 hover:bg-red-500 p-2'onClick={handleSubmit}>
                        <FiSend className="text-white" size={21} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Message