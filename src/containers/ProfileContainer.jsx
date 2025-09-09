import { SEO } from "../utils/SEO"
import { Outlet } from "react-router"
import ProfileSidebar from "../pages/profile/ProfileSidebar"

const ProfileContainer = () => {

  return (
    <section className={`container relative mx-auto px-3 font-light`}>
      <SEO 
        title="امین دیوار - دیوار من" 
        description="مشاهده و مدیریت اطلاعات حساب کاربری در امین دیوار"
        ogType="profile"
        pageType="private"
      />
      <ProfileSidebar />
      <Outlet />
    </section>
  )
}

export default ProfileContainer