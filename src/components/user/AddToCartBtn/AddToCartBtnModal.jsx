import React, { useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { useContext } from 'react'
import "./btnStyleLoader.css"
import axios from 'axios';
import { CartContext } from '../../../context/user/CartContext';
import Swal from 'sweetalert2'
import "../AddToCartBtn/btnStyleLoader.css"



export default function AddToCartBtnModal({ productId }) {
        const [isAdding, setIsAdding] = useState(false);
    
    const { cartCount, setCartCount } = useContext(CartContext);
    const addToCart = async () => {
        setIsAdding(true);

        const userToken = localStorage.getItem('userToken');
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
        } catch(error) {
            if (error.status == 409) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Item not added because it's already in cart"
                  })
                  
                  
                } else if (error.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You must login first"
                  })
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message
                  })
                

                    }
    }finally{
        setIsAdding(false);
    }

}
    return (
        <>
          <Col className="addToCartBtn border-3">
                    <Button variant="dark w-75  ms-2 rounded-0 p-3 border-1" onClick={addToCart} className={`ld-ext-right${isAdding ? "running" : ""}`} disabled={isAdding} >
                        
                        Add to Cart
                        <div className={`ld ld-ring ld-spin ms-2 running ${isAdding ? "" : "d-none"}`}>
                        </div>
                    
                    </Button>
                </Col>
        </>
    )
}
