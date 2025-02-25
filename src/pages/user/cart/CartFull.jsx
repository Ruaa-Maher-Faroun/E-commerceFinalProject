import React, { useEffect, useState } from 'react'
import ClearCartBtn from './ClearCartBtn'
import CartTable from './CartTable'
import {  Row } from 'react-bootstrap'
import "./tableStyle.css"
import OrderSummary from '../../../components/user/Orders/orderSummary'

export default function CartFull({ cart, getCart, update, setUpdate }) {
    const [changes, setChanges] = useState(false);
    const [total, setTotal] = useState(0);

    const updateCart = () => {
        setUpdate(true);
    }
    useEffect(() => {
        let newTotal = 0;
        cart.forEach((item) => {
            newTotal += item.details.finalPrice * item.quantity;
        });
        setTotal(newTotal);
    },[]);
    return (
        <Row className='d-flex justify-content-center w-100 my-5'>
            <ClearCartBtn />
            <CartTable setTotal={setTotal} total={total} cart={cart} getCart={getCart} update={update} setUpdate={setUpdate} setChanges={setChanges} />

        <OrderSummary total={total} cart={cart} getCart={getCart} />
      
        </Row>
    )
}


