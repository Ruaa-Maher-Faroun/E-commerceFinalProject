import React, { useContext, useEffect, useState } from 'react'
import {  Col, Container, Row } from 'react-bootstrap';
import Loader from '../../../components/user/Loader/Loader';
import ErrorsPage from '../errorsPage/ErrorsPage';
import { CartContext } from '../../../context/user/CartContext';
import CartFull from './CartFull';
import CartEmpty from './CartEmpty';
import GetCart from './getCart';


export default function Cart() {

    const [update, setUpdate]  = useState(false); 
    const { cartCount, setCartCount } = useContext(CartContext); 
    const {cart,getCart,isLoading,error} = GetCart();
    if(update) {
        getCart();
        setUpdate(false);
    }

    if (isLoading || update) {
        return <Loader />
    }

    if (error) {
        return <ErrorsPage errorMessage={error} isCart={true} />
    }

 


console.log(cart);

    return (
        <section>
            <Container className='content d-flex justify-content-center align-items-center'>
                <Row className='flex-column w-100'>
                    <Col>
                        <h1 className='text-center w-100 mt-5'>Cart</h1>
                    </Col>
                    {cartCount === 0 ? 
                    <CartEmpty /> : 
                    <CartFull update={update} setUpdate={setUpdate}  cart={cart} getCart={getCart}/>}
                </Row>
            </Container>
        </section>
    )
}


