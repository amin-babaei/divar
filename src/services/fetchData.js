import http from './httpService'

export const getCategorys = async () => {
    const {data} = await http.get(`${process.env.REACT_APP_BASE_API_URL}/api/post-category`)
    return data.data
}

export const getPosts = async (currentPage,category,sort) => {
    const {data} = await http.get(`${process.env.REACT_APP_BASE_API_URL}/api/posts?page=${currentPage}&category=${category}&sort=${sort}`)
    return data.data
}

export const getPost = async (slug,hashId) => {
    const {data} = await http.get(`${process.env.REACT_APP_BASE_API_URL}/api/posts/${slug}/${hashId}`)
    return data.data
}

export const getBookmarks = async () => {
    const {data} = await http.get(`${process.env.REACT_APP_BASE_API_URL}/api/posts/bookmarks`)
    return data.data
}

export const getMyPosts = async () => {
    const {data} = await http.get(`${process.env.REACT_APP_BASE_API_URL}/api/posts/my-posts`)
    return data.data
}