import React from 'react'
import Products from '../../../pages/user/products/Products'
import { Container } from 'react-bootstrap'
import style from '../../../pages/user/home/homePage.module.css';
import FeaturedProducts from '../Products/featuredProducts/FeaturedProducts';

export default function FeaturedCollection() {
  return (
    <Container className={`text-center ${style.homeSections}`}>
      <h2>Featured Collection</h2>
      <p>A powerful headline about your product’s features to give focus to your chosen product collection</p>
      <FeaturedProducts  />
    </Container>
  )
}

