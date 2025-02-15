import React from 'react'
import useFetch from '../../../../customHooks/useFetch'
import Loader from '../../Loader/Loader';
import Product from '../product/Product';
import { Container, Row } from 'react-bootstrap';

export default function ShowProducts() {
  const {error,data,isLoading} = useFetch("https://ecommerce-node4.onrender.com/products?page=1&limit=8");
 

  if(isLoading){
    return <Loader />;}

  return (
    <>
    <Container>

    <Row className='my-5 justify-content-start'>
      {data.data.products.map(product =>  <Product product={product} key={product._id}/>)}
    </Row>
    </Container>
    </>
  )
}
