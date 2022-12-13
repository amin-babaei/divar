import { Outlet } from "react-router-dom"
import ProfileSidebar from "../pages/profile/ProfileSidebar"

const ProfileContainer = () => {
  return (
    <section className="container mx-auto px-3 relative font-Ilight">
        <ProfileSidebar/>
        <Outlet/>
    </section>
  )
}

export default ProfileContainer