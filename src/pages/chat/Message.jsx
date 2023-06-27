import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import ChatContext from '../../context/ChatContext'
import { useUser } from '../../hooks/fetchData'
import http from '../../services/httpService'
import Skeleton from 'react-loading-skeleton'
import { useNavigate, useParams } from 'react-router-dom'
import { InputMessage, MessageBox, SkeletBox, UserMessage } from '../../components/chat/messages'

const Message = () => {
    const {socket,entryMessage,currentChat,conversations,setCurrentChat} = useContext(ChatContext)
    const {user} = useAuth()
    const { chatId } = useParams()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef();
    const navigate = useNavigate()

    const userReceiver = useMemo(() => {
      if (currentChat) {
        return currentChat.members.find(member => member !== user._id);
      }
      return user._id;
    }, [currentChat, user._id]);

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
      }, [entryMessage, currentChat]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingMsg(true)

        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: chatId,
        };
    
        socket?.current.emit("sendMessage", {
          senderId: user._id,
          receiverId: userReceiver,
          text: newMessage,
        });

        socket.current.emit("stopTyping", () => {
          setIsTyping(false);
        });

        if(newMessage.trim().length === 0){
          toast.error('متن ارسالی شما خالی است !')
          setLoadingMsg(false)
        }

        try{
          const res = await http.post("/api/messages", message);
          setMessages(prevMessages => [...prevMessages, res.data]);
          setLoadingMsg(false)
          setNewMessage("");
        }catch (err) {
          toast.error('دوباره تلاش کنید')
          setLoadingMsg(false)
        }
      };

      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages,loadingMsg]);

      useEffect(() => {
        setNewMessage("");
        setIsTyping(false)
        socket.current.emit("stopTyping");
      }, [currentChat._id, socket]);

      useEffect(() => {
        socket.current.on("typing", ({ senderId,receiverId }) => {
          const values = [senderId,receiverId[0]]
          if (senderId !== user._id && values.every(val => currentChat?.members?.includes(val))) {
            setIsTyping(true);
          }else {
            setIsTyping(false)
          }
        });
    
        socket.current.on("stopTyping", () => {
          setIsTyping(false);
        });
      }, [currentChat?.members, user._id]);

      const handleChange = (e) => {
        setNewMessage(e.target.value);
        if (e.target.value !== "") {
          socket.current.emit("typing", { senderId: user._id,receiverId:currentChat.members.filter(m => m !== user._id) });
        } else {
          socket.current.emit("stopTyping");
        }
      };

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

    return (
        <>
            <UserMessage loading={isLoading} error={error} data={data} isTyping={isTyping}/>
            <div className="border border-gray-100 h-[39rem] overflow-y-auto flex flex-col justify-between">
              {loading ? <Skeleton count={4} wrapper={SkeletBox} borderRadius='1rem' className='py-7 rounded-2xl rounded-br-none' /> : null}
               <MessageBox loading={loading} messages={messages} scrollRef={scrollRef} user={user._id} loadingMsg={loadingMsg} newMessage={newMessage}/>
                  {error?.response.status === 404 ? (
                    <button onClick={handleDeleteChat} className='w-full flex justify-center text-white duration-500 bg-red-900 hover:bg-red-500 p-3'>
                      حذف گفتگو
                    </button> 
                    ): (
                  <InputMessage change={handleChange} loading={loadingMsg} newMessage={newMessage} submit={handleSubmit}/>
                  )}
            </div>
        </>
    )
}

export default Message