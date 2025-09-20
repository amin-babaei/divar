import { useSearchParams } from "react-router";
import usePaginate from "@/hooks/usePaginate";
import { useAds } from "./hooks/api/useAdsApi";
import { useAllCategorys } from "./hooks/api/useCategoryApi";
import { Button } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
import { sortQuery } from "./sort/sortQueryHandler";
import Loading from "@/ui/Loading";
import AdsItem from "./AdsItem";
import PaginationUI from "@/ui/Pagination";
import SortPriceMobile from "./sort/SortPriceMobile";

const Ads = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get('sort') || "";
    const category = searchParams.get('category') || "";

    const { currentPage, onPageChange } = usePaginate()
    const { isLoading, data, isError, refetch, isSuccess } = useAds(currentPage, category, sort)
    const { data: categorys, isLoading: categoryLoading } = useAllCategorys()

    const deleteQueryCategory = () => {
        searchParams.delete('category')
        setSearchParams(searchParams)
    }

    const deleteQuerySort = () => {
        searchParams.delete('sort')
        setSearchParams(searchParams)
    }

    if (data?.docs?.length === 0) {
        return (
            <div className='flex flex-col gap-y-10 mt-20 items-center'>
                <Button color="red" onClick={() => setSearchParams({})} size='xs' className='mb-3'>
                    X حذف فیلتر ها
                </Button>
                <p className='text-2xl'>گشتم نبود ، نگرد نیست !</p>
                <img src="/notpost.svg" alt="" className='md:w-1/4' />
            </div>
        )
    }

    return (
        <>
            <section className="relative mt-5 md:mt-24 sm:mr-72">
                {categoryLoading && <div className='block sm:hidden -mt-2 mb-4'><Skeleton containerClassName='flex gap-x-4' count={3} /></div>}

                {isSuccess &&
                    <SortPriceMobile sort={sort} onFilterPrice={e => sortQuery(setSearchParams, e.target.value)} />
                }

                <div className='flex items-center gap-3'>
                    {categorys?.filter(cat => cat.englishTitle === category).map(item => (
                        <Button key={item._id} color="red" onClick={deleteQueryCategory} size='xs' className='mb-3'>
                            X {item.title}
                        </Button>
                    ))}
                    {sort &&
                        <Button color="red" onClick={deleteQuerySort} size='xs' className='mb-3'>
                            X {sort === 'desc' ? 'بالاترین قیمت' : 'کمترین قیمت'}
                        </Button>
                    }
                </div>

                {isLoading && <Loading height={'min-h-[60vh]'} />}

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <AdsItem data={data} />
                </div>

                {isError && <Button color="red" onClick={refetch} size='md' className='m-auto'>
                    تلاش مجدد
                </Button>}
            </section>
            
            {data && data.totalPages > 1 && (
                <PaginationUI
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    totalPages={data.totalPages}
                />
            )}
        </>
    )
}

export default Ads;