import { createContext, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const QueryContext = createContext()

export const QueryProvider = ({ children }) => {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const page = query.get('page') || 1
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState(query.get('category') || "")
    const [sort, setSort] = useState(query.get('sort') || "")

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
        setSearchParams({})
    }
    return (
        <QueryContext.Provider
            value={{
                page,category,
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