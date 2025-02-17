import React from 'react'
import style from '../../../pages/user/home/homePage.module.css';
import { Container } from 'react-bootstrap'
import Categories from '../../../pages/user/categories/Categories'

export default function FeaturedCategories() {
    return (


            <Container className={`text-center ${style.homeSections}`}>
        
            <h2>Featured Categories</h2>
            <p>Give your customers insight into your product collection. Select imagery and name that relates to the product category.

            </p>

            <Categories />
        </Container>

    )
}
