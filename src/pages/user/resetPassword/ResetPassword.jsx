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
import ErrorsPage from '../errorsPage/ErrorsPage';
export default function ResetPassword() {
    
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {register, handleSubmit,formState:{errors}} = useForm();


  const lostPassword = async (data) => {
    setIsLoading(true);
    try{
      const res = await axios.patch(`${import.meta.env.VITE_BURL}/Identity/Account/forget-password`,{

          "email":data.email,
      });
           
      if(res.status == 200){
        navigate("/identity/account/reset-password");
    }
  }catch(error){
    setServerError(error);
  }finally{
    setIsLoading(false);
  }
  }



  if(serverError) return <ErrorsPage errorMessage={serverError.message} />;
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
