import http from "@/services/httpService"
import { useQuery } from "react-query"

export const getBookmarks = async (currentPage) => {
    const {data} = await http.get(`/api/posts/bookmarks?page=${currentPage}`)
    return data.data
}

export const useBookmarks = (currentPage) => {
    return useQuery(['bookmarks', currentPage], () => getBookmarks(currentPage))
}