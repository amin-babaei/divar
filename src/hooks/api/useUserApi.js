import { useQuery } from "react-query"
import { getConversation, getUser } from "../../services/fetchData"

export const useUser = (customerId) => {
    return useQuery(['user', customerId], () => getUser(customerId))
}
export const useConversation = (userId) => {
    return useQuery(['conversation', userId], () => getConversation(userId))
}