import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../../pages/user/home/homePage.module.css';

export default function ShopNowBtn() {
  return (
    <div  className="mt-5">
        <Link to={"/products"} className={`px-4 py-3 mt-5 ${style.goShopping}`}>SHOP NOW</Link>
    </div>
  )
}
