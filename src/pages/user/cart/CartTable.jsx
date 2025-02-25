import React, { useContext } from 'react'
import style from './cart.module.css';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters';
import ItemQuantity from '../../../components/user/ItemQuantity/ItemQuantity';
import { CartContext } from '../../../context/user/CartContext';
import "./tableStyle.css"

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
        <Table bordered className='tableSize' >

            <thead>
                <tr>
                    <th className={`${style.th} py-2 px-5`}>Product</th>
                    <th className={`${style.th} py-2 px-5`}>Price</th>
                    <th className={`${style.th} py-2 px-5`}>Quantity</th>
                    <th className={`${style.th} py-2 px-5`}>Subtotal</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {cart.map((item) => {
                    return <tr key={item._id} >
                        <td className='text-start align-items-center d-flex'>
                            <Button className={`${style.removeBtn} me-2`} onClick={() => removeItem(item.productId)}>X</Button>
                            <img src={item.details.mainImage.secure_url} alt="" className={`${style.cartImg} me-2`} />
                            <ProductsLetters number={35} word={item.details.name} />
                        </td>
                        <td className=''>
                            {item.details.price !== item.details.finalPrice ?
                            <>
                                    <del className='text-gray fnt-smaller'>
                                        ${item.details.price }
                                    </del>
                                &nbsp;	${item.details.finalPrice}
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
