import React from 'react'
import { RxHome } from 'react-icons/rx'
import { AiOutlineCar, AiOutlineMobile } from 'react-icons/ai'
import { TbLamp, TbDice } from 'react-icons/tb'
import { MdCleaningServices, MdOutlineHomeRepairService } from 'react-icons/md'
import { FiWatch } from 'react-icons/fi'
import { HiOutlineUsers } from 'react-icons/hi'
import { GiOfficeChair } from 'react-icons/gi'

const SidebarCategory = () => {

    return (
        <>
            <h3 className="text-xs">دسته ها</h3>
            <ul className="mt-5">
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <RxHome className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">املاک</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <AiOutlineCar className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">وسایل نقلیه</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <AiOutlineMobile className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">کالای دیجیتال</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <TbLamp className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">خانه و آشپزخانه</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <MdCleaningServices className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">خدمات</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <FiWatch className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">وسایل شخصی</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <TbDice className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">سرگرمی و فراغت</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <HiOutlineUsers className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">اجتماعی</p>
                </li>
                <li className="flex items-center my-4 w-max text-gray-500 cursor-pointer hover:text-black hover:mr-1">
                    <GiOfficeChair className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">تجهیزات صنعتی</p>
                </li>
                <li className="flex items-center my-4 w-max cursor-pointer text-gray-500 hover:text-black hover:mr-1">
                    <MdOutlineHomeRepairService className="ml-2" size={20} />
                    <p className="text-[15px] font-medium">استخدام و کاریابی</p>
                </li>
            </ul>
        </>
    )
}

export default SidebarCategory