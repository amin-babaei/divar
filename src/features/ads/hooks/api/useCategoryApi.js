import { useQuery } from "react-query"
import http from "@/services/httpService"

const getCategorys = async () => {
    const {data} = await http.get(`/api/post-category`)
    return data.data
}

export const useAllCategorys = () => {
    return useQuery("category", getCategorys)
}