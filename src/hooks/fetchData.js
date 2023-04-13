import {useMutation,useQuery,useQueryClient} from "react-query"
import {createPost,deleteMyPost,editBookmark,getBookmarks,getCategorys,getMyPosts,getPost,getPosts, getUser, updatePost} from "../services/fetchData"

export const useAllCategorys = () => {
    return useQuery("category", getCategorys)
}
export const usePosts = (currentPage, category, sort) => {
    return useQuery(['posts', currentPage, category, sort], () => getPosts(currentPage, category, sort))
}
export const usePost = (slug, hashId) => {
    return useQuery(['post', slug, hashId], () => getPost(slug, hashId),{
        enabled:!!slug
    })
}
export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation(createPost,{
        onSuccess: () => {
            queryClient.invalidateQueries('my-posts')
        },
    })
}
export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return  useMutation(
        ({ postId, data }) => updatePost({ postId, data }),
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['post'])
          }
        }
      )
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
