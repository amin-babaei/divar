import React from 'react'
import SidebarCategory from '../components/sidebar/Category'
import SidebarFooter from '../components/sidebar/Footer'
import SidebarSort from '../components/sidebar/Sort'

const SidebarContainer = () => {
  return (
    <section className="container mx-auto px-3 relative">
      <div className="border-l-violet-700 hidden sm:block fixed w-56 top-28 overflow-scroll side-h hide-scroll">
        <SidebarCategory/>
        <hr />
        <SidebarSort/>
        <hr />
        <SidebarFooter/>
      </div>
    </section>
  )
}

export default SidebarContainer