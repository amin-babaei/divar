"use client"
import Loading from "@/components/Loading"
import PostItem from '@/components/posts/PostItem'
import { BsBookmark } from "react-icons/bs"
import { useBookmarks } from "@/hooks/fetchData"
import { Button, Pagination } from "flowbite-react"
import usePaginate from "@/hooks/usePaginate"
import Image from "next/image"
import bookmarkImg from '@/assets/bookmark.svg'

const Bookmarks = () => {
  const {currentPage,searchParams,onPageChange} = usePaginate()
  const {data, isLoading, isError, refetch} = useBookmarks(currentPage)

  if (isLoading) return <Loading/>
  if(data?.docs?.length === 0){
    return(
      <div className="w-full flex flex-col items-center">
        <Image src={bookmarkImg} alt="bookmark" width={200} height={200}/>
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
            className='pagination'
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