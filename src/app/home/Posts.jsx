"use client"
import { useContext } from 'react';
import { useAllCategorys, usePosts } from '@/hooks/fetchData';
import Skeleton from 'react-loading-skeleton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import PostItem from '@/components/posts/PostItem';
import Loading from '@/components/Loading';
import usePaginate from '@/hooks/usePaginate';
import { Button, Pagination } from 'flowbite-react';
import QueryContext from '@/context/QueryContext';
import Image from 'next/image';
import nopost from '@/assets/notpost.svg'
import { createQueryString } from '@/utils/createQueryString';

const PostContainer = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const create = createQueryString(searchParams)

    const { currentPage, category, sort, setSort, deleteَAllQuery, deleteQueryCat, deleteQuerySort } = useContext(QueryContext)
    const {onPageChange} = usePaginate()
    const { data: categorys, isLoading: categoryLoading } = useAllCategorys()
    const { isLoading, data, isError, refetch ,isSuccess } = usePosts(currentPage, category, sort)

    const sortHandler = (e) => {
        setSort(e.target.value)
        router.push(pathname +"?" +create("sort", e.target.value));
    }
    if(isLoading) return <Loading/>
    if (data?.docs?.length === 0) {
        return (
            <div className='flex flex-col gap-y-10 mt-20 items-center'>
                <Button color="failure" onClick={deleteَAllQuery} size='xs' className='mb-3'>
                    X حذف فیلتر ها
                </Button>
                <p className='text-2xl font-semibold'>گشتم نبود ، نگرد نیست !</p>
                <Image src={nopost} alt="" className='md:w-1/4' width={200} height={200}/>
            </div>
        )
    }

    return (
        <>
            <section className="relative min-h-[55vh] mt-5 md:mt-24 sm:mr-72">
                {categoryLoading && <div className='block sm:hidden -mt-2 mb-4'><Skeleton containerClassName='flex gap-x-4' count={3}/></div>}

                {isSuccess && 
                <select className="border border-gray-200 text-gray-900 text-sm rounded-lg block w-1/2 mx-auto mb-5 p-2.5 focus:ring-0 focus:outline-none focus:border-gray-300 bg-left sm:hidden" value={sort} onChange={sortHandler}>
                    <option value=''>مرتب سازی</option>
                    <option value="desc">بالاترین قیمت</option>
                    <option value="asc">کمترین قیمت</option>
                </select>
                }
                
                <div className='flex items-center gap-3'>
                    {categorys?.filter(cat => cat.englishTitle === category).map(item => (
                        <Button key={item._id} color="failure" onClick={deleteQueryCat} size='xs' className='mb-3'>
                            X {item.title}
                        </Button>
                    ))}
                    {sort &&
                        <Button color="failure" onClick={deleteQuerySort} size='xs' className='mb-3'>
                            X {sort === 'desc' ? 'بالاترین قیمت' : 'کمترین قیمت'}
                        </Button>
                    }
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 mb-20">
                    <PostItem data={data} />
                </div>
                {isError && <Button color="failure" onClick={refetch} size='md' className='m-auto'>
                    تلاش مجدد
                </Button>}
            </section>
            {data && data.totalPages > 1 && (
                <div className='flex justify-center sm:justify-end lg:justify-center my-5 md:mt-32'>
                    <Pagination
                        className='pagination'
                        dir='ltr'
                        currentPage={currentPage}
                        layout="pagination"
                        defaultValue={currentPage}
                        onPageChange={onPageChange}
                        showIcons={true}
                        totalPages={data.totalPages}
                        previousLabel="قبلی"
                        nextLabel="بعدی"
                    />
                </div>
            )} 
        </>
    )
}

export default PostContainer