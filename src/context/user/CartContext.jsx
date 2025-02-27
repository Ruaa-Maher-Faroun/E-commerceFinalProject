import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import ErrorsPage from '../../pages/user/errorsPage/ErrorsPage';
import { Spinner } from 'react-bootstrap';

export const CartContext = createContext();
const CartContextProvider = ({children}) => {
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    
    const getCart = async () => {
        setLoading(true);
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            setCartCount(0);
            setUser(null);
            setLoading(false);
           navigate("/auth")
        }else{
            try{
                const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`,{
                    headers:{
                        Authorization: `Tariq__${userToken}`
                    }
                });
                
                if(response.status === 200) {
                    const counter = response.data.products.reduce((acc, product) => acc + parseInt(product.quantity), 0);
                    setCartCount(counter);
                }
            }catch(err){
                setCartCount(0);
                setError(err);
            }finally{
                setLoading(false);
            }
            
        }
        
    }
    useEffect( ()=>{
        getCart();
    },[])

    if(loading) {
        return (<section className="loader d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </section>)
    }
    if(error) {
        return <ErrorsPage errorMessage={error.message}/>
    }


    return  <CartContext.Provider value={{cartCount, setCartCount,loading}}>
                {children}
            </CartContext.Provider>
}
 

export default CartContextProvider;