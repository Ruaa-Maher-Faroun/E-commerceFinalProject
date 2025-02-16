import React from 'react'
import ShowProducts from '../../../components/user/Products/showProducts/ShowProducts'
import { Container } from 'react-bootstrap';

export default function Products({errorMessage}) {
  

  return (
    <section className='content'>
      <Container className='h-100'>
        <ShowProducts />
      </Container>
  </section>
  )
}


