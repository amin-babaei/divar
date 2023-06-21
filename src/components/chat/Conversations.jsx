import { useUser } from "../../hooks/fetchData";
import Skeleton from "react-loading-skeleton";

const Conversation = ({ conversation, currentUser }) => {

  const customerId = conversation.members.find((m) => m !== currentUser._id);

  const {data:user, isLoading, error} = useUser(customerId)
  return (
    <li className="flex flex-wrap justify-between items-center px-3 py-5 border-b border-b-gray-100 cursor-pointer hover:bg-gray-100 duration-300">
        <div className="flex items-center gap-x-1">
            <img src="/avatar.png" alt="" className="w-10 h-10 rounded-full"/>
            {isLoading ? <Skeleton count={1} width={100} height={30} className='mr-2'/> : 
            <h3>{error?.response?.status === 404 ? 'حساب کاربری حذف شده' : user?.data?.name}</h3>
            }
        </div>
    </li>
  );
}
export default Conversation