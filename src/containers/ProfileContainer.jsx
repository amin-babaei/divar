import { SEO } from "../utils/SEO"
import { Outlet } from "react-router-dom"
import ProfileSidebar from "../pages/profile/ProfileSidebar"

const ProfileContainer = () => {

  return (
    <section className={`container relative min-h-[66vh] mx-auto px-3 font-light`}>
      <SEO title="امین دیوار - دیوار من"/>
      <ProfileSidebar />
      <Outlet />
    </section>
  )
}

export default ProfileContainer