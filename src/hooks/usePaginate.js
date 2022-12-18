import {useContext, useState} from "react";
import { useSearchParams } from "react-router-dom";
import QueryContext from "../context/QueryContext";

export default function usePaginate (){
    const [searchParams, setSearchParams] = useSearchParams();
    const { page } = useContext(QueryContext)
    const [currentPage,setCurrentPage] = useState(page);

    const onPageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page })
      };

    return { searchParams,currentPage, onPageChange }
}