import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DevTool } from "@hookform/devtools";
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {register,control, handleSubmit,formState:{errors}} = useForm();
  const loginUser = async (data) => {
    setIsLoading(true);
    try{
      const response = await axios.post("https://ecommerce-node4.onrender.com/auth/signin",data);
      console.log(response);
      
      if(response.status === 200){
        localStorage.setItem("userToken",response.data.token)
        navigate("/");
        toast.success('Logged in', {
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
    <>
    <Container>
      <h2 className='text-center my-5'>Login into your account</h2>
     
      <Row className='justify-content-center'>

      <Form onSubmit={handleSubmit(loginUser)} className='col-6'>
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
        <Button variant="primary" type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Login"}</Button>
          <DevTool control={control} /> 

      </Form>
            </Row>
          </Container>
    </>
  )
}

