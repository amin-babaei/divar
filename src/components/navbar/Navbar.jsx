import { useState } from 'react'
import {GrLocation,GrLogin} from 'react-icons/gr'
import {BsFillPersonFill,BsBookmark} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Drawer from './Drawer'
const Navbar = () => {
    const [show,setShow] = useState(false)
  return (
    <header className='bg-white shadow-sm w-full sticky top-0 font-main py-2 z-10'>
        <nav className='flex items-center justify-between container mx-auto px-3'>
            <div className='flex items-center'>
                <Link to='/'>
                    <img src="/download.svg" alt="logo" className='w-12 h-12 cursor-pointer'/>
                </Link>
                <hr className='inline-block h-5 w-[1px] bg-gray-200 mx-3'/>
                <Drawer/>
                <button className='hidden rounded px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                    <GrLocation className='ml-1 text-lg'/>
                    مشهد
                </button>
            </div>
            <div className='flex items-center'>
                <button className='relative rounded px-4 py-[10px] text-gray-400 text-sm flex items-center hover:bg-gray-100 hover:text-black'
                onClick={()=>setShow(!show)}>
                    <BsFillPersonFill className='ml-1 text-lg'/>
                    دیوار من
                </button>
                {show && (
                    <ul className='absolute top-16 shadow-md bg-white w-48'>
                        <li className='flex items-center gap-x-3 p-3 text-xs border-b hover:bg-gray-200'>
                            <GrLogin size={16} className='rotate-180'/>
                            ورود
                        </li>
                        <li className='flex items-center gap-x-3 p-3 text-xs border-b hover:bg-gray-200'>
                            <BsBookmark size={16}/>
                            نشان ها
                        </li>
                        <li className='flex items-center gap-x-3 p-3 text-xs hover:bg-gray-200'>
                            <GrLogin size={16}/>
                            خروج
                        </li>
                    </ul>
                )}
                <Link to='/support'>
                    <button className='hidden rounded mx-2 px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                        پشتیبانی
                    </button>
                </Link>
                <button className='rounded px-4 py-[10px] bg-red-700 text-white text-sm flex items-center hover:bg-red-600 duration-300'>
                    ثبت آگهی
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar