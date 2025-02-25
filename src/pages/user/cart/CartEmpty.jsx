import React from 'react'
import { Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function CartEmpty() {
    const navigate = useNavigate();
    
    const goToShop = () => {
        navigate('/products');
    }

    return (
        <>
            <Col className="alert alert-secondary w-100" role="alert">
                Your cart is currently empty.
            </Col>
            <Col className='px-0'>
                <Button variant='dark rounded-0 px-4 py-3' onClick={goToShop}>Return to Shopping</Button>
            </Col>
        </>
    )
}
