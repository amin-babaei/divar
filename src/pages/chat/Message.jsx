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
import { useNavigate, useParams } from 'react-router-dom'

const Message = () => {
    const {socket,entryMessage,currentChat,conversations,setCurrentChat} = useContext(ChatContext)
    const {user} = useAuth()
    const { chatId } = useParams()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [userReceiver, setUserReceiver] = useState(user._id);
    const [newMessage, setNewMessage] = useState("");
    const [currentUserType, setCurrentUserType] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef();
    const navigate = useNavigate()

    const {data,isLoading,error} = useUser(userReceiver)

    useEffect(() => {
        const getMessages = async () => {
          setLoading(true)
          try {
            const res = await http.get("/api/messages/" + chatId);
            setMessages(res.data);
            setLoading(false)
          } catch (err) {
            setLoading(false)
            if(err?.response?.status === 404) navigate("/not-found", { replace: true })
          }
        };
        getMessages();
      }, [chatId, navigate]);

      useEffect(() => {
        let current = conversations.filter(c => c._id === chatId).map(c => c)
        if(current)setCurrentChat(current[0])
      }, [chatId, conversations, setCurrentChat])

      useEffect(() => {
        if(entryMessage){
          currentChat?.members.includes(entryMessage.sender)
          setMessages((prev) => [...prev, entryMessage]);
        }
          if(currentChat){
            const receiverId = currentChat.members.find(
              (member) => member !== user._id
            );
            setUserReceiver(receiverId)
          }
      }, [entryMessage, currentChat, user._id, chatId]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setCurrentUserType(false)
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: chatId,
        };
    
        const receiverId = currentChat?.members?.find(
          (member) => member !== user._id
        );
    
        socket?.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });

        socket.current.emit("stopTyping", () => {
          setIsTyping(false);
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

      useEffect(() => {
        socket.current.on("userTyping", (data) => {
          if(data === user._id){
            setCurrentUserType(true)
          }
          setIsTyping(true);
        });
        socket.current.on("userStopTyping", () => {
          setIsTyping(false);
          setCurrentUserType(false)
        });
      }, [user._id]);

      const handleChange = e => {
        if (e.target.value) {
          socket.current.emit("typing",user._id);
          setIsTyping(true);
        } else {
          socket.current.emit("stopTyping");
          setIsTyping(false);
        }
        setNewMessage(e.target.value)
      }
      const handleDeleteChat = async (e) => {
        e.preventDefault()
        try {
          const {status} = await http.delete(`/api/user/delete/chat/${chatId}/${user._id}`)
          if(status === 200){
            navigate("/", { replace: true })
            toast.success('گفتگو مورد نظر با موفقیت حذف شد')
          }
        } catch (err) {
          toast.error(err?.response?.data?.message)
        }
      }

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
              {isLoading ? <Skeleton count={1} width={150} height={30} className='mr-2'/> : (
                <h3 className="mr-4 border-r-2 pr-2 flex items-center">
                  {error?.response?.status === 404 ? 'حساب کاربری حذف شده' : data.data?.name}
                  {isTyping && !currentUserType && <p className={`text-xs mr-1 text-gray-400 `}>(در حال نوشتن ...)</p>}
                  </h3>
              )}
                <button className='rounded-full duration-500 hover:bg-gray-200 p-3 ml-4'>
                    <RiMore2Fill className="text-gray-500" />
                </button>
            </div>
            <div className="border border-gray-100 h-[39rem] overflow-y-auto flex flex-col justify-between">
              {loading ? <Skeleton count={4} wrapper={Box} borderRadius='1rem' className='py-7 rounded-2xl rounded-br-none' /> : null}
                <div>
                    {!loading && messages?.map(m => (
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
                      {error?.response.status === 404 ? (
                        <button onClick={handleDeleteChat} className='w-full flex justify-center text-white duration-500 bg-red-900 hover:bg-red-500 p-3'>
                          حذف گفتگو
                        </button> 
                        ): (
                          <div className="sticky bottom-0 bg-white border-t border-gray-100">
                            <textarea maxLength={200} type='text' placeholder="متنی بنویسید ..." className='w-3/4 hide-scroll h-full py-2 outline-none border-none resize-none focus:ring-0 focus:border-gray-300 sm:w-5/6' onChange={handleChange}
                            value={loadingMsg ? "" : newMessage}/>
                            <button className='absolute top-4 left-5 rounded-xl w-16 flex justify-center duration-500 bg-red-700 hover:bg-red-500 p-3'onClick={handleSubmit}>
                            <FiSend className="text-white" size={24} fill='white'/>
                            </button> 
                          </div>
                      )}
            </div>
        </>
    )
}

export default Message