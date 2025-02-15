import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import style from "./auth.module.css";
export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {register,control, handleSubmit,formState:{errors}} = useForm();
  const registerUser = async (data) => {
    setIsLoading(true);
    try{
      const response = await axios.post("https://ecommerce-node4.onrender.com/auth/signup",data);
      console.log(response);
      
      if(response.status === 201){
        navigate("/login");
        toast.info('Please check your email to confirm your registration', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    console.log("Done");
    setServerError(null)
  }catch(error){
    toast.error('Error', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
    if(error.response.status === 409){
    setServerError("Email is already registered");
  }else{
    setServerError("Server Error");
    console.log("errro");
    
  }

  }finally{
    setIsLoading(false);
  }
  }
  return (
    <section className={`registerPage ${style.containerSize}`}>
    <Container className=" d-flex align-items-center justify-content-center my-5 h-100">
      <div className={`${style.box} d-flex align-items-center justify-content-center my-5 `}>

      <div className="p-5 d-flex  flex-column h-100 w-100">

      <h2>Create New Account
      </h2>
      <p>

      Already have an account? <Link className={`${style.linksStyle}`} to='/auth/login'>
      Log in
      </Link>
      &nbsp;instead! Page
      </p>
      
      <Form onSubmit={handleSubmit(registerUser)} className='w-100'>
        {serverError ?? <div className='text-danger'>{serverError}</div>}
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="my-3 w-100"
          >
          <Form.Control type="email" placeholder=""  {...register("email",{required:"email is required"})}/>
        {errors.email?<div className=' text-danger'>{errors.email.message}</div>:null}
        </FloatingLabel>

        <FloatingLabel controlId="floatingUserName" label="User Name" className="my-3">
          <Form.Control type="text" placeholder="" {...register("userName",{required:"username is required"})}/>
        {errors.userName?<div className=' text-danger'>{errors.userName.message}</div>:null}
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className="my-3">
          <Form.Control type="password" placeholder="" {...register("password",{required:"password is required"})} />
        {errors.password?<div className=' text-danger'>{errors.password.message}</div>:null}
        </FloatingLabel>
        <Button className={`${style.btnColor}`} type="submit"  disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</Button>
          
      </Form>
          
      </div>
      </div>
      </Container>
    </section>
  )
}
