import React from 'react'
import { Button } from 'react-bootstrap'
import style from "./addtocartbtn.module.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ErrorsPage from '../../../pages/user/errorsPage/ErrorsPage';
export default function AddToCartBtn({productId}) {
    const navigate = useNavigate();
    const addToCart = async() => {
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
                Swal.fire({
                    title: "Added to cart!",
                    text: "You have added this procust to cart successfully!",
                    icon: "success"
                  });
            }
            
        }catch(error) {
            
            if(error.status == 409){
                <ErrorsPage errorMessage={"Item not added successfully because it's already in cart"}/>
                console.log("in erororklnjsdfklchwkj;efhkj;3w");
                
          
                
            }else if(error.status == 400){
                <ErrorsPage errorMessage={"You must login first"}/>

            }
            navigate("/cart");
        }finally{
                
        }
        
    };
  return (
    <div>
    <Button onClick={addToCart} variant='dark' className={`px-4 py-2 ${style.btnAddtoCart}`}>Add to cart</Button>
      
    </div>
  )
}
