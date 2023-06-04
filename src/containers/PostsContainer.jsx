import PostItem from '../components/posts/PostItem'
import Loading from "../components/Loading";
import { Button, Pagination } from 'flowbite-react';
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QueryContext from '../context/QueryContext';
import { useAllCategorys, usePosts } from '../hooks/fetchData';
import usePaginate from '../hooks/usePaginate';

const AdsContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, setCategory, setSort, category, sort, query } = useContext(QueryContext)
    const { currentPage, onPageChange } = usePaginate()
    const { isLoading, data, isError, refetch } = usePosts(currentPage, category, sort)
    const { data: categorys } = useAllCategorys()

    useEffect(() => {
        if (category.length > 0 && sort.length > 0) {
            setSearchParams({ ...{ page : currentPage }, sort, category })
        }
        else if (category.length > 0) {
            setSearchParams({ ...{ page : currentPage }, category })
        }
        else if (sort.length > 0) {
            setSearchParams({ ...{ page : currentPage }, sort })
        }
    }, [category, setSearchParams, sort, page, currentPage])

    const deleteQueryCat = () => {
        setCategory(query.delete('category') || "")
        searchParams.delete('category')
        setSearchParams(searchParams)
    }
    const deleteQuerySort = () => {
        setSort(query.delete('sort') || "")
        searchParams.delete('sort')
        setSearchParams(searchParams)
    }
    const deleteَAllQuery = () => {
        setSort(query.delete('sort') || "")
        setCategory(query.delete('category') || "")
        setSearchParams({})
    }

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