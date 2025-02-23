import React from 'react'
import { Link } from 'react-router-dom';
import style from './sidebar.module.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function SideBar() {
  return (
    <Sidebar className={`${style.sideBar} fixed-left`}>
    <Menu>
      <MenuItem component={<Link to="/profile/info" />}>User Information</MenuItem>
      <MenuItem component={<Link to="/profile/orders" />}>Orders History</MenuItem>
    </Menu>
  </Sidebar>
  )
}
