import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import GetCart from "../../../pages/user/cart/GetCart";
import ProductsLetters from "../ProductsLetters/ProductsLetters";
import ErrorsPage from "../../../pages/user/errorsPage/ErrorsPage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/user/CartContext";
import "./orderCheckout.css"
// import OrderRequest from './OrderRequest';


export default function OrderRequest() {
    const {setCartCount} = useContext(CartContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{errors} } = useForm();
    const [isLoading,setIsLoading] = useState(false);
    const [error,seterror] = useState(null);
    const [total,setTotal] = useState(0);
    const {cart} = GetCart();
    useEffect(() => {
        if(cart){
            console.log(cart);
            const sum = cart.reduce((acc,element) => (element.details.finalPrice* element.quantity )+ acc,0); 
            setTotal(sum);
        
        }
    },[cart])
    const placeOrder = async(data) => {
        setIsLoading(true);
        try{
            const response = await axios.post(`${import.meta.env.VITE_BURL}/order`,{
                    couponName:data.coupon,
                    address:data.city,
                    phone:data.phoneNumber
                    
            },{
                headers: {
                    Authorization: `Tariq__${localStorage.getItem("userToken")}`
                },
            });
            Swal.fire({
                title: "Order Placed job!",
                text: "Thank you for shopping with us!",
                icon: "success"
              });
            navigate("/");
            setCartCount(0);
        }catch(err){
            seterror(err)
            
        }finally{
            setIsLoading(false);
        }
    }
    
    if(error){
        <ErrorsPage errorMessage={error.message} />
    }
    return (
        <section>
            <Container className="content py-5 d-flex flex-column px-0">
                <h1 className="text-center w-100">Checkout</h1>
                <div className="order w-100 p-0 my-5 d-flex align-items-start">
                <Row className="w-100 justify-content-between">             
                <Form onSubmit={handleSubmit(placeOrder)} className="w-100 orderCheckout d-flex px-0 justify-content-between">
                <Col  xs="11" md="6" lg="6" xl="6">
                 <div className="d-flex justify-content-between">
                     <FloatingLabel
                         controlId="floatingFName"
                         label="First Name"
                         style={{width: "48%"}}
                     >
                         <Form.Control type="text" placeholder="" {...register("firstname", { required: "First Name is required" })} />
                         {errors.firstname ? <div className=' text-danger'>{errors.firstname.message}</div> : null}
                     </FloatingLabel>
                     <FloatingLabel
                         controlId="floatingLName"
                         label="Last Name"
                         style={{width: "48%"}}
                     >
                         <Form.Control type="text" placeholder="" {...register("lastname", { required: "Last Name is required" })} />
                         {errors.lastname ? <div className=' text-danger'>{errors.lastname.message}</div> : null}
                     </FloatingLabel>

                 </div>

                 <FloatingLabel controlId="floatingEmail" label="Email" className="my-3">
                     <Form.Control type="email" placeholder="" {...register("email", { required: "email is required" })} />
                     {errors.email ? <div className=' text-danger'>{errors.email.message}</div> : null}
                 </FloatingLabel>
        
                 <FloatingLabel controlId="floatingphoneNumber" label="Phone Number" className="my-3">
                     <Form.Control type="text" placeholder="" {...register("phoneNumber", { required: "Phone Number is required" })} />
                     {errors.phoneNumber ? <div className=' text-danger'>{errors.phoneNumber.message}</div> : null}
                 </FloatingLabel>
        
                 <FloatingLabel controlId="floatingCity" label="City" className="my-3">
                     <Form.Control type="text" placeholder="" {...register("city", { required: "City is required" })} />
                     {errors.city ? <div className=' text-danger'>{errors.city.message}</div> : null}
                 </FloatingLabel>
        
                 <FloatingLabel controlId="floatingAddress" label="Address" className="my-3">
                     <Form.Control type="text" placeholder="" {...register("address", { required: "Address is required" })} />
                     {errors.address ? <div className=' text-danger'>{errors.address.message}</div> : null}
                 </FloatingLabel>
                    <div className='d-flex mb-5 w-100'>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control {...register("coupon")} className={`style.couponForm border-dark rounded-0 px-4 py-3`} type="text" placeholder="Coupon code" />
            </Form.Group>
            <Button variant='dark rounded-0 px-4 py-3' className="cartBtns" >Apply Coupon</Button>
                        </div>   
             </Col>
            <Col  xs="11" md="5" lg="5" xl="5">
                 <div className="bgLight ms-auto p-5">
                     <h2 className='mb-5 orderTitle text-center'>
                        Your Order
                     </h2>
                     <div className="subTotal d-flex justify-content-between w-100 fw-bold fs-4">
                         <p className='  mb-1'>
                             Product
                         </p>
                         <p className='  mb-1'>
                             Subtotal
                         </p>
                     </div>
                     <hr />
                     {cart? cart.map((product) => <div key={product.productId} className="d-flex justify-content-between w-100 fw-light">
                     <p><ProductsLetters number={15} word={product.details.name}/></p>
                     <p>{product.details.finalPrice} * {product.quantity} = {product.details.finalPrice* product.quantity}</p>
                     </div> ):"Loading..."}
                     <hr />

                     <div className="subTotal d-flex justify-content-between w-100 fw-bold fs-4">
                         <p className='  mb-1'>
                             Total
                         </p>
                         <p className='  mb-1'>
                             {total? "$"+total: "Loading..."}
                         </p>
                     </div>
                         <div key={`agreeToConditions`} className="mb-5">
                     {errors.agreed ? <div className=' text-danger'>{errors.agreed.message}</div> : null}
                            
                             <Form.Check  
                             {...register("agreed", { required: "You must agree to conditions" })}
                                 type="checkbox"
                                 id={`agreeToConditions`}
                                 label={`I agree with the Terms & Conditions`}
                                 />
                         </div>

                 <Button variant='dark rounded-0 px-4 py-3 w-100 ' type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Place Order"}</Button>

                </div>
            </Col>

            </Form>
    
</Row>
</div>
             
            </Container>
        </section>
    );
}