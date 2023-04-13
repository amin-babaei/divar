import LoadCategory from '../LoadCategory'
import {toast} from "react-toastify";
import QueryContext from '../../context/QueryContext.js';
import {useCallback, useContext,} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import { useAllCategorys } from '../../hooks/fetchData.js';

const SidebarCategory = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [, setSearchParams] = useSearchParams();
    const {isLoading, data, isError} = useAllCategorys()
    const {category, setCategory} = useContext(QueryContext)

    const getEnglishTitle = useCallback(title => {
        setCategory(title)
        setSearchParams({category})
        if(pathname !== '/'){
            navigate(`/?category=${category}`)
        }
    }, [setCategory, setSearchParams, category, pathname])

    if (isLoading) return <LoadCategory/>
    if (isError) {
        toast.error('مشکلی در دریافت دسته بندی ها رخ داد')
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