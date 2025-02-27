import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import style from './sidebar.module.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default function SideBar() {
  const [width,setWidth] = useState(window.innerWidth);
  const breakpoint = 768;
  
  useEffect(()=>{
      window.addEventListener("resize", () => setWidth(window.innerWidth));
  
  },[])
  return (
    <Sidebar className={`${style.sideBar} h-100 fixed-left`} breakpoint={breakpoint} collapsed={width<breakpoint}>
    <Menu>
      <MenuItem component={<Link to="/profile/info" />}>User Information</MenuItem>
      <MenuItem component={<Link to="/profile/orders" />}>Orders History</MenuItem>
    </Menu>
  </Sidebar>
  )
}
