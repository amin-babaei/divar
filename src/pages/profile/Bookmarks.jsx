import { toast } from "react-toastify"
import Loading from "../../components/Loading"
import PostItem from '../../components/posts/PostItem'
import { BsBookmark } from "react-icons/bs"
import { useBookmarks } from "../../hooks/fetchData"

const Bookmarks = () => {
  const {data, isLoading, error} = useBookmarks()
  if (isLoading) return <Loading/>
  if (error) {
      toast.error(error.message)
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
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 mt-12 md:mt-28 sm:mr-72">
          <PostItem data={data}/>
    </div>
  )
}

export default Bookmarks