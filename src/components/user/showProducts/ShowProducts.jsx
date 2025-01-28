import React from 'react'
import useFetch from '../../../customHooks/useFetch'
import Loader from '../loader/Loader';
import Product from '../product/Product';
import { Container, Row } from 'react-bootstrap';

export default function ShowProducts() {
  const {error,data,isLoading} = useFetch("https://ecommerce-node4.onrender.com/products");
  if(data.data)
console.log(data.data.products);

  if(isLoading){
    return <Loader />;}

  return (
    <>
    <Container>

    <Row className='my-5'>
      {data.data.products.map(product =>  <Product product={product} key={product._id}/>)}
    </Row>
    </Container>
    </>
  )
}
