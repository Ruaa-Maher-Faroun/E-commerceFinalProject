import React from 'react'
import Product from '../product/Product';
import { Row } from 'react-bootstrap';
import SortProduct from '../../SortProduct/SortProduct';

export default function ShowProducts({data}) {
  
  return (
    <>
      <SortProduct dataNum={data.data.products.length}/>
      <Row className='my-5 justify-content-start'>
        {data.data.products.map(product => <Product product={product} key={product._id} />)}
          
      </Row>

      </>

  )
}
