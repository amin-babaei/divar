import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ProfileSidebar from "../pages/profile/ProfileSidebar"

const ProfileContainer = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user)navigate('/signin')
  },[user])
  return (
    <section className={`container mx-auto px-3 relative font-Ilight ${user ? 'opacity-100' : 'opacity-0'}`}>
        <ProfileSidebar/>
        <Outlet/>
    </section>
  )
}

export default ProfileContainer