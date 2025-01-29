import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../../customHooks/useFetch';
import Loader from '../../Loader/Loader';
import { Card } from 'react-bootstrap';

export default function ProductDetails() {
    const {productId} = useParams();
    const {error,data,isLoading} =  useFetch(`https://ecommerce-node4.onrender.com/products/${productId}`)
    if (isLoading) {
        return <Loader />;
    }
    console.log(data.data);
    console.log(data.data);
    const product = {...data.data.product};
    return (
        <Card>
        <Card.Img variant="top" src={product.mainImage.secure_url} className='w-25' />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.price}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
         
        </Card.Body>
      </Card>

  )
}
