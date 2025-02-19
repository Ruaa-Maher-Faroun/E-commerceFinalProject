import React from 'react'
import { Button } from 'react-bootstrap'
import style from "./addtocartbtn.module.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function AddToCartBtn({productId}) {
    const navigate = useNavigate();
    const addToCart = async() => {
        const userToken = localStorage.getItem('userToken');
        console.log(userToken);
        
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
            Swal.fire({
                icon: "error",
                title: "Oops... ",
                text: `Item not added successfully because of ${error.message}`,
            });
            navigate("/cart");
        }finally{
                // console.log("done");
                
        }
        
    };
  return (
    <div>
    <Button onClick={addToCart} variant='dark' className={`px-4 py-2 ${style.btnAddtoCart}`}>Add to cart</Button>
      
    </div>
  )
}
