import { toast } from "react-toastify"
import Loading from "../../components/Loading"
import PostItem from '../../components/posts/PostItem'
import { BsBookmark } from "react-icons/bs"
import { useBookmarks } from "../../hooks/fetchData"
import { Button, Pagination } from "flowbite-react"
import usePaginate from "../../hooks/usePaginate"

const Bookmarks = () => {
  const {currentPage,searchParams,onPageChange} = usePaginate()
  const {data, isLoading, isError, refetch} = useBookmarks(currentPage)

  if (isLoading) return <Loading/>
  if (isError) {
      toast.error('مشکلی در دریافت آگهی رخ داد')
  }
  if(data?.docs?.length === 0){
    return(
      <div className="w-full flex flex-col items-center">
        <img src="/bookmark.svg" alt=""/>
        <p className="text-sm text-gray-500 whitespace-pre-wrap">
          برای نشان کردن آگهی ها از دکمه 
          <BsBookmark className="inline-block mx-1"/> 
          در صفحه آگهی ها استفاده کنید
        </p>
      </div>
    )
  }
  return (
    <>
     {isError && <Button color="failure" onClick={refetch} size='md' className='mx-auto mt-40'>
          تلاش مجدد
        </Button>}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 mt-10 md:mt-24 sm:mr-72">
            <PostItem data={data}/>
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

export default Bookmarks