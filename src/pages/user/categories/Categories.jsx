import Loader from '../../../components/user/Loader/Loader';
import React from 'react'
import {  Container, Row } from 'react-bootstrap';
import useFetch from '../../../customHooks/useFetch';
import Category from '../../../components/user/Categories/category/Category';
import ErrorsPage from '../errorsPage/ErrorsPage';

export default function Categories() {
  const {error,data,isLoading} = useFetch(`${import.meta.env.VITE_BURL}/categories/active`);

  if(isLoading){
    return <Loader />;
  }

  if(error){
    return <ErrorsPage errorMessage={error.message} />;
  }

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

      