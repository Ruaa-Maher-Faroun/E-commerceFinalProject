import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const [cart,setCart] = useState(null);
    const [isLoading,setisLoading] = useState(true);
    const getCart = async () => {
        const userToken = localStorage.getItem('userToken');
        try{
            const response = await axios.get("https://ecommerce-node4.onrender.com/cart",{
                headers:{
                    Authorization: `Tariq__${userToken}`
                }
            });
            console.log(response.data.products);
            setCart(response.data.products);
            
            
        }catch(error){
            console.log(error);
            
        }finally{
            setisLoading(false);
        }
    }


    useEffect( ()=>{
        getCart();
    },[])

    if(isLoading){
        return <h1>Loading...</h1>
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
      <tbody>
        {cart.map((item,ind)=>{
            return <tr key={item._id}>
            <td>{ind+1}</td>
            <td><ProductsLetters word={item.details.name}/></td>
            <td><img src={item.details.mainImage.secure_url} alt="" className='w-25' /></td>
            <td>{item.quantity}</td>
            <td>{item.details.price}</td>
            <td><FontAwesomeIcon icon={faCircleXmark} style={{color:"#d42828"}} /></td>
     
            </tr>

        })}

      </tbody>
    </Table> 
  
    </section>
  )
}
