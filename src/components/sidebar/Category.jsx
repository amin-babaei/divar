import useFetch from '../../hooks/useFetch.js'
import LoadCategory from '../LoadCategory'
import { toast } from "react-toastify";
const SidebarCategory = () => {
    const {data,loading,error} = useFetch('http://localhost:5000/api/post-category')
    if(loading) return <LoadCategory/>
    if(error){
        toast.error(error.message)
        return <LoadCategory/>
    }
    return (
        <>
            <h3 className="text-xs">دسته ها</h3>
            <ul className="mt-5">
                {data?.map(item => (
                <li key={item._id} className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <p dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <p className="text-[15px] font-light">{item.title}</p>
                </li>
                ))}
            </ul>
        </>
    )
}

export default SidebarCategory