import React from 'react'
import Products from '../../../pages/user/products/Products'
import { Container } from 'react-bootstrap'
import style from '../../../pages/user/home/homePage.module.css';

export default function FeaturedCollection() {
  return (
    <Container className={`-center ${style.homeSections}`}>
      <h2>Featured Collection</h2>
      <p>A powerful headline about your product’s features to give focus to your chosen product collection</p>
      <Products numberOfProducts={3}/>
    </Container>
  )
}
