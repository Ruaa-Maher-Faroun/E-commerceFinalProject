import React from 'react'
import Product from '../product/Product'
import { Row } from 'react-bootstrap'
import SortProduct from '../../SortProduct/SortProduct'

export default function ShowProducts({ data }) {
  // handle missing or partial data
  const products = data?.data?.products || data?.products || []

  return (
    <>
      {products.length > 0 && <SortProduct dataNum={products.length} />}

      <Row className="my-5 justify-content-start">
        {products.length > 0 ? (
          products.map(product => (
            <Product product={product} key={product._id} />
          ))
        ) : (
          <div className="alert text-danger">No products available</div>
        )}
      </Row>
    </>
  )
}
