import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

const SidebarSort = () => {
    const [showDropdown, setShowDropdown] = useState(true)
  return (
    <>
        <button className="flex items-center text-sm w-full justify-between py-5" onClick={() => setShowDropdown(!showDropdown)}>
            مرتب سازی
            <IoIosArrowDown className={`ml-4 duration-300 ${showDropdown && 'rotate-180'}`} />
          </button>
          {showDropdown && (
            <div className="flex flex-col mb-1">
             <label class="inline-flex items-center">
                <input type="radio" className="checked:bg-none text-red-700 focus:ring-0 focus:ring-offset-0" name="accountType" value="busines" />
                <span className="text-sm mr-2">بالاترین قیمت</span>
              </label>
              <label class="inline-flex items-center mt-4">
                <input type="radio" className="checked:bg-none text-red-700 focus:ring-0 focus:ring-offset-0" name="accountType" value="busines" />
                <span className="text-sm mr-2">کمترین قیمت</span>
              </label>
            </div>
          )}
    </>
  )
}

export default SidebarSort