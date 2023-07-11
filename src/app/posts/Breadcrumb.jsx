'use client'
import { useContext } from "react";
import QueryContext from "@/context/QueryContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createQueryString } from "@/utils/createQueryString";

const Breadcrumb = ({postCategory,title}) => {
    const { setCategory } = useContext(QueryContext)
    const router = useRouter()
    const searchParams = useSearchParams()
    const create = createQueryString(searchParams)

    const categoryHandler = (title) => {
        setCategory(title)
        router.push('/' +"?" +create("category", title));
    }
   
    return (
        <nav className="rounded-md py-5 px-2">
            <ol className="list-reset flex text-xs">
                <li className="text-gray-500 hover:text-xred whitespace-nowrap">
                    <Link href="/">صفحه اصلی</Link>
                </li>
                <li>
                    <span className="text-gray-400 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500 hover:text-xred cursor-pointer whitespace-nowrap" onClick={()=> categoryHandler(postCategory?.englishTitle)}>
                    <p>{postCategory.title}</p>
                </li>
                <li>
                    <span className="text-gray-400 mx-2">{">"}</span>
                </li>
                <li className="text-gray-500">{title}</li>
            </ol>
        </nav>
    );
}

export default Breadcrumb;