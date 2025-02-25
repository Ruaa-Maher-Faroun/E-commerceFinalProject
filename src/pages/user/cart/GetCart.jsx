import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorsPage from '../errorsPage/ErrorsPage';
import axios from 'axios';

export default function GetCart() {
    const [cart, setCart] = useState(null);
    const [isLoading, setisLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();




    const getCart = async () => {
        setisLoading(true);
        const userToken = localStorage.getItem('userToken');
        if (!userToken) {
            <ErrorsPage errorMessage={"You need to login first"} />
            navigate('/login')
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`, {
                headers: {
                    Authorization: `Tariq__${userToken}`
                }
            });
            setCart(response.data.products);
        } catch (error) {
            if (error.status == 400) {
                setError("You must login first");

            }
            else if (error.status == 409) {
                setError("Item not added successfully because it's already in cart");
            } else {
                setError(error.message);

            }
        } finally {
            setisLoading(false);
        }
    }

    useEffect(() => {
        getCart();
    }, [])


    return  {cart,getCart,error,isLoading};
}
