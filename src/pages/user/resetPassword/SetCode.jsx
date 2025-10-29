import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {   useNavigate } from 'react-router-dom';
import style from "../registerPage/auth.module.css";
import Swal from 'sweetalert2';

export default function SetCode() {
       
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {register, handleSubmit,formState:{errors}} = useForm();


  
  const reset = async (data) => {
    console.log(data.email);
    console.log(data.code);
    console.log(data.password);
    
    setIsLoading(true);
    try{
        const response = await axios.patch(`${import.meta.env.VITE_BURL}/identity/account/forgotPassword`,{
            email:data.email,
            password:data.password,
            code:data.code,
     });

      console.log(response);
      
      if(response.status === 200){
        localStorage.setItem("userToken",response.data.token);
        Swal.fire({
            title: "Your Passwaord has been reset!",
            icon: "success"
          });
        // navigate("/");
    }
  }catch(error){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    console.log(error);

  }finally{
    setIsLoading(false);
  }
  }
  return (
    <section className={`resetPassword ${style.containerSize}`}>
    <Container className=" d-flex align-items-center justify-content-center my-5 h-100">
          <div className={`${style.box} d-flex align-items-center justify-content-center my-5 `}>
      
          <div className="p-5 d-flex  flex-column h-100 w-100">

      <h2 className='mb-3'>Reset password</h2>

      <Form onSubmit={handleSubmit(reset)}  className='w-100'>
        {serverError ?? <div className='text-danger'>{serverError}</div>}
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="my-3"
          >
          <Form.Control type="email" placeholder="" {...register("email",{required:"email is required"})}/>
        {errors.email?<div className=' text-danger'>{errors.email.message}</div>:null}
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingCode"
          label="Code"
          className="my-3"
          >
          <Form.Control type="text" placeholder="" {...register("code",{required:"code is required"})}/>
        {errors.code?<div className=' text-danger'>{errors.code.message}</div>:null}
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Password"
          className="my-3"
          >
          <Form.Control type="password" placeholder="" {...register("password",{required:"password is required"})}/>
        {errors.password?<div className=' text-danger'>{errors.password.message}</div>:null}
        </FloatingLabel>

       

       
        <Button  className={`${style.btnColor}`} type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Reset Password"}</Button>
         

      </Form>
            </div>
            </div>
          </Container>
    </section>
  )
}
