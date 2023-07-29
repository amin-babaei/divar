import { useMutation, useQuery, useQueryClient } from "react-query"
import { createPost, deleteMyPost, editBookmark, getBookmarks, getCategorys, getMyPosts, getPost, getPosts, getPostsVerify, updatePost, verifyPost } from "../../services/fetchData"

export const useAllCategorys = () => {
    return useQuery("category", getCategorys)
}
export const usePosts = (currentPage, category, sort) => {
    return useQuery(['posts', currentPage, category, sort], () => getPosts(currentPage, category, sort))
}
export const usePostsVerify = (currentPage) => {
    return useQuery(['posts-verify', currentPage], () => getPostsVerify(currentPage))
}
export const usePost = (slug, hashId) => {
    return useQuery(['post', slug, hashId], () => getPost(slug, hashId), {
        enabled: !!slug
    })
}
export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('my-posts')
        },
    })
}
export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return useMutation(
        ({ postId, data }) => updatePost({ postId, data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['post'])
            }
        }
    )
}
export const useVerifyPost = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (postId) => verifyPost({ postId }),
        {
            onSuccess: () => Promise.all([
                queryClient.invalidateQueries(['posts']),
                queryClient.invalidateQueries(['posts-verify'])
            ])
        }
    )
}
export const useMyPosts = (currentPage) => {
    return useQuery(['my-posts', currentPage], () => getMyPosts(currentPage))
}
export const useDeleteMyPost = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (postId) => deleteMyPost(postId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("my-posts");
                queryClient.invalidateQueries("posts-verify");
            },
        })
}
export const useBookmarks = (currentPage) => {
    return useQuery(['bookmarks', currentPage], () => getBookmarks(currentPage))
}
export const useBookmarked = () => {
    const queryClient = useQueryClient()
    return useMutation(editBookmark, {
        onSuccess: () => {
            queryClient.invalidateQueries('post')
        },
    })
}