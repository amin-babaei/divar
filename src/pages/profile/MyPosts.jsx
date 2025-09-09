import { Button } from "flowbite-react"
import Loading from "../../components/Loading"
import PostItem from '../../components/posts/PostItem'
import { useMyPosts } from "../../hooks/api/usePostApi"
import usePaginate from "../../hooks/usePaginate"
import PaginationUI from "../../components/Pagination"

const MyPosts = () => {
  const { currentPage, onPageChange } = usePaginate()
  const { data, isLoading, isError, refetch } = useMyPosts(currentPage)

  if (isLoading) return <Loading />
  if (data?.docs?.length === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <img src="/myposts.svg" alt="" />
        <p className="text-sm text-gray-500 whitespace-pre-wrap">
          درحال حاظر آگهی ثبت شده ندارید
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
        <PostItem data={data} />
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

export default MyPosts