import React from 'react'
import {CiLocationOn} from 'react-icons/ci'
import {BsFillPersonFill} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
const Navbar = () => {
  return (
    <header className='bg-white shadow-sm w-full sticky top-0 font-main py-2'>
        <nav className='flex items-center justify-between container mx-auto px-3'>
            <div className='flex items-center'>
                <img src="/download.svg" alt="" className='w-12 h-12 cursor-pointer'/>
                <hr className='inline-block h-5 w-[1px] bg-gray-200 mx-3'/>
                <GiHamburgerMenu className='block sm:hidden'/>
                <button className='hidden rounded px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                    <CiLocationOn className='ml-1 text-lg'/>
                    مشهد
                </button>
            </div>
            <div className='flex items-center'>
                <button className='hidden rounded px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                    <BsFillPersonFill className='ml-1 text-lg'/>
                    دیوار من
                </button>
                <button className='hidden rounded mx-2 px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                    پشتیبانی
                </button>
                <button className='rounded px-4 py-[10px] bg-red-700 text-white text-sm flex items-center hover:bg-red-600 duration-300'>
                    ثبت آگهی
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar