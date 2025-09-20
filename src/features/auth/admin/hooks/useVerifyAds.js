import http from "@/services/httpService"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const verifyAd = async ({ postId }) => {
    const response = await http.put(`/api/posts/verify/${postId}`)
    return response
}
export const getAdsVerify = async (currentPage) => {
    const {data} = await http.get(`/api/posts/await-verify?page=${currentPage}`)
    return data.data
}

export const useAdsVerify = (currentPage) => {
    return useQuery(['ads-verify', currentPage], () => getAdsVerify(currentPage))
}

export const useMutationVerifyAd = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (postId) => verifyAd({ postId }),
        {
            onSuccess: () => Promise.all([
                queryClient.invalidateQueries(['ads']),
                queryClient.invalidateQueries(['ads-verify'])
            ])
        }
    )
}