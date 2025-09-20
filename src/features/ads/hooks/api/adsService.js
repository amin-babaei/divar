import http from '@/services/httpService'

export const getAds = async (currentPage,category,sort) => {
    const {data} = await http.get(`/api/posts?page=${currentPage}&category=${category}&sort=${sort}`)
    return data.data
}

export const getAd = async (slug,hashId) => {
    const {data} = await http.get(`/api/posts/${hashId}/${slug}`)
    return data.data
}

export const createAd = async (data) => {
    const response = await http.post(`/api/posts/create`,data)
    return response
}

export const updateAd = async ({ postId, data }) => {
    const response = await http.put(`/api/posts/edit/${postId}`,data)
    return response
}

export const deleteMyAd = async (postId) => {
    const response = await http.delete(`/api/posts/my-posts/${postId}`)
    return response
}

export const editBookmark = async (postId) => {
    const response = await http.put(`/api/posts/bookmark/${postId}`)
    return response
}