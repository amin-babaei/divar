import LoadCategory from '../LoadCategory'
import {toast} from "react-toastify";
import QueryContext from '../../context/QueryContext.js';
import {useCallback, useContext,} from 'react';
import {useSearchParams} from 'react-router-dom';
import { useAllCategorys } from '../../hooks/fetchData.js';

const SidebarCategory = () => {
    const [, setSearchParams] = useSearchParams();
    const {isLoading, data, error} = useAllCategorys()
    const {category, setCategory} = useContext(QueryContext)

    const getEnglishTitle = useCallback(title => {
        setCategory(title)
        setSearchParams({category})
    }, [setCategory, setSearchParams, category])

    if (isLoading) return <LoadCategory/>
    if (error) {
        toast.error(error.message)
        return <LoadCategory/>
    }

    return (
        <>
            <h3 className="text-xs">دسته ها</h3>
            <ul className="mt-5">
                {data?.map(item => (
                    <li key={item._id}
                        className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1"
                        onClick={() => getEnglishTitle(item.englishTitle)}>
                        <p dangerouslySetInnerHTML={{__html: item.icon}}/>
                        <p className="text-[15px] font-light">{item.title}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SidebarCategory