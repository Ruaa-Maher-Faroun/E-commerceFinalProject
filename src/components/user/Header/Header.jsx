import React from 'react'
import style from '../../../pages/user/home/homePage.module.css';
import { Container } from 'react-bootstrap';
import ShopNowBtn from '../ShopNowBtn/ShopNowBtn';

export default function Header() {
  return (
    <header className={`${style.header}`}>
<Container>
    
    <div>
      <h1>Headline that grabs people’s attention</h1>
      <ShopNowBtn />
    </div>
</Container>
    </header>
  )
}
