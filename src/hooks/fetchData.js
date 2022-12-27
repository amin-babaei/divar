import {useMutation,useQuery,useQueryClient} from "react-query"
import {createPost,deleteMyPost,editBookmark,getBookmarks,getCategorys,getMessages,getMyPosts,getPost,getPosts, getUser, sendMessage} from "../services/fetchData"

export const useAllCategorys = () => {
    return useQuery("category", getCategorys)
}
export const usePosts = (currentPage, category, sort) => {
    return useQuery(['posts', currentPage, category, sort], () => getPosts(currentPage, category, sort))
}
export const usePost = (slug, hashId) => {
    return useQuery(['post', slug, hashId], () => getPost(slug, hashId))
}
export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation(createPost,{
        onSuccess: () => {
            queryClient.invalidateQueries('my-posts')
        },
    })
}
export const useMyPosts = (currentPage) => {
    return useQuery(['my-posts',currentPage], ()=>getMyPosts(currentPage))
}
export const useDeleteMyPost = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteMyPost,{
        onSuccess: () => {
            queryClient.invalidateQueries('my-posts')
        },
    })
}
export const useBookmarks = (currentPage) => {
    return useQuery(['bookmarks',currentPage], ()=>getBookmarks(currentPage))
}
export const useBookmarked = () => {
    const queryClient = useQueryClient()
    return useMutation(editBookmark,{
        onSuccess: () => {
            queryClient.invalidateQueries('post')
        },
    })
}
export const useUser = (customerId) => {
    return useQuery(['user',customerId], ()=>getUser(customerId))
}
