import React, { useContext } from 'react'
import { CartContext } from '../../../context/user/CartContext';
import axios from 'axios';
import GetCart from './getCart';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import "./tableStyle.css"

export default function ClearCartBtn() {
    const {setCartCount} = useContext(CartContext);

    const clearCart = async () => {
        try {
            const response = await axios.patch("https://ecommerce-node4.onrender.com/cart/clear", {},
                {
                    headers: {
                        Authorization: `Tariq__${localStorage.getItem('userToken')}`
                    }
                });
            if (response.status === 200) {
                <GetCart />
                setCartCount(0)
            }

        } catch (error) {
            console.log(error);

        }

    }
    
    const clearSubmit  = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor:  "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                clearCart();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        
    }


    return (
        <div className='tableSize px-0 my-3'>
            <Button variant='danger rounded-0 px-4 py-3' onClick={clearSubmit}>Clear Cart</Button>

        </div>
    )
}
