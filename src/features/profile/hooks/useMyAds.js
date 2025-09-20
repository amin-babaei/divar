import http from "@/services/httpService"
import { useQuery } from "react-query"

export const getMyAds = async (currentPage) => {
    const {data} = await http.get(`/api/posts/my-posts?page=${currentPage}`)
    return data.data
}

export const useMyAds = (currentPage) => {
    return useQuery(['my-ads', currentPage], () => getMyAds(currentPage))
}