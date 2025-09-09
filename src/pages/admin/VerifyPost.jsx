import { Button } from "flowbite-react"
import { usePostsVerify, useVerifyPost } from "../../hooks/api/usePostApi"
import usePaginate from "../../hooks/usePaginate"
import { Link } from "react-router"
import Loading from "../../components/Loading"
import ModalDelete from "../../components/posts/ModalDelete"
import { toast } from "react-toastify"
import PaginationUI from "../../components/Pagination"

const VerifyPost = () => {
    const { currentPage, onPageChange } = usePaginate()
    const { data, isLoading, isError, refetch } = usePostsVerify(currentPage)
    const mutation = useVerifyPost()

    const handleVerifyPost = (id) => {
        mutation.mutate(id)
    }
    if (mutation.isSuccess) {
        toast.success('با موفقیت تایید شد')
    }
    if (mutation.isError) {
        toast.error('دوباره تلاش کنید')
    }
    if (mutation.isLoading || isLoading) {
        return <Loading />
    }

    if (data?.docs?.length === 0) {
      return (
        <div className="w-full flex flex-col items-center">
          <img src="/myposts.svg" alt="" />
          <p className="text-sm text-gray-500 whitespace-pre-wrap">
            لیست انتظار خالی است
          </p>
        </div>
      )
    }
    return (
        <>
            {isError && <Button color="red" onClick={refetch} size='md' className='mx-auto mt-40'>
                تلاش مجدد
            </Button>}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 mt-10 md:mt-24 sm:mr-72">
                {data?.docs.map(post => (
                    <div key={post._id} className='relative'>
                        <ModalDelete postId={post._id}/>
                        <div
                            className='relative overflow-hidden rounded-md w-full h-36 bg-gray-300 aspect-w-16 aspect-h-9 aspect-none'>
                            <img src={`${import.meta.env.VITE_BASE_API_URL}/images/${post.image.filename}`} className="absolute w-full h-full object-center" alt="test" />
                        <div className="flex gap-x-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
                            <button className="bg-green-500 text-white p-2 rounded-full w-20 hover:opacity-80" 
                            onClick={() => handleVerifyPost(post._id)}>تایید</button>
                            <Link to={`/posts/${post.hashId}/${post.slug}`}>
                                <button className="bg-gray-500 text-white p-2 rounded-full w-20 hover:opacity-80">نمایش</button>
                            </Link>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            {data && data.totalPages > 1 && (
                <PaginationUI
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalPages={data?.totalPages}
                />
            )}
        </>
    )
}

export default VerifyPost