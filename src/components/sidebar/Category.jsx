"use client"
import { useAllCategorys } from "@/hooks/fetchData"
import LoadCategory from "@/components/LoadCategory"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import QueryContext from "@/context/QueryContext";
import { createQueryString } from "@/utils/createQueryString";

const SidebarCategory = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const create = createQueryString(searchParams)
    const { setCategory } = useContext(QueryContext)

    const categoryHandler = (title) => {
        setCategory(title)
        router.push(pathname +"?" +create("category", title));
    }
    const { data,isLoading,isError } = useAllCategorys()
    if (isLoading || isError) return <div className="hidden sm:block"><LoadCategory/></div>

    return (
        <>
            <h3 className="hidden sm:block text-xs font-bold">دسته ها</h3>
            <ul className="flex w-full gap-x-4 sm:block">
            {isLoading || isError && (
                <div className="hidden sm:block"><LoadCategory/></div>
            )} 
                {data?.map(item => (
                    <li key={item._id}
                        className="flex gap-x-1 items-center border border-gray-200 text-gray-500 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:p-0 sm:my-4 sm:gap-0 cursor-pointer hover:text-black hover:mr-1"
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