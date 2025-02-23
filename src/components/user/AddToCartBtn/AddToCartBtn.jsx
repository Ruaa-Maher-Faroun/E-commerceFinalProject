import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import style from "./addtocartbtn.module.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ErrorsPage from '../../../pages/user/errorsPage/ErrorsPage';
import { CartContext } from '../../../context/user/CartContext';
export default function AddToCartBtn({productId}) {
    const { cartCount ,setCartCount} = useContext(CartContext);
    
    const [isAdding,setIsAdding] = useState(false);
    const [added,setAdded] = useState(false);
    const navigate = useNavigate();
    const addToCart = async() => {
        setIsAdding(true);
        const userToken = localStorage.getItem('userToken');
        try{
            const response = await axios.post("https://ecommerce-node4.onrender.com/cart",{
                productId: productId,
            },{
                headers: {
                    Authorization: `Tariq__${userToken}`
                }
            });
            if(response.status == 201){
                setCartCount(cartCount + 1);
                
                Swal.fire({
                    title: "Added to cart!",
                    text: "You have added this procust to cart successfully!",
                    icon: "success"
                  });
            }
            setAdded(true);
        }catch(error) {
            
            if(error.status == 409){
                <ErrorsPage errorMessage={"Item not added successfully because it's already in cart"}/>
                console.log("in erororklnjsdfklchwkj;efhkj;3w");
                
                
                
            }else if(error.status == 400){
                <ErrorsPage errorMessage={"You must login first"}/>
                
            }
            navigate("/cart");
            setAdded(false);
        }finally{
        setIsAdding(false);
                
        }
        
    };
  return (
    <div>
    <Button onClick={addToCart} variant='dark' className={`px-4 py-2 ${style.btnAddtoCart}`} disabled={isAdding}>
        Add to cart
        {isAdding ?
        <span className="loader"></span>

        :""
    }
        </Button>
      
    </div>
  )
}
