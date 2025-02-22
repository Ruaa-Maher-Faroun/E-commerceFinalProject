import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import style from "../product.module.css"
import ProductsLetters from '../../../ProductsLetters/ProductsLetters';
import AddToCartBtn from '../../../AddToCartBtn/AddToCartBtn';

export default function ProductCard({product,setModalShow,modalShow}) {
  return (
        <Card className={` mx-auto ${style.cardHeight} `} style={{ width: '18rem' }}>
            <div className={`imgSection ${style.imgSection}`}>
                <Button onClick={() => setModalShow(true)} className={`${modalShow ? "d-none": ""} modalBtn ${style.modalBtn}`}>
                    QUICK VIEW
                </Button>
                <Card.Img variant="top" src={product.mainImage.secure_url} className={`product ${style.product}`}/>
            </div>
            <Card.Body className={`text-center ${style.bgBody}`}>
            <Card.Title className={`${style.productHeading}`}><ProductsLetters word={product.name} /></Card.Title>
            <Card.Text className={`m-3 ${style.price}`}>${product.price}</Card.Text>
            <AddToCartBtn productId={product._id} />
            </Card.Body>
        </Card>
  )
}
