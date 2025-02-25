import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../../../context/user/CartContext';
import Loader from '../Loader/Loader';

export default function ItemQuantity({ product, removeItem ,total, setTotal}) {
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(product.quantity);
  const [error, setError] = useState(null);
  const { cartCount, setCartCount } = useContext(CartContext);

  // const increaseQuantity = async() => {
  //   try{
  //     const response =  await axios.patch(`https://ecommerce-node4.onrender.com/cart/incraseQuantity`,{},{});

  //   }catch(error){
  //     setError(error);
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   setTotal(total +(qty*product.details.finalPrice))
  // },[qty]);
  const decrement = () => {
    setLoading(true);

    if (qty - 1 <= 0) {
      removeItem(product.productId);
    }
    setQty(qty - 1);
    decrementRequest()
    setCartCount(cartCount - 1);
    setTotal(total  - product.details.finalPrice)

  }
  const decrementRequest = async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/decraseQuantity`, {
        productId: product.productId
      }, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem('userToken')}`
        }
      });
      console.log(response);


    } catch (error) {

      setError(error);
      console.log(error);
      

    } finally {
      setLoading(false);
    }
  }

  const incrementRequest = async () => {

    console.log("incre");

    try {
      console.log("in");

      const response = await axios.patch(`${import.meta.env.VITE_BURL}/cart/incraseQuantity`, {
        productId: product.productId
      }, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem('userToken')}`
        }
      });
      console.log(response);

    } catch (error) {
      setError(error);
      console.log(error);


    } finally {
      setLoading(false);
    }
  }
  
  const increment = () => {
    setTotal(total + product.details.finalPrice);

    setLoading(true);

    if (qty + 1 >= product.details.stock) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quantity bigger than the stock!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    

    }
    setQty(qty + 1);
    incrementRequest();
    setCartCount(cartCount + 1)
    // setTotal(total +((qty+1)*product.details.finalPrice))

  }

 
  return (
    <>
      {loading ?
        <>
          <td><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td>
          <td><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td>
        </>
        :
        <>
          <td>
            <>
              <Button variant='light' onClick={decrement} disabled={qty <= 0 || loading}>-</Button>
              {qty}
              <Button variant='light' onClick={increment} disabled={qty >= product.details.stock || loading}>+</Button>
              {qty >= product.details.stock ? <span>More than stock</span> : ""}
            </>
          </td>
          <td>
            {qty * product.details.finalPrice}
          </td>
        </>
      }
    </>
  )
}
