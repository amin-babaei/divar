import moment from "jalali-moment";
import { useUser } from "../../hooks/fetchData";
import LoadCategory from "../LoadCategory";
import { toPersianDigits } from "../../utils/persianDigit";

const Conversation = ({ conversation, currentUser }) => {

  const customerId = conversation.members.find((m) => m !== currentUser._id);

  const {data:user, isLoading} = useUser(customerId)
  if(isLoading)return <LoadCategory/>
  return (
    <li className="flex flex-wrap justify-between items-center px-3 py-5 border-b border-b-gray-100 cursor-pointer hover:bg-gray-100 duration-300">
        <div className="flex items-center gap-x-1">
            <img src="/avatar.png" alt="" className="w-10 h-10 rounded-full"/>
            <h3>{user?.data?.name}</h3>
        </div>
        <span className="text-xs">{toPersianDigits(moment(conversation?.updatedAt).locale('fa').fromNow())}</span>
    </li>
  );
}
export default Conversation