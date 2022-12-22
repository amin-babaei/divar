import Helmet from "react-helmet"
import { Outlet } from "react-router-dom"
import ProfileSidebar from "../pages/profile/ProfileSidebar"

const ProfileContainer = () => {

  return (
    <section className={`container relative min-h-[66vh] mx-auto px-3 font-Ilight`}>
      <Helmet>
        <title>دیوار من</title>
      </Helmet>
      <ProfileSidebar />
      <Outlet />
    </section>
  )
}

export default ProfileContainer