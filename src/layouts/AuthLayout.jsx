import React from 'react'
import CustomNavbar from '../components/user/Navbars/authNavbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
      <CustomNavbar />
      <Outlet />
    </>
  )
}
