import { useSearchParams } from "react-router";

export default function usePaginate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;

  const onPageChange = page => {
    setSearchParams(prev => {
      prev.set("page", page)
      return prev
    }, { replace: true })
  }

  return { onPageChange, currentPage }
}