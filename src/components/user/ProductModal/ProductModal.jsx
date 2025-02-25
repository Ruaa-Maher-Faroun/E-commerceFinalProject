import React, {  useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../../customHooks/useFetch';
import ErrorsPage from '../../../pages/user/errorsPage/ErrorsPage';
// import Loader from '../Loader/Loader';
import { Col, Row } from 'react-bootstrap';
import ProductsLetters from '../ProductsLetters/ProductsLetters';
import './products.css';
import HandleImages from '../HandleImages/HandleImages';
import ProductCategoryInModal from '../ProductCategoryInModal/ProductCategoryInModal';
import AddToCartBtnModal from '../AddToCartBtn/AddToCartBtnModal';
import ItemQuantityModal from '../ItemQuantityModal/ItemQuantityModal';
import Spinner from 'react-bootstrap/Spinner';
export default function ProductModal(props) {

  const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/${props.product_id}`)
  const [count, setCount] = useState(1);
  if (isLoading) {
    return (<section className="loader d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        </section>)
  }
  

  if (error) {    
    <ErrorsPage errorMessage={error.message} />;

  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className=' p-5'
    >
      <Modal.Header closeButton className='border-0 '>
      </Modal.Header>

      <Modal.Body className='p-3'>
        <Row className='d-flex flex-nowrap justify-content-start'>
          <Col className='w-50'>
          <HandleImages 
          isSale={data.data.product.price !== data.data.product.finalPrice} main={data.data.product.mainImage} sub={data.data.product.subImages} />
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
              <ItemQuantityModal product={data.data.product} count={count} setCount={setCount}/>
              <AddToCartBtnModal productId={data.data.product._id}/>
              
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
