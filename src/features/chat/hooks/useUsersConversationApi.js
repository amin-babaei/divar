import { useMutation, useQuery } from "react-query"
import http from "@/services/httpService"
import { useNavigate } from "react-router"

export const getUser = async (customerId) => {
    const respnse = await http.get(`/api/user?userId=${customerId}`)
    return respnse
}
export const getConversation = async (userId) => {
    const respnse = await http.get(`/api/conversation/${userId}`)
    return respnse.data
}
export const getFindConversation = async (currentUserId, userId) => {
  const response = await http.get(`/api/conversation/find/${currentUserId}/${userId}`);
  return response.data;
};
export const createConversation = async (data) => {
  const response = await http.post("/api/conversation", data);
  console.log(response)
  return response.data;
};

export const useUser = (customerId) => {
    return useQuery(['user', customerId], () => getUser(customerId))
}

export const useGetConversation = (userId) => {
    return useQuery(['conversation', userId], () => getConversation(userId))
}

export const useGetFindConversation = (currentUserId, userId) => {
  return useQuery(["conversation", currentUserId, userId],() => getFindConversation(currentUserId, userId)
  );
};

export const useCreateConversation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      navigate(`/chat/${data?._id}`);
    },
    onError: () => {
      toast.error("مشکلی پیش آمد، دوباره امتحان کنید");
    },
  });
};