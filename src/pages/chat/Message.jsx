import moment from 'jalali-moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { RiMore2Fill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import ChatContext from '../../context/ChatContext'
import { useUser } from '../../hooks/fetchData'
import http from '../../services/httpService'
import { toPersianDigits } from '../../utils/persianDigit'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'

const Message = () => {
    const {socket,entryMessage,currentChat} = useContext(ChatContext)
    const {user} = useAuth()
    const { chatId } = useParams()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [userReceiver, setUserReceiver] = useState(user._id);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();

    const {data} = useUser(userReceiver)

    useEffect(() => {
        const getMessages = async () => {
          setLoading(true)
          try {
            const res = await http.get("/api/messages/" + chatId);
            setMessages(res.data);
            setLoading(false)
          } catch (err) {
            setLoading(false)
          }
        };
        getMessages();
      }, [chatId]);

      useEffect(() => {
          entryMessage &&
          currentChat?.members.includes(entryMessage.sender) &&
          setMessages((prev) => [...prev, entryMessage]);
          const receiverId = currentChat?.members?.find(
            (member) => member !== user._id
          );
          if(receiverId){
            setUserReceiver(receiverId)
          }else setUserReceiver(user._id)
      }, [entryMessage, currentChat, user._id]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat?._id,
        };
    
        const receiverId = currentChat?.members?.find(
          (member) => member !== user._id
        );
    
        socket?.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });

        try {
          setLoadingMsg(true)
          if(newMessage.trim().length === 0){
            toast.error('متن ارسالی شما خالی است !')
            setLoadingMsg(false)
          }else{
            const res = await http.post("/api/messages", message);
            setMessages([...messages, res.data]);
            setLoadingMsg(false)
            setNewMessage("");
          }
        } catch (err) {
          toast.error('دوباره تلاش کنید')
          setLoadingMsg(false)
        }
      };

      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages,loadingMsg]);
      function Box({ children }) {
        return (
          <div className='w-2/3 p-3 my-5 even:mr-auto odd:ml-auto'>
            {children}
          </div>
        );
      }
      
    return (
        <>
            <div className="flex justify-between items-center py-[3px]">
                <h3 className="mr-4 border-r-2 pr-2">{data?.data?.name}</h3>
                <button className='rounded-full duration-500 hover:bg-gray-200 p-3 ml-4'>
                    <RiMore2Fill className="text-gray-500" />
                </button>
            </div>
            <div className="border border-gray-100 h-[39rem] overflow-y-auto flex flex-col justify-between">
              {loading ? <Skeleton count={4} wrapper={Box} borderRadius='1rem' className='py-7 rounded-2xl rounded-br-none' /> : null}
                <div>
                    {messages?.map(m => (
                        <div key={m._id} ref={scrollRef} className={`p-3 rounded-2xl w-2/5 m-3 ${m.sender === user._id ? 'bg-blue-100 rounded-br-none' : 'bg-gray-100 mr-auto rounded-bl-none'}`}>
                            <p className='text-sm'>{m.text}</p>
                            <p className="text-xs mt-5">{toPersianDigits(moment(m.createdAt).locale('fa').fromNow())}</p>
                        </div>
                    ))}

                    {loadingMsg ? (
                       <div ref={scrollRef} className={`p-3 rounded-2xl rounded-br-none w-2/5 m-3 bg-blue-50 ml-auto rounded-bl-none'}`}>
                          <p className='text-sm'>{newMessage}</p>
                        </div>
                    ) : null}

                </div>
                <div className="sticky bottom-0 bg-white border-t border-gray-100">
                    <textarea maxLength={200} type='text' placeholder="متنی بنویسید ..." className='w-3/4 hide-scroll h-full py-2 outline-none border-none resize-none focus:ring-0 focus:border-gray-300 sm:w-5/6' onChange={(e) => setNewMessage(e.target.value)}
                    value={loadingMsg ? "" : newMessage}/>
                    <button className='absolute top-4 left-5 rounded-xl w-16 flex justify-center duration-500 bg-red-700 hover:bg-red-500 p-3'onClick={handleSubmit}>
                        <FiSend className="text-white" size={24} fill='white'/>
                    </button> 
                </div>
            </div>
        </>
    )
}

export default Message