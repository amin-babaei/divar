import { useLoaderData, useNavigation, useParams, useSubmit } from "react-router";
import { useContext } from "react";
import ChatContext from "@/context/ChatContext";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/features/chat/hooks/useUsersConversationApi";
import { useChatMessages } from "@/features/chat/hooks/useChatMessage";
import { InputMessage, MessageBox, SkeletBox, UserMessage } from "@/features/chat/components/messages";
import Skeleton from "react-loading-skeleton";

const Message = () => {
  const { currentChat } = useContext(ChatContext);
  const loadMessages = useLoaderData();
  const { chatId } = useParams();
  const submit = useSubmit();
  const { user } = useAuth();
  const { state } = useNavigation();

  const userReceiver = currentChat
    ? currentChat.members.find((m) => m !== user._id)
    : user._id;

  const { data, isLoading, error } = useUser(userReceiver);

  const {
    messages,
    newMessage,
    isTyping,
    loadingMsg,
    scrollRef,
    handleChange,
    handleSubmit,
    handleDeleteChat,
  } = useChatMessages(chatId, loadMessages, submit);

  return (
    <>
      <UserMessage loading={isLoading} error={error} data={data} isTyping={isTyping} />
      <div className="border border-gray-100 h-156 overflow-y-auto flex flex-col justify-between">
        {state === "loading" ? (
          <Skeleton
            count={4}
            wrapper={SkeletBox}
            borderRadius="1rem"
            className="py-7 rounded-2xl rounded-br-none"
          />
        ) : null}
        <MessageBox
          loading={state}
          messages={messages}
          scrollRef={scrollRef}
          user={user._id}
          loadingMsg={loadingMsg}
          newMessage={newMessage}
        />
        {error?.response?.status === 404 ? (
          <button
            onClick={() => handleDeleteChat(user._id)}
            className="w-full flex justify-center text-white duration-500 bg-red-900 hover:bg-red-500 p-3"
          >
            حذف گفتگو
          </button>
        ) : (
          <InputMessage
            change={handleChange}
            loading={loadingMsg}
            newMessage={newMessage}
            submit={(e) => handleSubmit(e, userReceiver)}
          />
        )}
      </div>
    </>
  );
};

export default Message;