import { useUser } from "../hooks/useUsersConversationApi";
import Skeleton from "react-loading-skeleton";

const Conversation = ({ conversation, currentUser, onlineUsers }) => {
    const customerId = conversation.members.find((m) => m !== currentUser._id);

    const { data: user, isLoading, error } = useUser(customerId);

    return (
        <li className="flex flex-wrap justify-between items-center px-3 py-5 border-b border-b-gray-100 cursor-pointer hover:bg-gray-100 duration-300">
            <div className="flex items-center gap-x-1">
                <img src="/avatar.png" alt="" className="w-10 h-10 rounded-full" />
                {isLoading ? (
                    <Skeleton count={1} width={100} height={30} className="mr-2" />
                ) : (
                    <h3 className="font-normal">
                        {error?.response?.status === 404
                            ? "حساب کاربری حذف شده"
                            : user?.data?.name}
                    </h3>
                )}
            </div>
            {onlineUsers
                .filter((online) => online.userId === customerId)
                .map((online) => (
                    <span
                        key={online.userId}
                        className="bg-green-600 text-xs text-white mr-2 px-2 py-1 rounded-full"
                    >
                        آنلاین
                    </span>
                ))}
        </li>
    );
};

export default Conversation;