import PostItem from '../components/posts/PostItem'
import useFetch from "../hooks/useFetch.js";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Button, Pagination } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import QueryContext from '../context/QueryContext';

const AdsContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, setCategory, setSort, category, sort, query, lengthQuerys } = useContext(QueryContext)

    const [currentPage, setCurrentPage] = useState(page);
    const { data, loading, error } = useFetch(`${process.env.REACT_APP_BASE_API_URL}/api/posts?page=${currentPage}&category=${category}
    &sort=${sort}`)

    const onPageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page })
    };
    useEffect(() => {
        if (category.length > 0 && sort.length > 0) {
            setSearchParams({ ...{ page }, sort, category })
        }
        else if (category.length > 0) {
            setSearchParams({ ...{ page }, category })
        }
        else if (sort.length > 0) {
            setSearchParams({ ...{ page }, sort })
        }
    }, [category, setSearchParams, sort, page])

    const deleteQuerys = () => {
        const deletedCategory = query.delete('category') || ""
        const deletedsort = query.delete('sort') || ""
        setCategory(deletedCategory)
        setSort(deletedsort)
        setSearchParams({})
    }

    if (loading) return <Loading />
    if (error) {
        toast.error(error.message)
    }

    if (data?.docs?.length === 0) {
        return (
            <div className='flex flex-col gap-y-10 mt-20 items-center'>
                <p className='text-2xl'>گشتم نبود ، نگرد نیست !</p>
                <img src="/notpost.svg" alt="" className='md:w-1/4' />
            </div>
        )
    }

    return (
        <>
            <section className="relative min-h-[55vh] mt-10 md:mt-24 sm:mr-72">
                {lengthQuerys > 1 && (<Button color="failure" onClick={() => deleteQuerys()} size='xs' className='mb-3'>
                    حذف فیلتر ها
                </Button>)}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 mb-20">
                    <PostItem data={data} />
                </div>
            </section>
            {data && data.totalPages > 1 && (
                <div className='flex justify-center sm:justify-end lg:justify-center my-5 md:mt-32'>
                    <Pagination
                        className='absolute bottom-5'
                        dir='ltr'
                        currentPage={currentPage}
                        layout="pagination"
                        defaultValue={searchParams.get('page')}
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