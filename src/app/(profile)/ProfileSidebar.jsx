"use client"
import SidebarFooter from "@/components/sidebar/Footer"
import { useAuth, useAuthActions } from "@/context/AuthContext"
import { BsFillPersonFill, BsBookmark } from 'react-icons/bs'
import { RiFilePaper2Line } from 'react-icons/ri'
import { GrLogin } from "react-icons/gr"
import DeleteAccount from "./DeleteAccount"
import Link from "next/link"
import { usePathname } from "next/navigation"

const ProfileSidebar = () => {
  const { user } = useAuth()
  const dispatch = useAuthActions()
  const pathname = usePathname()
  return (
      <div className="flex mt-5 overflow-auto sm:block sm:mt-0 sm:fixed sm:w-56 sm:top-28 sm:overflow-scroll sm:side-h hide-scroll z-10 fon">
        <div className="hidden sm:flex sm:items-center sm:gap-x-2 sm:text-gray-500 sm:text-sm">
          <BsFillPersonFill />
          <p>
            {user?.isAdmin ? 'ادمین دیوار' : 'کاربر دیوار'}
          </p>
        </div>
        <p className="hidden sm:block text-gray-500 text-xs pr-5 my-3">{user?.phoneNumber}</p>
        <p className="hidden sm:block text-gray-500 text-xs pr-5 my-3">{user?.email}</p>
        <hr className="hidden mb-10 sm:block" />
        <Link href={"/profile/bookmarks"} className={pathname === '/profile/bookmarks' ? 'text-red-700' : 'text-black'}>
          <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50 font-normal">
            <BsBookmark />
            <h3>نشان ها</h3>
          </div>
        </Link>
        <Link href={"/profile/my-posts"} className={pathname === '/profile/my-posts' ? 'text-red-700' : 'text-black'}>
          <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50 mx-4 sm:mx-0 font-normal">
            <RiFilePaper2Line />
            <h3>آگهی های من</h3>
          </div>
        </Link>
        <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50 ml-4 sm:ml-0 font-normal" onClick={() => dispatch({ type: 'SIGNOUT' })}>
          <GrLogin />
          <h3>خروج</h3>
        </div>
        <DeleteAccount />
        <SidebarFooter />
      </div>
  )
}

export default ProfileSidebar