import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../../customHooks/useFetch';
import ErrorsPage from '../../../pages/user/errorsPage/ErrorsPage';
import Loader from '../Loader/Loader';
import { Col, Row } from 'react-bootstrap';
import ProductsLetters from '../ProductsLetters/ProductsLetters';
import './products.css';
import HandleImages from '../HandleImages/HandleImages';
import ProductCategoryInModal from '../ProductCategoryInModal/ProductCategoryInModal';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
export default function ProductModal(props) {

  const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/${props.product_id}`)
  const [count, setCount] = useState(1);
  if (isLoading) {
    return <Loader />
  }
  

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

      <Modal.Body className='p-3'>
        <Row className='d-flex flex-nowrap justify-content-start'>
          <Col className='w-50'>
          <HandleImages isSale={data.data.product.price !== data.data.product.finalPrice} main={data.data.product.mainImage} sub={data.data.product.subImages} />
          </Col>
          <Col className=''>
            <div className="product-content d-flex flex-column border-bottom pb-4">

              <h3 className='mb-4'>{data.data.product.name}</h3>
              <p className='fnt-bigger'>
                {data.data.product.price !== data.data.product.finalPrice ?
                <>
                <span className='text-gray'>
                <del>
                  ${data.data.product.price}
                </del>
                </span>
                <span>
                &nbsp;	${data.data.product.finalPrice}
                </span>
                </>
                :
                `$${data.data.product.price}` 

              }
              </p>
              <p className='mb-4'><ProductsLetters number={100} word={data.data.product.description} /></p>
              <div className="btns d-flex align-items-center">

              <Col md={4} className="qty justify-content-center d-flex py-2 align-items-center border border-dark border-3">
                    <Button  variant="light" onClick={decrement}>-</Button>
                    <span className='mx-2'>{count}</span>
                    <Button  variant="light" onClick={increment}>+</Button>

              </Col>
              <Col className="addToCartBtn border-3">
               {/* <AddToCartBtn productId={product._id} /> */}
                <Button variant="dark w-75  ms-2 rounded-0 p-3 border-1" onClick={() => props.addToCart(data.data.product)}>Add to Cart</Button>
              </Col>
              </div>
            </div>
            <div className="product-category mt-2">
              <span>
                Category: &nbsp;	
                <ProductCategoryInModal categoryId={data.data.product.categoryId}/>
                </span>
            </div>
          
          </Col>
         
        </Row>
       
      </Modal.Body>
 
    </Modal>
  )
}
