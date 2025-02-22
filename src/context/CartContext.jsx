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
            setCartCount(response.data.count);
        
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