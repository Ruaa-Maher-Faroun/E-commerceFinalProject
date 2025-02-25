import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const CartContext = createContext();
const CartContextProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);

    const userToken = localStorage.getItem('userToken');


    const getCart = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`,{
                headers:{
                    Authorization: `Tariq__${userToken}`
                }
            });
            if(response.status === 200) {
                console.log(response);
                
            const counter =response.data.products.reduce((acc, product) => acc + parseInt(product.quantity), 0);
            setCartCount(counter);
            // setTotal();
        }
            
        
    }
    useEffect( ()=>{
        if(userToken)
        getCart();
    },[])



  
    
   
   
    return  <CartContext.Provider value={{cartCount, setCartCount}}>
                {children}
            </CartContext.Provider>
}
 

export default CartContextProvider;