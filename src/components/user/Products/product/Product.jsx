import React from 'react'
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import style from "./product.module.css"
import ProductsLetters from '../../ProductsLetters/ProductsLetters';
export default function Product({product}) {
    console.log(product);
    
  return (
    <Col className={`mb-5`}>
       <Card className={`p-3 mx-auto ${style.cardHeight} `} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.mainImage.secure_url} />
      <Card.Body className={`text-center ${style.bgBody}`}>
        <Card.Title className={`${style.productHeading}`}><ProductsLetters word={product.name} /></Card.Title>
        <Card.Text className={`m-3 ${style.price}`}>${product.price}</Card.Text>
        <Button variant='dark' className={`px-4 py-2 ${style.btnAddtoCart}`}>Add to cart</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}
