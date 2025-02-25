import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import {   useNavigate } from 'react-router-dom';
import style from "../registerPage/auth.module.css";
export default function ResetPassword() {
    
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {register, handleSubmit,formState:{errors}} = useForm();


  const lostPassword = async (data) => {
    setIsLoading(true);
    try{
      const response = await axios.patch(`https://ecommerce-node4.onrender.com/auth/forgotPassword`,{
          "email":"academyk74@gmail.com",
          "password":"111",
          "code":"D7AZ"
   });
      console.log(response);
      
      if(response.status === 200){
        localStorage.setItem("userToken",response.data.token)
        navigate("/");
    }
  }catch(error){
    console.log(error);
    
  
  //   if(error.response.status === 409){
  //   setServerError("Email is already registered");
  // }else{
  //   setServerError("Server Error");
  // }

  }finally{
    setIsLoading(false);
  }
  }
  return (
    <section className={`resetPassword ${style.containerSize}`}>
    <Container className=" d-flex align-items-center justify-content-center my-5 h-100">
          <div className={`${style.box} d-flex align-items-center justify-content-center my-5 `}>
      
          <div className="p-5 d-flex  flex-column h-100 w-100">

      <h2 className='mb-3'>Lost password</h2>
     <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>

      <Form onSubmit={handleSubmit(lostPassword)}  className='w-100'>
        {serverError ?? <div className='text-danger'>{serverError}</div>}
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="my-3"
          >
          <Form.Control type="email" placeholder="" {...register("email",{required:"email is required"})}/>
        {errors.email?<div className=' text-danger'>{errors.email.message}</div>:null}
        </FloatingLabel>

       

       
        <Button  className={`${style.btnColor}`} type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Reset Password"}</Button>
         

      </Form>
            </div>
            </div>
          </Container>
    </section>
  )
}
