'use client'
import QueryContext from "@/context/QueryContext";
import { createQueryString } from "@/utils/createQueryString";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function usePaginate (){
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const create = createQueryString(searchParams)
  const { currentPage,setCurrentPage } = useContext(QueryContext)

  const onPageChange = (page) => {
    setCurrentPage(page);
    router.push(pathname +"?" +create("page", page));
  };

  return { searchParams, onPageChange, currentPage, setCurrentPage }
}