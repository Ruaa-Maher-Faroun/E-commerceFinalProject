import React from 'react'
import { Container } from 'react-bootstrap'
import ShopNowBtn from '../ShopNowBtn/ShopNowBtn'
import style from '../../../pages/user/home/homePage.module.css';

export default function HighlightedSection() {
  return (
        <Container className={`${style.highlightedSection} text-center ${style.homeSections}`}>
    
      <h2>Highlighted Section</h2>
      <p>What differentiates you from the competition? Use this section to talk about it. Don’t forget to talk about the benefits.</p>
       <ShopNowBtn />
    </Container>
  )
}
