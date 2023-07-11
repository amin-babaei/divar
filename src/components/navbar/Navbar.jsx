import {GrLocation} from 'react-icons/gr'
import DropDown from './DropDown'
import Link from 'next/link'
import iranFont from '@/constants/localFont'
import Image from 'next/image'
import logo from '@/assets/logo.svg'

const Navbar = () => {
  return (
    <header className={`bg-white shadow-sm w-full sticky top-0 py-2 z-10 ${iranFont.variable} font-sans font-bold`}>
        <nav className='flex items-center justify-between container mx-auto px-3'>
            <div className='flex items-center'>
                <Link href='/'>
                    <Image src={logo} alt="logo" className='cursor-pointer' width={48} height={48}/>
                </Link>
                <hr className='hidden sm:inline-block h-5 w-[1px] bg-gray-200 mx-3'/>
                <button className='hidden duration-300 rounded px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                    <GrLocation className='ml-1 text-lg'/>
                    مشهد
                </button>
            </div>
            <div className='flex gap-1 items-center'>
                <DropDown/>
                <Link href='/chat'>
                    <button className='hidden duration-300 rounded px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                        چت ها
                    </button>
                </Link>
                <Link href='/support'>
                    <button className='hidden duration-300 rounded px-4 py-[10px] text-gray-400 text-sm sm:flex items-center hover:bg-gray-100 hover:text-black'>
                        پشتیبانی
                    </button>
                </Link>
                <Link href='/post/create'>
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