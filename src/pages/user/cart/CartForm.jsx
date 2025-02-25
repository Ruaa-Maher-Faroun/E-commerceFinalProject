import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import style from './cart.module.css';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


export default function CartForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState:{errors} } = useForm();

    const getOrder = (data) =>{
        setIsLoading(true);
        console.log("get coupon");
        console.log(data);
        
    }
    return (
        <Form className='d-flex mb-5 w-100' handleSubmit={getOrder}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control {...register("coupon")} className={`${style.couponForm} border-dark rounded-0 px-4 py-3`} type="text" placeholder="Coupon code" />
            </Form.Group>
            <Button variant='dark rounded-0 px-4 py-3' className={style.cartBtns} >Apply Coupon</Button>
            {
                error ? <span>Please Enter Your Coupon</span>:""
            }

        </Form>
    )
}
