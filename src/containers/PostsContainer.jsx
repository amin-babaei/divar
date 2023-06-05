import PostItem from '../components/posts/PostItem'
import Loading from "../components/Loading";
import { Button, Pagination } from 'flowbite-react';
import { useCallback, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QueryContext from '../context/QueryContext';
import { useAllCategorys, usePosts } from '../hooks/fetchData';
import usePaginate from '../hooks/usePaginate';
import Skeleton from 'react-loading-skeleton';

const AdsContainer = () => {
    const [, setSearchParams] = useSearchParams();
    const { page, category, setCategory, sort, setSort, deleteَAllQuery, deleteQueryCat, deleteQuerySort } = useContext(QueryContext)
    const { currentPage, onPageChange } = usePaginate()
    const { isLoading, data, isError, refetch ,isSuccess } = usePosts(currentPage, category, sort)
    const { data: categorys, isLoading: categoryLoading } = useAllCategorys()

    useEffect(() => {
        if (category.length > 0 && sort.length > 0) {
            setSearchParams({ ...{ page: currentPage }, sort, category })
        }
        else if (category.length > 0) {
            setSearchParams({ ...{ page: currentPage }, category })
        }
        else if (sort.length > 0) {
            setSearchParams({ ...{ page: currentPage }, sort })
        }
    }, [category, setSearchParams, sort, page, currentPage])

    const handleChangeCategory = useCallback(title => {
        setCategory(title)
        setSearchParams({ category })
    }, [setCategory, setSearchParams, category])

    const handleChangeSort = useCallback(e => {
        setSort(e.target.value)
        setSearchParams({ sort })
    }, [setSort, setSearchParams, sort])

    if (isLoading) return <Loading />

    if (data?.docs?.length === 0) {
        return (
            <div className='flex flex-col gap-y-10 mt-20 items-center'>
                <Button color="failure" onClick={deleteَAllQuery} size='xs' className='mb-3'>
                    X حذف فیلتر ها
                </Button>
                <p className='text-2xl'>گشتم نبود ، نگرد نیست !</p>
                <img src="/notpost.svg" alt="" className='md:w-1/4' />
            </div>
        )
    }

    return (
        <>
            <section className="relative min-h-[55vh] mt-10 md:mt-24 sm:mr-72">
                {categoryLoading ? <Skeleton containerClassName='flex gap-x-4 sm:hidden' count={3}/> : null}
                <div className="flex mb-5 gap-x-4 overflow-auto sm:hidden">
                    {categorys?.map(item => (
                        <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50" key={item._id} onClick={() => handleChangeCategory(item.englishTitle)}>
                            <p dangerouslySetInnerHTML={{ __html: item.icon }} />
                            <p className="text-[15px] font-light">{item.title}</p>
                        </div>
                    ))}
                </div>

                {isSuccess && 
                <select className="text-center border border-gray-200 text-gray-900 text-sm rounded-lg block w-1/2 mx-auto mb-5 p-2.5 focus:ring-0 focus:outline-none focus:border-gray-300 sm:hidden" value={sort} onChange={handleChangeSort}>
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
                            X {sort === 'desc' ? 'بالاترین قیمت' : 'پایین ترین قیمت'}
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

export default AdsContainer