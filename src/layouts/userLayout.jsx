import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavbar from '../components/user/Navbars/mainNavbar/MainNavbar'
import Footer from '../components/user/Footer/Footer'

export default function UserLayout() {
  return (
    <>
    <MainNavbar />
      <Outlet />
     <Footer />
    </>
  )
}
