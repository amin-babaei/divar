import http from './httpService'

export const getCategorys = async () => {
    const {data} = await http.get(`/api/post-category`)
    return data.data
}
export const getPosts = async (currentPage,category,sort) => {
    const {data} = await http.get(`/api/posts?page=${currentPage}&category=${category}&sort=${sort}`)
    return data.data
}
export const getPostsVerify = async (currentPage) => {
    const {data} = await http.get(`/api/posts/await-verify?page=${currentPage}`)
    return data.data
}
export const getPost = async (slug,hashId) => {
    const {data} = await http.get(`/api/posts/${hashId}/${slug}`)
    return data.data
}
export const createPost = async (data) => {
    const response = await http.post(`/api/posts/create`,data)
    return response
}
export const updatePost = async ({ postId, data }) => {
    const response = await http.put(`/api/posts/edit/${postId}`,data)
    return response
}
export const verifyPost = async ({ postId }) => {
    const response = await http.put(`/api/posts/verify/${postId}`)
    return response
}
export const getMyPosts = async (currentPage) => {
    const {data} = await http.get(`/api/posts/my-posts?page=${currentPage}`)
    return data.data
}
export const deleteMyPost = async (postId) => {
    const response = await http.delete(`/api/posts/my-posts/${postId}`)
    return response
}
export const getBookmarks = async (currentPage) => {
    const {data} = await http.get(`/api/posts/bookmarks?page=${currentPage}`)
    return data.data
}
export const editBookmark = async (postId) => {
    const response = await http.put(`/api/posts/bookmark/${postId}`)
    return response
}
export const getUser = async (customerId) => {
    const respnse = await http.get(`/api/user?userId=${customerId}`)
    return respnse
}
export const getConversation = async (userId) => {
    const respnse = await http.get(`/api/conversation/${userId}`)
    return respnse.data
}