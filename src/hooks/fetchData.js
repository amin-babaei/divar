import {
    useQuery
} from "react-query"
import {
    getBookmarks,
    getCategorys,
    getMyPosts,
    getPost,
    getPosts
} from "../services/fetchData"

export const useAllCategorys = () => {
    return useQuery("category", getCategorys,{
        refetchOnWindowFocus:false
    })
}
export const usePosts = (currentPage, category, sort) => {
    return useQuery(['posts', currentPage, category, sort], () => getPosts(currentPage, category, sort),{
        refetchOnWindowFocus:false
    })
}
export const usePost = (slug, hashId) => {
    return useQuery(['post', slug, hashId], () => getPost(slug, hashId))
}
export const useBookmarks = () => {
    return useQuery('bookmarks', getBookmarks,{
        refetchOnWindowFocus:false
    })
}
export const useMyPosts = () => {
    return useQuery('my-posts', getMyPosts,{
        refetchOnWindowFocus:false
    })
}