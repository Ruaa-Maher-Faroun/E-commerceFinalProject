import React from 'react'
import useFetch from '../../../../customHooks/useFetch'
import ErrorsPage from '../../../../pages/user/errorsPage/ErrorsPage'
import { Row } from 'react-bootstrap'
import Product from '../product/Product'
import Spinner from 'react-bootstrap/Spinner'

export default function FeaturedProducts() {
  const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/Customer/products`)

  if (isLoading) {
    return (
      <section className="loader d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </section>
    )
  }

  if (error) {
    return <ErrorsPage errorMessage={error.message} />
  }

  const products = data?.data?.products || data?.products || []

  return (
    <Row className="my-5 justify-content-start">
      {products.length > 0 ? (
        products.map(product => (
          <Product product={product} key={product._id} />
        ))
      ) : (
        <div className="alert text-danger">There are no products yet</div>
      )}
    </Row>
  )
}
