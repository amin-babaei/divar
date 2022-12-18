import {useMutation,useQuery,useQueryClient} from "react-query"
import {createPost,editBookmark,getBookmarks,getCategorys,getMyPosts,getPost,getPosts} from "../services/fetchData"

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
export const useMyPosts = () => {
    return useQuery('my-posts', getMyPosts)
}
export const useBookmarks = () => {
    return useQuery('bookmarks', getBookmarks)
}
export const useBookmarked = () => {
    const queryClient = useQueryClient()
    return useMutation(editBookmark,{
        onSuccess: () => {
            queryClient.invalidateQueries('post')
        },
    })
}