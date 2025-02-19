import React from 'react'
import useFetch from '../../../../customHooks/useFetch'
// import Loader from '../../Loader/Loader';
import Product from '../product/Product';
import { Container, Row } from 'react-bootstrap';

import ErrorsPage from '../../../../pages/user/errorsPage/ErrorsPage';
import SortProduct from '../../SortProduct/SortProduct';

export default function ShowProducts() {
  const { error, data, isLoading } = useFetch("https://ecommerce-node4.onrender.com/products?limit=10");




  if (isLoading) {
    return "";
  }

  if (error) {
    return <ErrorsPage errorMessage={error.message} />
  }
  console.log(data.data);
  
  return (
    <>
      <SortProduct dataNum={data.data.products.length}/>
      <Row className='my-5 justify-content-start'>
        {data.data.products.map(product => <Product product={product} key={product._id} />)}
          
      </Row>

      </>

  )
}
