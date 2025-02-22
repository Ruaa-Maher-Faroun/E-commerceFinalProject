import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ItemQuantity from '../../../components/user/ItemQuantity/ItemQuantity';
import Loader from '../../../components/user/Loader/Loader';
import ErrorsPage from '../errorsPage/ErrorsPage';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate();
    const [cart,setCart] = useState(null);
    const [isLoading,setisLoading] = useState(true);
    const [error,setError] = useState(null);
    
    
    const getCart = async () => {
        setisLoading(true);
        
        const userToken = localStorage.getItem('userToken');
        if(!userToken){
            <ErrorsPage errorMessage={"You need to login first"} />
            navigate('/login')
        }
        try{
            const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`,{
                headers:{
                    Authorization: `Tariq__${userToken}`
                }
            });
            setCart(response.data.products);
            
            
        }catch(error){
             if(error.status == 400){
                setError("You must login first");
                
            }
            else if(error.status == 409){
                setError("Item not added successfully because it's already in cart");
            }else{
                    setError(error.message);
                    
            }
        }finally{
            setisLoading(false);
        }
    }
    useEffect( ()=>{
        getCart();
    },[])
    
    
    if(isLoading){
        return <Loader />
    }

    if(error){
        return <ErrorsPage errorMessage={error} isCart={true}/>
    } 
   

    const removeItem = async(itemId) => {
        const userToken = localStorage.getItem('userToken');
        console.log(userToken);
        console.log(typeof itemId);
        
        
        try{
            const response = await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`,
                {"productId": itemId},
                { headers:{
                    Authorization: `Tariq__${userToken}`
                }}
            );
         
            // getCart();
            if(response.status === 200){
                console.log(response.data.cart.products);
                setCart(response.data.cart.products);
            }
            console.log(response);
            
            
            
    }
       catch(err) {
            console.log(err);
        }
    }
  return (
    <section>
      
   <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th>Item Image</th>
          <th>Item Quantity</th>
          <th>Item Price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {cart.map((item,ind)=>{
            return <tr key={item._id}>
            <td>{ind+1}</td>
            <td><ProductsLetters word={item.details.name}/></td>
             <td><img src={item.details.mainImage.secure_url} alt="" className='w-25' /></td>
             <td><ItemQuantity qty={item.quantity} /></td>
             <td>{item.details.price}</td>
             <td><Button onClick={()=>removeItem(item._id)}>
                 <FontAwesomeIcon icon={faCircleXmark} style={{color:"#d42828"}} />
                 </Button> 
                 </td>
     
             </tr>

        })}

      </tbody>
    </Table> 
  
    </section>
  )
}
