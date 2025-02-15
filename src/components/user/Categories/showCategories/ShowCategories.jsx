import React from 'react'
import useFetch from '../../../../customHooks/useFetch'
import Category from '../category/Category';
import {  Container, Row } from 'react-bootstrap';
import Loader from '../../Loader/Loader';

export default function ShowCategories() {
  const {error,data,isLoading} = useFetch("https://ecommerce-node4.onrender.com/categories/active");
console.log();

  if(isLoading){
    return <Loader />;
  }

  return (
    <>
    <Container>

    <Row className='my-5'>
    {error ?  <h1 className='alert alert-danger'>{error.message}</h1>:
        data.data.categories.map(category =>  <Category id={category._id} img={category.image.secure_url} key={category._id}/>)}
        
    </Row>
    </Container>
    </>
  )
}
