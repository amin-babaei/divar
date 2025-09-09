import PostItem from '../components/posts/PostItem'
import Loading from "../components/Loading";
import { Button } from 'flowbite-react';
import { useSearchParams } from 'react-router';
import { useAllCategorys, usePosts } from '../hooks/api/usePostApi';
import usePaginate from '../hooks/usePaginate';
import Skeleton from 'react-loading-skeleton';
import { sortQuery } from '../utils/queryHandler';
import PaginationUI from '../components/Pagination';

const AdsContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get('sort') || "";
    const category = searchParams.get('category') || "";

    const { currentPage, onPageChange } = usePaginate()
    const { isLoading, data, isError, refetch, isSuccess } = usePosts(currentPage, category, sort)
    const { data: categorys, isLoading: categoryLoading } = useAllCategorys()

    const deleteQueryCat = () => {
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
                    <select className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-1/2 mx-auto mb-5 p-2.5 focus:ring-0 focus:outline-none focus:border-gray-300 bg-left sm:hidden" value={sort}
                        onChange={(e) => sortQuery(setSearchParams, e.target.value)}>
                        <option value=''>مرتب سازی</option>
                        <option value="desc">بالاترین قیمت</option>
                        <option value="asc">کمترین قیمت</option>
                    </select>
                }

                <div className='flex items-center gap-3'>
                    {categorys?.filter(cat => cat.englishTitle === category).map(item => (
                        <Button key={item._id} color="red" onClick={deleteQueryCat} size='xs' className='mb-3'>
                            X {item.title}
                        </Button>
                    ))}
                    {sort &&
                        <Button color="red" onClick={deleteQuerySort} size='xs' className='mb-3'>
                            X {sort === 'desc' ? 'بالاترین قیمت' : 'کمترین قیمت'}
                        </Button>
                    }
                </div>
                {isLoading && <Loading height={'min-h-[60vh]'}/>}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    <PostItem data={data} />
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

export default AdsContainer