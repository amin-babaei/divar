import { Helmet } from 'react-helmet'
import { NavLink, Outlet } from 'react-router-dom'
import { GoVerified } from 'react-icons/go'

function AdminContainer() {
    return (
        <section className={`container relative min-h-[66vh] mx-auto px-3 font-light`}>
      <Helmet>
        <title>دیوار من</title>
      </Helmet>
      <div className="flex mt-5 overflow-auto sm:block sm:mt-0 sm:fixed sm:w-56 sm:top-28 sm:overflow-scroll sm:side-h hide-scroll z-10">
        <NavLink to={"/admin/post-verify"} className={({ isActive }) =>
          isActive ? 'text-red-700' : 'text-black'
        }>
          <div className="flex gap-x-2 items-center border border-gray-200 rounded-3xl py-2 px-3 text-[15px] whitespace-nowrap sm:border-0 sm:rounded-none sm:border-b sm:py-5 cursor-pointer hover:bg-gray-50 font-normal">
            <GoVerified />
            <h3>در انتظار تأیید</h3>
          </div>
        </NavLink>
      </div>
      <Outlet /> 
    </section>
    )
}

export default AdminContainer