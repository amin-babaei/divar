import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Compose from '../context/store'
import AuthProvider from '../context/AuthContext'
import { ChatProvider } from '../context/ChatContext'

const Layout = () => {
  return (
    <Compose components={[AuthProvider, ChatProvider]}>
        <Navbar/>
        <Outlet/>
    </Compose>
  )
}

export default Layout