import {useContext} from "react";
import { useSearchParams } from "react-router-dom";
import QueryContext from "../context/QueryContext";

export default function usePaginate (){
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentPage,setCurrentPage } = useContext(QueryContext)

    const onPageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page })
      };

    return { searchParams, onPageChange, currentPage, setCurrentPage }
}