import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/AuthContext'
import { useCreateConversation, useGetFindConversation } from '../hooks/useUsersConversationApi'

const ButtonChat = ({ userId }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: conversation } = useGetFindConversation(user?._id, userId);
  const createConversation = useCreateConversation();

  const onClickChat = () => {
    if (!user) {
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }

    if (!conversation) {
      createConversation.mutate({
        senderId: user._id,
        receiverId: userId,
      });

    } else {
      navigate(`/chat/${conversation._id}`);
    }
  };

  return (
    <button className={`w-24 tracking-wide font-medium transition-all duration-300 border border-gray-300 text-gray-500 rounded text-center hover:bg-gray-50 hover:text-black ${userId === user?._id ? 'hidden' : 'block'}`} onClick={() => onClickChat()}>
      چت
    </button>
  )
}

export default ButtonChat