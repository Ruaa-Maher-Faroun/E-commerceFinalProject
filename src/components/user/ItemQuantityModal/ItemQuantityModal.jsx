import React from 'react'
import { Button, Col } from 'react-bootstrap'

export default function ItemQuantityModal({product,count,setCount}) {

    const increment = () => {
        setCount(count + 1);
      }
      const decrement = () => {
        setCount(count - 1);
      }
  return (
    <Col md={4} className="qty justify-content-center d-flex py-2 align-items-center border border-dark border-3">
          <Button  variant="light" onClick={decrement} disabled={count <= 1}>-</Button>
          <span className='mx-2'>{count}</span>
          <Button  variant="light" onClick={increment}>+</Button>

    </Col>
  )
}
