import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavbar from '../components/user/Navbars/mainNavbar/MainNavbar'

export default function UserLayout() {
  return (
    <>
    <MainNavbar />
      <Outlet />
    </>
  )
}
