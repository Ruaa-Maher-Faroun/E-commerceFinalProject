import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../../customHooks/useFetch';
import ErrorsPage from '../../../pages/user/errorsPage/ErrorsPage';
import Loader from '../Loader/Loader';
import { Col, Row } from 'react-bootstrap';
import ProductsLetters from '../ProductsLetters/ProductsLetters';

export default function ProductModal(props) {

  const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/${props.product_id}`)
  const [count, setCount] = useState(1);
  if (isLoading) {
    return <Loader />
  }

  console.log(data);


  if (error) {
    <ErrorsPage errorMessage={error.message} />;

  }

  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    setCount(count - 1);
  }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>

      <Modal.Body className='p-5'>
        <Row className='d-flex flex-nowrap justify-content-start align-items-center'>
          <Col className='w-50'>
            <img src={data.data.product.mainImage.secure_url} alt="product image" />
          </Col>
          <Col className='w-50'>
            <h4><ProductsLetters word={data.data.product.name} /></h4>
            <p>$
              {data.data.product.price}
            </p>
            <p><ProductsLetters word={data.data.product.description} /></p>
            <div className="qty d-flex p-2 w-50 align-items-start border border-dark border-3">
                  <Button variant="light" onClick={decrement}>-</Button>
                  <span>{count}</span>
                  <Button variant="light" onClick={increment}>+</Button>

            </div>
            <Button variant="light" onClick={() => props.addToCart(data.data.product)}>Add to Cart</Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <p>Category: {data.data.product.categoryId}
        </p>
      </Modal.Footer>
    </Modal>
  )
}
