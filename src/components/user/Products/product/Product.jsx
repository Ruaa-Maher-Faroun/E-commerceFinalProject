import React, { useState } from 'react'
import { Col } from 'react-bootstrap';
import ProductModal from '../../ProductModal/ProductModal';
import "./productSyles.css"
import ProductCard from './productCard/ProductCard';
export default function Product({product}) {
  const [modalShow, setModalShow] = useState(false);

  return (
      <>
        <ProductModal
          show={modalShow} product={product} key={product._id} 
          onHide={() => setModalShow(false)}
          product_id={product._id}
          />
        <Col className="mb-5">
            <ProductCard product={product} setModalShow={setModalShow} modalShow={modalShow} />
        </Col>
      </>
  )
}
