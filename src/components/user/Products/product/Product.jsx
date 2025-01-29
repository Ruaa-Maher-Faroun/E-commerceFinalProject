import React from 'react'
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function Product({product}) {
    console.log(product);
    
  return (
    <Col>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.mainImage.secure_url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        <Link to={`/product/${product._id}`} className="btn btn-primary">Details</Link>
      </Card.Body>
    </Card>
    </Col>
  )
}
