import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import style from "./addtocartbtn.module.css"
import "./btnStyleLoader.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import ErrorsPage from '../../../pages/user/errorsPage/ErrorsPage';
import { CartContext } from '../../../context/user/CartContext';


export default function AddToCartBtn({ productId }) {
    const { cartCount, setCartCount,loading } = useContext(CartContext);
    console.log(cartCount);
    

    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(null);
    const addToCart = async () => {
        setIsAdding(true);
        const userToken = localStorage.getItem('userToken');
        if(!userToken) {
            setIsAdding(false);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must login first",
            });
        
            
        }else{

            try {
                const response = await axios.post("https://ecommerce-node4.onrender.com/cart", {
                    productId: productId,
                }, {
                    headers: {
                        Authorization: `Tariq__${userToken}`
                    }
                });
            if (response.status == 201) {
                setCartCount(cartCount + 1);
                
                Swal.fire({
                    title: "Added to cart!",
                    text: "You have added this procust to cart successfully!",
                    icon: "success"
                });
            }
            setError(null);
        } catch (error) {
            
            if (error.status == 409) {
                const err = {
                    message: "Item not added successfully because it's already in cart",
                };
                setError(err);
            } else if (error.status == 400) {
                const err = {
                    message: "You must login first",
                };
                setError(err);
            } else {
                setError(error)
            }
        } finally {
            setIsAdding(false);
        }
    }
        
    };
    return (
        <>
            <div className='d-flex align-items-center justify-content-center w-100'>
                    <Button onClick={addToCart} variant='dark' className={`ld-ext-right d-flex text-center align-items-center px-4 py-2 ${style.btnAddtoCart} ${isAdding ? "running" : ""}`} disabled={isAdding} >
                        Add to cart
                        <div className={`ld ld-ring ld-spin ms-2 running ${isAdding ? "" : "d-none"}`}>
                        </div>
                    </Button>

            </div>
            {error ? <ErrorsPage errorMessage={error.message}/>:""}

        </>
    )
}
