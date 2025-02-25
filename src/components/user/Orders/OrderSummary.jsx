import React from 'react'
import "../../../pages/user/cart/tableStyle.css"
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// import OrderRequest from './OrderRequest';

export default function OrderSummary({ total }) {
    const navigate = useNavigate();
    const GoToOrder = () => {
        navigate("/order");
    }

    return (
        <>
            <div className="order tableSize p-0 my-5 d-flex align-items-start">
                <div className="bgLight ms-auto p-5 orderSize">
                    <h2 className='mb-5 orderTitle'>
                        Cart totals

                    </h2>
                    <div className="subTotal d-flex justify-content-between w-100">
                        <p className='fontLight  mb-1'>
                            Subtotal

                        </p>
                        <p className='  mb-1'>${total.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className="total d-flex justify-content-between w-100">
                        <p className='fontLight'>
                            Total
                        </p>
                        <p className='priceOrder'>${total.toFixed(2)}</p>
                    </div>

                    <Button onClick={GoToOrder} variant='dark rounded-0 w-100 py-3 mt-5' >
                        Proceed to checkout
                    </Button>
                </div>
            </div>


        </>
    )
}
