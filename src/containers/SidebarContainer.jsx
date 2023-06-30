import React from 'react'
import SidebarCategory from '../components/sidebar/Category'
import SidebarFooter from '../components/sidebar/Footer'
import SidebarSort from '../components/sidebar/Sort'

const SidebarContainer = () => {
  return (
      <div className="flex mt-5 gap-x-4 overflow-auto sm:block sm:mt-0 sm:fixed sm:w-56 sm:top-28 sm:overflow-scroll sm:side-h hide-scroll z-10">
        <SidebarCategory/>
        <hr />
        <SidebarSort/>
        <hr />
        <SidebarFooter/>
      </div>
  )
}

export default SidebarContainer