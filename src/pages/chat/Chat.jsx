import { Outlet, useLocation, useNavigate } from "react-router";
import { SEO } from "@/utils/SEO";
import { FiChevronRight } from "react-icons/fi";
import { useConversation } from "@/features/chat/hooks/useConversation";
import ChatList from "@/features/chat/components/ChatList";

const ChatPage = () => {
  const { conversations, isLoading, onlineUsers, setCurrentChat, user } = useConversation();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-3 mt-10 font-light">
      <SEO
        title="امین دیوار - چت"
        description="با خریداران و فروشندگان در امین دیوار به‌صورت مستقیم گفتگو کنید"
        pageType="private"
        ogType="website"
      />
      {conversations?.length > 0 && !isLoading ? (
        <div className="grid grid-cols-4 items-baseline">
          <button
            onClick={() =>
              navigate(location.pathname !== "/chat" ? "/chat" : "/")
            }
            className="rounded w-12 h-10 mb-6 -mt-3 flex shadow-md items-center justify-center md:hidden"
          >
            <FiChevronRight size={25} />
          </button>
          <ChatList
            conversations={conversations}
            currentUser={user}
            onlineUsers={onlineUsers}
            setCurrentChat={setCurrentChat}
          />
          <div
            className={`col-span-4 md:col-span-3 ${location.pathname === "/chat" ? "hidden" : "block"
              }`}
          >
            <Outlet />
          </div>
        </div>
      ) : isLoading ? (
        <p className="text-center">لطفا منتظر بمانید ...</p>
      ) : (
        <p className="text-center">شما هنوز گفتگو نکردید !</p>
      )}
    </section>
  );
};

export default ChatPage;