import React from 'react'
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Product({product}) {
    console.log(product);
    
  return (
    <Col>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.mainImage.secure_url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        <Button variant="primary">Details</Button>
      </Card.Body>
    </Card>
    </Col>
  )
}
