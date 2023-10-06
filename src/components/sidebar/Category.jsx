import LoadCategory from '../LoadCategory'
import { useSearchParams } from 'react-router-dom';
import { useAllCategorys } from '../../hooks/api/usePostApi';
import { setCategory } from '../../utils/queryHandler';

const SidebarCategory = () => {
    const [, setSearchParams] = useSearchParams({ category : "" });
    const {isLoading, data, isError} = useAllCategorys()

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
                        onClick={() => setCategory(setSearchParams, item.englishTitle)}>
                        <p dangerouslySetInnerHTML={{__html: item.icon}}/>
                        <p className="text-[15px] font-light">{item.title}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SidebarCategory