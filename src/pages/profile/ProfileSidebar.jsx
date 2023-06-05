import SidebarFooter from "../../components/sidebar/Footer"
import { useAuth, useAuthActions } from "../../context/AuthContext"
import { BsFillPersonFill, BsBookmark } from 'react-icons/bs'
import { RiFilePaper2Line } from 'react-icons/ri'
import { GrLogin } from "react-icons/gr"
import { NavLink } from "react-router-dom"
import DeleteAccount from "./DeleteAccount"

const ProfileSidebar = () => {
  const { user } = useAuth()
  const dispatch = useAuthActions()
  return (
    <section className="container mx-auto px-3 relative">
      <div className="flex mt-10 gap-x-4 overflow-auto sm:block sm:mt-0 sm:fixed sm:w-56 sm:top-28 sm:overflow-scroll sm:side-h hide-scroll">
        <div className="hidden sm:flex sm:items-center sm:gap-x-2 sm:text-gray-500 sm:text-sm">
          <BsFillPersonFill />
          <p>
            {user?.isAdmin ? 'ادمین دیوار' : 'کاربر دیوار'}
          </p>
        </div>
        <p className="hidden sm:block text-gray-500 text-xs pr-5 my-3">{user?.phoneNumber}</p>
        <p className="hidden sm:block text-gray-500 text-xs pr-5 my-3">{user?.email}</p>
        <hr className="mb-10" />
        <NavLink to={"/profile/bookmarks"} className={({ isActive }) =>
          isActive ? 'text-red-700' : 'text-black'
        }>
          <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50">
            <BsBookmark />
            <h3>نشان ها</h3>
          </div>
        </NavLink>
        <NavLink to={"/profile/my-posts"} className={({ isActive }) =>
          isActive ? 'text-red-700' : 'text-black'
        }>
          <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50">
            <RiFilePaper2Line />
            <h3>آگهی های من</h3>
          </div>
        </NavLink>
        <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50" onClick={() => dispatch({ type: 'SIGNOUT' })}>
          <GrLogin />
          <h3>خروج</h3>
        </div>
        <DeleteAccount />
        <SidebarFooter />
      </div>
    </section>
  )
}

export default ProfileSidebar