import { useState } from "react";
import { useSearchParams } from "react-router";
import { sortQuery } from "./sortQueryHandler";
import { IoIosArrowDown } from "react-icons/io"

const Sort = () => {
    const [showDropdown, setShowDropdown] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams({ sort: "" });

    const sort = searchParams.get('sort')

    return (
        <div className="hidden sm:block">
            <button className="flex items-center text-sm w-full justify-between my-5" onClick={() => setShowDropdown(!showDropdown)}>
                مرتب سازی
                <IoIosArrowDown className={`ml-4 duration-300 ${showDropdown && 'rotate-180'}`} />
            </button>
            <div className={`flex flex-col mb-1 font-light overflow-hidden transition-all duration-500 ease-out ${showDropdown ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                <label className="inline-flex items-center max-w-fit">
                    <input type="radio" className={`checked:bg-none focus:ring-0 focus:ring-offset-0 cursor-pointer w-4 h-4 ${sort === 'desc' && 'accent-red-700'}`} name="accountType" value="desc" checked={sort === 'desc'}
                        onChange={(e) => sortQuery(setSearchParams, e.target.value)} />
                    <span className="text-sm mr-2">بالاترین قیمت</span>
                </label>
                <label className="inline-flex items-center mt-4 max-w-fit">
                    <input type="radio" className={`checked:bg-none focus:ring-0 focus:ring-offset-0 cursor-pointer w-4 h-4 ${sort === 'asc' && 'accent-red-700'}`} name="accountType" value="asc" checked={sort === 'asc'}
                        onChange={(e) => sortQuery(setSearchParams, e.target.value)} />
                    <span className="text-sm mr-2">کمترین قیمت</span>
                </label>
            </div>
        </div>
    );
}

export default Sort;
