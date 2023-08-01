import { createContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const QueryContext = createContext()

export const QueryProvider = ({ children }) => {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState(query.get('category') || "")
    const [sort, setSort] = useState(query.get('sort') || "")
    const [currentPage, setCurrentPage] = useState(parseInt(query.get("page")) || 1);

    useEffect(() => {
        const params = new URLSearchParams();
        if (category.length > 0) {
          params.set("category", category);
        }
        if (sort.length > 0) {
          params.set("sort", sort);
        }
        if (currentPage !== 1) {
          params.set("page", currentPage.toString());
        }
        setSearchParams(params);
      }, [category, sort, currentPage, setSearchParams]);

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
        setCurrentPage(1)
        setSearchParams({})
    }
    return (
        <QueryContext.Provider
            value={{
                currentPage,setCurrentPage,category,
                setCategory,
                sort,
                setSort,
                query,
                deleteQueryCat,
                deleteQuerySort,
                deleteَAllQuery
            }}>{children}</QueryContext.Provider>
    )
}

export default QueryContext;