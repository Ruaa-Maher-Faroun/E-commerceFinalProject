import React from 'react'
import useFetch from '../../../../customHooks/useFetch';
// import Loader from '../../Loader/Loader';
import {  useParams } from 'react-router-dom'
import Product from '../../Products/product/Product';
import { Container, Row } from 'react-bootstrap';

export default function CategoryProducts() {
    const {categoryId} = useParams();
    const {error,data,isLoading} = useFetch(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
    
    
    // if(isLoading) return <Loader />
    return (
    <section className='categoryProducts'>
        <Container>
            <Row>
                {data.data.products.map(product =>  <Product product={product} key={product._id}/>)}
            </Row>
        </Container>
    </section>
  )
}
