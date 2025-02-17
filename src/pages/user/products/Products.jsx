import React from 'react'
import ShowProducts from '../../../components/user/Products/showProducts/ShowProducts'
import { Container } from 'react-bootstrap';

export default function Products({numberOfProducts}) {
  

  return (
    <section className='content'>
        <ShowProducts numberOfProducts={numberOfProducts}/>

  </section>
  )
}


