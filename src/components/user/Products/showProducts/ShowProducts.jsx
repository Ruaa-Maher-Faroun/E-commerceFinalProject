import React from 'react'
import useFetch from '../../../../customHooks/useFetch'
// import Loader from '../../Loader/Loader';
import Product from '../product/Product';
import { Row } from 'react-bootstrap';

import ErrorsPage from '../../../../pages/user/errorsPage/ErrorsPage';

export default function ShowProducts({numberOfProducts}) {
  const { error, data, isLoading } = useFetch("https://ecommerce-node4.onrender.com/products?limit=8");




  if (isLoading) {
    // return <Loader />;
  }

  if (error) {
    return <ErrorsPage errorMessage={error.message} />
  }
  return (
    <Row className='my-5 justify-content-start'>
      {data.data.products.map((product,ind) => {
          if(ind < numberOfProducts){
          return <Product product={product} key={product._id} />
        }else{
          return "";
        }
        })}
    </Row>


  )
}
