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
      <div className="hidden sm:block fixed w-56 top-28 overflow-scroll side-h hide-scroll">
        <div className="flex items-center gap-x-2 text-gray-500 text-sm">
          <BsFillPersonFill />
          <p>
            {user?.isAdmin ? 'ادمین دیوار' : 'کاربر دیوار'}
          </p>
        </div>
        <p className="text-gray-500 text-xs pr-5 my-3">{user?.phoneNumber}</p>
        <p className="text-gray-500 text-xs pr-5 my-3">{user?.email}</p>
        <hr className="mb-10" />
        <NavLink to={"/profile/bookmarks"} className={({ isActive }) =>
          isActive && 'text-red-700'
        }>
          <div className="border-b py-5 flex items-center gap-x-2 text-[15px] cursor-pointer hover:bg-gray-50">
            <BsBookmark />
            <h3>نشان ها</h3>
          </div>
        </NavLink>
        <NavLink to={"/profile/my-posts"} className={({ isActive }) =>
          isActive && 'text-red-700'
        }>
          <div className="border-b py-5 flex items-center gap-x-2 text-[15px] cursor-pointer hover:bg-gray-50">
            <RiFilePaper2Line />
            <h3>آگهی های من</h3>
          </div>
        </NavLink>
        <div className="border-b py-5 flex items-center gap-x-2 text-[15px] cursor-pointer hover:bg-gray-50" onClick={() => dispatch({ type: 'SIGNOUT' })}>
          <GrLogin/>
          <h3>خروج</h3>
        </div>
        <DeleteAccount/>
        <SidebarFooter />
      </div>
    </section>
  )
}

export default ProfileSidebar