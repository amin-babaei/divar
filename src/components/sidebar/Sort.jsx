"use client"
import QueryContext from "@/context/QueryContext"
import { createQueryString } from "@/utils/createQueryString"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useContext, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const SidebarSort = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [showDropdown, setShowDropdown] = useState(true)
    const create = createQueryString(searchParams)
    const { sort,setSort } = useContext(QueryContext)
   
      const sortHandler = (e) => {
        setSort(e.target.value)
        router.push(pathname +"?" +create("sort", e.target.value));
      }
  return (
    <div className="hidden sm:block">
        <button className="flex items-center text-sm w-full justify-between py-5" onClick={() => setShowDropdown(!showDropdown)}>
            مرتب سازی
            <IoIosArrowDown className={`ml-4 duration-300 ${showDropdown && 'rotate-180'}`} />
          </button>
          {showDropdown && (
            <div className="flex flex-col mb-1 font-light">
             <label className="inline-flex items-center">
                <input type="radio" className={`checked:bg-none focus:ring-0 focus:ring-offset-0 ${sort === 'desc' ? 'text-red-700 bg-red-700' : 'text-white checked:border-gray-500'}`} name="accountType" value="desc"onChange={sortHandler}/>
                <span className="text-sm mr-2">بالاترین قیمت</span>
              </label>
              <label className="inline-flex items-center mt-4">
                <input type="radio" className={`checked:bg-none focus:ring-0 focus:ring-offset-0 ${sort === 'asc' ? 'text-red-700 bg-red-700' : 'text-white checked:border-gray-500'}`} name="accountType" value="asc"onChange={sortHandler}/>
                <span className="text-sm mr-2">کمترین قیمت</span>
              </label>
            </div>
          )}
    </div>
  )
}

export default SidebarSort