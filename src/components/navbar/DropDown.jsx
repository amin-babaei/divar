'use client'
import { Spinner } from 'flowbite-react';
import { useRef, useState } from 'react'
import { BsFillPersonFill, BsBookmark, BsFillChatLeftDotsFill } from 'react-icons/bs'
import { GrLogin } from 'react-icons/gr'
import { RiFilePaper2Line } from 'react-icons/ri';
import { useAuth, useAuthActions } from '@/context/AuthContext'
import useClickOutside from '@/hooks/useClickOutside';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';

const DropDown = () => {
    const { user, loading } = useAuth()
    const dispatch = useAuthActions()
    const menuRef = useRef(null);
    const [show, setShow] = useState(false)
    const router = useRouter();

    const handleShow = () => {
        if (!user){
            router.push('/signin')
        }
        setShow(!show)
    }
    
    useClickOutside(menuRef, () => setShow(false));
    return (
        <div ref={menuRef}>
            {loading ? <Spinner color="gray" className='ml-5'/> : 
            <button className='wordspace duration-300 relative rounded px-4 py-[10px] text-gray-400 text-sm flex items-center hover:bg-gray-100 hover:text-black'
                onClick={handleShow}>
                <BsFillPersonFill className='ml-1 text-lg' />
                دیوار من
            </button>}
            {show && user && (
                <>
                    <div className='h-5 w-5 bg-white mr-1 shadow rotate-45 absolute top-16'></div>
                    <ul className='absolute top-[74px] shadow-md bg-white w-48 font-normal'>
                        <li className='p-4 text-xs border-b'>
                            {user.phoneNumber}
                        </li>
                            <Link href='/profile/bookmarks'>
                                <li className='flex items-center gap-x-3 p-4 text-xs border-b cursor-pointer hover:bg-gray-50'>
                                    <BsBookmark size={16} />
                                        نشان ها
                                </li>
                            </Link>
                            <Link href='/profile/my-posts'>
                                <li className='flex items-center gap-x-3 p-4 text-xs border-b cursor-pointer hover:bg-gray-50'>
                                    <RiFilePaper2Line size={16} />
                                        آگهی های من
                                </li>
                            </Link>
                            <Link href='/chat'>
                                <li className='flex items-center gap-x-3 p-4 text-xs border-b cursor-pointer hover:bg-gray-50 sm:hidden'>
                                    <BsFillChatLeftDotsFill size={16} />
                                        چت
                                </li>
                            </Link>
                            <li className='flex items-center gap-x-3 p-4 text-xs cursor-pointer hover:bg-gray-100'
                                onClick={() => dispatch({ type: 'SIGNOUT' })}>
                                <GrLogin size={16} />
                                    خروج
                            </li>
                    </ul>
                </>
            )}
        </div>
    )
}

export default DropDown