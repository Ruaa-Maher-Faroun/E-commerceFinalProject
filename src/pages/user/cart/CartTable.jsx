import React, { useContext } from 'react'
import style from './cart.module.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters';
import ItemQuantity from '../../../components/user/ItemQuantity/ItemQuantity';
import { CartContext } from '../../../context/user/CartContext';
import "./tableStyle.css"
import { Link } from 'react-router-dom';

export default function CartTable({cart,getCart,setTotal,total, update, setUpdate, setChanges}) {
    const {cartCount,setCartCount} = useContext(CartContext);
    
    const removeItem = async (itemId) => {
        try {
            const response = await axios.patch("https://ecommerce-node4.onrender.com/cart/removeItem", {
                productId: itemId
            },
                {
                    headers: {
                        Authorization: `Tariq__${localStorage.getItem('userToken')}`
                    }
                });
            if (response.status === 200) {
                setCartCount(cartCount - 1)
                getCart();
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Table bordered className='tableSize'  >

            <thead>
                <tr>
                    <th className={`${style.th} py-2 px-5`}>Product</th>
                    <th className={`${style.th} py-2 px-5 pricetable`}>Price</th>
                    <th className={`${style.th} py-2 px-5`}>Quantity</th>
                    <th className={`${style.th} py-2 px-5`}>Subtotal</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {cart.map((item) => {
                    return <tr key={item._id} >
                        <td className='text-start align-items-center d-flex name'>
                            <Button className={`${style.removeBtn} me-2`} onClick={() => removeItem(item.productId)}>X</Button>
                            <img src={item.details.mainImage.secure_url} alt="" className={`${style.cartImg} me-2`} />
                        <p className='title p-0 m-0'>
                         <Link to={`/product/${item.productId}`}>
                                <ProductsLetters number={35} word={item.details.name} />
                            </Link>
                        </p>
                        </td>
                        <td className='pricetable'>
                            {item.details.price !== item.details.finalPrice ?
                            <>
                                    <del className='text-gray fnt-smaller'>
                                        ${item.details.price }
                                    </del>
                               <span className='ms-1'>
                                ${item.details.finalPrice}
                                </span>	
                            </>
                :`$${item.details.price}` 
                        }
                        </td>
                        <ItemQuantity total={total} setTotal={setTotal} update={update} setUpdate={setUpdate} setChanges={setChanges} product={item} removeItem={removeItem} />

                    </tr>

                })}

            </tbody>
        </Table>
    )
}
