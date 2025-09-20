import {
    useMutation,
    useQuery,
    useQueryClient
} from "react-query"
import {
    createAd,
    deleteMyAd,
    editBookmark,
    getAd,
    getAds,
    updateAd
} from "./adsService"

export const useAds = (currentPage, category, sort) => {
    return useQuery(['ads', currentPage, category, sort], () => getAds(currentPage, category, sort))
}

export const useAd = (slug, hashId) => {
    return useQuery(['ad', slug, hashId], () => getAd(slug, hashId), {
        enabled: !!slug
    })
}

export const useBookmarked = () => {
    const queryClient = useQueryClient()
    return useMutation(editBookmark, {
        onSuccess: () => {
            queryClient.invalidateQueries('ad')
        },
    })
}

export const useCreateAd= () => {
    const queryClient = useQueryClient()
    return useMutation(createAd, {
        onSuccess: () => {
            queryClient.invalidateQueries('my-ads')
        },
    })
}

export const useUpdateAd = () => {
    const queryClient = useQueryClient()
    return useMutation(
        ({ postId, data }) => updateAd({ postId, data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['ad'])
            }
        }
    )
}

export const useDeleteMyAd = () => {
    const queryClient = useQueryClient()
    return useMutation(
        (postId) => deleteMyAd(postId), {
            onSuccess: () => {
                queryClient.invalidateQueries("my-ads");
                queryClient.invalidateQueries("ads-verify");
            },
        })
}