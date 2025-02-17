import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../../customHooks/useFetch';
// import Loader from '../../Loader/Loader';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductDetails() {
    const {productId} = useParams();
    const {error,data,isLoading} =  useFetch(`https://ecommerce-node4.onrender.com/products/${productId}`)
    if (isLoading) {
        // return <Loader />;
    }
  
    const product = {...data.data.product};
    const addProductToCart = async() => {
        try{
            const token = localStorage.getItem('userToken');
            console.log(productId);
            
            const response = await axios.post("https://ecommerce-node4.onrender.com/cart",
                {
                    productId: productId,
                },
                {
                    headers:{
                        Authorization: `Tariq__${token}`,
                    }
                }
            )
            if(response.status === 201){
                console.log("added");
                
                toast.success('Added to cart', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
            }
            
        }catch(error){
            console.log("Error ",error);
            
        }finally{

        }
    }
    return (
        <Card>
        <Card.Img variant="top" src={product.mainImage.secure_url} className='w-25' />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.price}</Card.Text>
          <Card.Text>{product.description}</Card.Text>
          <Button variant='dark' onClick={addProductToCart}>Add to Cart</Button>
         
        </Card.Body>
      </Card>

  )
}
