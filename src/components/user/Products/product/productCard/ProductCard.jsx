import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import style from "../product.module.css"
import ProductsLetters from '../../../ProductsLetters/ProductsLetters';
import AddToCartBtn from '../../../AddToCartBtn/AddToCartBtn';
import { Link } from 'react-router-dom';

export default function ProductCard({product,setModalShow,modalShow}) {
  return (
        <Card className={` mx-auto ${style.cardHeight} `} style={{ width: '18rem' }}>
            <div className={`imgSection ${style.imgSection}`}>
                <Button onClick={() => setModalShow(true)} className={`${modalShow ? "d-none": ""} modalBtn ${style.modalBtn}`}>
                    QUICK VIEW
                </Button>
                <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.mainImage.secure_url} className={`product ${style.product}`}/>
                </Link>
            </div>
            <Card.Body className={`text-center ${style.bgBody}`}>
            <Card.Title className={`${style.productHeading}`}><ProductsLetters number={24} word={product.name} /></Card.Title>
            <Card.Text className={`m-3 ${style.price}`}>${product.price}</Card.Text>
            <AddToCartBtn productId={product._id} />
            </Card.Body>
        </Card>
  )
}
