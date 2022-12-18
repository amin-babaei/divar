import http from './httpService'

export const getCategorys = async () => {
    const {data} = await http.get(`/api/post-category`)
    return data.data
}
export const getPosts = async (currentPage,category,sort) => {
    const {data} = await http.get(`/api/posts?page=${currentPage}&category=${category}&sort=${sort}`)
    return data.data
}
export const getPost = async (slug,hashId) => {
    const {data} = await http.get(`/api/posts/${slug}/${hashId}`)
    return data.data
}
export const createPost = async (data) => {
    const response = await http.post(`/api/posts/create`,data)
    return response
}
export const getMyPosts = async () => {
    const {data} = await http.get(`/api/posts/my-posts`)
    return data.data
}
export const getBookmarks = async () => {
    const {data} = await http.get(`/api/posts/bookmarks`)
    return data.data
}
export const editBookmark = async (postId) => {
    const response = await http.put(`/api/posts/bookmark/${postId}`)
    return response
}