import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

const QueryContext = createContext()

export const QueryProvider = ({ children }) => {
    const { search } = useLocation()
    const query = new URLSearchParams(search)
    const page = query.get('page') || 1

    const [category, setCategory] = useState(query.get('category') || "")
    const [sort, setSort] = useState(query.get('sort') || "")

    const querys = Object.fromEntries(query);
    const lengthQuerys = Object.keys(querys).length

    return (
        <QueryContext.Provider
            value={{
                page,
                category,
                setCategory,
                sort,
                setSort, query, lengthQuerys
            }}>{children}</QueryContext.Provider>
    )
}

export default QueryContext;