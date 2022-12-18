import { Pagination } from "flowbite-react"
import { toast } from "react-toastify"
import Loading from "../../components/Loading"
import PostItem from '../../components/posts/PostItem'
import { useMyPosts } from "../../hooks/fetchData"
import usePaginate from "../../hooks/usePaginate"

const MyPosts = () => {
  const {currentPage,searchParams,onPageChange} = usePaginate()
  const { data, isLoading, error } = useMyPosts(currentPage)

  if (isLoading) return <Loading />
  if (error) {
    console.log(error)
    toast.error(error.message)
  }
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
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 mt-10 md:mt-24 sm:mr-72">
        <PostItem data={data} />
      </div>
      {data && data.totalPages > 1 && (
        <div className='flex justify-center sm:justify-end lg:justify-center my-10 md:mt-24'>
          <Pagination
            className='absolute -bottom-4'
            dir='ltr'
            currentPage={currentPage}
            layout="pagination"
            defaultValue={searchParams.get('page')}
            onPageChange={onPageChange}
            showIcons={true}
            totalPages={data?.totalPages}
            previousLabel="قبلی"
            nextLabel="بعدی"
          />
        </div>
      )}
    </>
  )
}

export default MyPosts