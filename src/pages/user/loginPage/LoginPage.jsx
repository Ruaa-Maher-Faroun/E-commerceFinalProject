import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {  Link, useNavigate } from 'react-router-dom';
import style from "../registerPage/auth.module.css";
import balloonHeart from "../../../assets/balloon-heart-colored.svg";
import Swal from 'sweetalert2';
export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {register, handleSubmit,formState:{errors}} = useForm();
  const loginUser = async (data) => {
    setIsLoading(true);
    try{
      const response = await axios.post("https://ecommerce-node4.onrender.com/auth/signin",data);
      console.log(response);
      
      if(response.status === 200){
        localStorage.setItem("userToken",response.data.token);
        navigate("/");
        console.log(response.data);
        
        Swal.fire({
          title: `Welcome Back ${response.data.user.name}!`,
          text: "Happy Shopping...",
          imageUrl: `${balloonHeart}`,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image"
        });
     
    }
 
    setServerError(null)
  }catch(error){
    Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message
        })
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
    <section className={`loginPage ${style.containerSize}`}>
    <Container className=" d-flex align-items-center justify-content-center my-5 h-100">
          <div className={`${style.box} d-flex align-items-center justify-content-center my-5 `}>
      
          <div className="p-5 d-flex  flex-column h-100 w-100">

      <h2>Login into your account</h2>
     

      <Form onSubmit={handleSubmit(loginUser)}  className='w-100'>
        {serverError ?? <div className='text-danger'>{serverError}</div>}
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="my-3"
          >
          <Form.Control type="email" placeholder="" {...register("email",{required:"email is required"})}/>
        {errors.email?<div className=' text-danger'>{errors.email.message}</div>:null}
        </FloatingLabel>

       

        <FloatingLabel controlId="floatingPassword" label="Password" className="my-3">
          <Form.Control type="password" placeholder="" {...register("password",{required:"password is required"})} />
        {errors.password?<div className=' text-danger'>{errors.password.message}</div>:null}
        </FloatingLabel>
        
        <div key={`rememberUser`} className="mb-3">
          <Form.Check // prettier-ignore
            type="checkbox"
            id={`rememberUser`}
            label={`Remember me`}
          />

         
        </div>
    

        <Button className={`mb-2 ${style.btnColor}`} type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</Button>
     
      </Form>
      <Link to={"/auth/reset-password"}>Lost Your Password?</Link>
            </div>
            </div>
          </Container>
    </section>
  )
}

