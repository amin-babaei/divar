import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'
import http from '../../services/httpService'

const ChatPost = ({userId}) => {
    const {user} = useAuth()
    const [conversation,setConversation] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const getConversation = async () => {
          try {
            const res = await http.get(`/api/conversation/find/${user?._id}/${userId}`);
            setConversation(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversation();
      }, [user?._id, userId]);

    const onClickChat = () => {
        if(!user)toast.error('لطفا وارد حساب کاربری خود شوید')
        if(!conversation){
            const data = {
                senderId: user._id,
                receiverId: userId,
              };
            const sendMessage = async () => {
                try {
                    const response = await http.post('/api/conversation',data)
                    if(response.status === 200){
                        navigate('/chat')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            sendMessage()
        }else navigate(`/chat/${conversation._id}`)
    }

  return (
    <button className={`w-24 tracking-wide font-medium transition-all duration-300 border border-gray-300 text-gray-500 rounded text-center hover:bg-gray-50 hover:text-black ${userId === user?._id ? 'hidden' : 'block'}`} onClick={()=> onClickChat()}>
      چت
    </button>
  )
}

export default ChatPost