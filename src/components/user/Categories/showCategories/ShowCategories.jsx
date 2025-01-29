import React from 'react'
import useFetch from '../../../../customHooks/useFetch'
import Loader from '../../Loader/Loader';
import Category from '../category/Category';
import {  Container, Row } from 'react-bootstrap';

export default function ShowCategories() {
  const {error,data,isLoading} = useFetch("https://ecommerce-node4.onrender.com/categories/active");
console.log();

  if(isLoading){
    return <Loader />;}

  return (
    <>
    <Container>

    <Row className='my-5'>
    
        {data.data.categories.map(category =>  <Category id={category._id} img={category.image.secure_url} key={category._id}/>)}
        
    </Row>
    </Container>
    </>
  )
}
