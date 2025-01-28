import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import MainNavbar from '../components/user/mainNavbar/MainNavbar'

export default function UserLayout() {
  return (
    <>
    <MainNavbar />
      <Outlet />
    </>
  )
}
