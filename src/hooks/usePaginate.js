import {useCallback, useContext} from "react";
import { useSearchParams } from "react-router-dom";
import QueryContext from "../context/QueryContext";

export default function usePaginate (){
    const [searchParams] = useSearchParams();
    const { currentPage,setCurrentPage } = useContext(QueryContext)

    const onPageChange = useCallback((page) => {
        setCurrentPage(page)
      },[setCurrentPage]
    );

    return { searchParams, onPageChange, currentPage, setCurrentPage }
}