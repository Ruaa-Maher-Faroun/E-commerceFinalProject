import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap';
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters';
import ItemQuantity from '../../../components/user/ItemQuantity/ItemQuantity';
import Loader from '../../../components/user/Loader/Loader';
import ErrorsPage from '../errorsPage/ErrorsPage';
import { useNavigate } from 'react-router-dom';
import style from './cart.module.css';
import axios from 'axios';
import { UserContext } from '../../../context/user/UserContext';
import { CartContext } from '../../../context/user/CartContext';
export default function Cart() {
    const {user} = useContext(UserContext);
    console.log(user);
    const { cartCount ,setCartCount} = useContext(CartContext);
  
    
    const navigate = useNavigate();
    const [cart,setCart] = useState(null);
    const [isLoading,setisLoading] = useState(true);
    const [error,setError] = useState(null);
    
    
    const getCart = async () => {
        setisLoading(true);
        console.log("in");
        
        
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
            setCart(response.data.products);
            console.log(response.data.products);
            
            
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
   

    const removeItem = async (itemId) => {
        const userToken = localStorage.getItem('userToken');
        console.log(itemId);
        
        
        try{
             const response = await axios.patch("https://ecommerce-node4.onrender.com/cart/removeItem",{
                 productId: itemId
             },
             {
                 headers: {
                     Authorization: `Tariq__${userToken}`
                 }
             });
             if (response.status === 200){
                 setCartCount(cartCount-1)
                 getCart();
             }

        }catch(error){
         console.log(error);
       
        }            
    }

    const clearCart = async () =>{
        const userToken = localStorage.getItem('userToken');
        
       try{
            const response = await axios.patch("https://ecommerce-node4.onrender.com/cart/clear",{},
            {
                headers: {
                    Authorization: `Tariq__${userToken}`
                }
            });
            if (response.status === 200){
                getCart();
                setCartCount(0)
            }
               
        
       }catch(error){
        console.log(error);
      
       }
        
    }

  return (
    <section className=''>
        <Container className='content'>
            <Button variant='danger' onClick={clearCart}>Clear Cart</Button>
      

      <Row className='d-flex h-100 d-flex align-items-center justify-content-center'>

   <Table  bordered>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {cart.map((item,ind)=>{
            return <tr key={item._id}>
            <td><Button className={`${style.removeBtn}`} onClick={()=>removeItem(item.productId)}>
                    X
                 </Button> 
                 <img src={item.details.mainImage.secure_url} alt="" className='w-25' />
                 <ProductsLetters word={item.details.name}/>
                 </td>
             <td>{item.details.price}</td>
             <td><ItemQuantity quantity={item.quantity} id={item.productId} stock={item.details.stock} removeItem={removeItem}/></td>
             <td>{item.details.price}</td>
     
             </tr>

})}

      </tbody>
    </Table> 
    </Row>
  
</Container>
    </section>
  )
}
