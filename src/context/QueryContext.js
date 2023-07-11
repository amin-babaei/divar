import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useState } from "react";

const QueryContext = createContext()

export const QueryProvider = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState(searchParams.get("category") || '');
    const [sort, setSort] = useState(searchParams.get("sort") || '');
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

    const deleteQueryCat = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        setCategory("")
        current.delete('category')
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
    }
    const deleteQuerySort = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        setSort("")
        current.delete('sort')
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
    }
    const deleteَAllQuery = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        setSort("")
        setCategory("")
        setCurrentPage(1)
        current.delete('sort')
        current.delete('category')
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
    }

    return (
        <QueryContext.Provider
            value={{
                currentPage,setCurrentPage,category,
                setCategory,
                sort,
                setSort,
                deleteQueryCat,
                deleteQuerySort,
                deleteَAllQuery
            }}>{children}</QueryContext.Provider>
    )
}

export default QueryContext;