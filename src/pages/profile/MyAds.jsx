import { Button } from "flowbite-react"
import Loading from "@/ui/Loading"
import AdsItem from '@/features/ads/AdsItem'
import usePaginate from "@/hooks/usePaginate"
import PaginationUI from "@/ui/Pagination"
import { useMyAds } from "@/features/profile/hooks/useMyAds"

const MyAds = () => {
  const { currentPage, onPageChange } = usePaginate()
  const { data, isLoading, isError, refetch } = useMyAds(currentPage)

  if (isLoading) return <Loading />
  if (data?.docs?.length === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <img src="/myposts.svg" alt="آگهی های من" />
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
        <AdsItem data={data} />
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

export default MyAds