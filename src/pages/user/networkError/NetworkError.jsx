import React from 'react'
import { Container } from 'react-bootstrap'

export default function NetworkError() {
  return (
    <section>
      <Container className='content d-flex justify-content-center align-items-center'>
            <h1 className='alert alert-danger' >Network Error. No Internet</h1>
      </Container>
    </section>
  )
}
