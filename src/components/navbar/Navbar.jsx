import {GrLocation} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Drawer from './Drawer'
import DropDown from './DropDown'

const Navbar = () => {
    
  return (
    <header className='bg-white shadow-sm w-full sticky top-0 font-Imedium py-2 z-10'>
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
            <div className='flex gap-1 items-center'>
                <DropDown/>
                <Link to='/support'>
                    <button className='hidden rounded px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                        پشتیبانی
                    </button>
                </Link>
                <Link to='/posts/create'>
                    <button className='rounded px-4 py-[10px] bg-red-700 text-white text-sm flex items-center hover:bg-red-600 duration-300'>
                        ثبت آگهی
                    </button>
                </Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar