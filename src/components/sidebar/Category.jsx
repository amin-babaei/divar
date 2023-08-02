import LoadCategory from '../LoadCategory'
import QueryContext from '../../context/QueryContext.js';
import {useCallback, useContext,} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import { useAllCategorys } from '../../hooks/api/usePostApi';

const SidebarCategory = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [, setSearchParams] = useSearchParams();
    const {isLoading, data, isError} = useAllCategorys()
    const {category, setCategory, setCurrentPage} = useContext(QueryContext)

    const categoryHandler = useCallback(title => {
        setCategory(title)
        setCurrentPage(1)
        setSearchParams({category})
        if(pathname !== '/'){
            navigate(`/?category=${category}`)
        }
    }, [setCategory, setCurrentPage, setSearchParams, category, pathname, navigate])

    return (
        <>
            <h3 className="hidden sm:block text-xs font-bold">دسته ها</h3>
            <ul className="flex w-full gap-x-4 sm:block">
            {(isLoading || isError ) && (
                <div className="hidden sm:block"><LoadCategory/></div>
            )} 
                {data?.map(item => (
                    <li key={item._id}
                        className="w-fit flex gap-x-1 items-center border border-gray-200 text-gray-500 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:p-0 sm:my-4 sm:gap-0 cursor-pointer hover:text-black hover:mr-1"
                        onClick={() => categoryHandler(item.englishTitle)}>
                        <p dangerouslySetInnerHTML={{__html: item.icon}}/>
                        <p className="text-[15px] font-light">{item.title}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SidebarCategory