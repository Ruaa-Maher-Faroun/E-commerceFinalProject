import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { DevTool } from "@hookform/devtools";
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {register,control, handleSubmit,formState:{errors}} = useForm();
  const registerUser = async (data) => {
    setIsLoading(true);
    try{
      const response = await axios.post("URL",data);
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
    <>
    <Container>
      <h2 className='text-center my-5'>Create New Account
      </h2>
      <p className='text-center my-5'>

      Already have an account? <Link to='/login'>
      Log in 
      </Link>
      instead! Page
      </p>
      <Row className='justify-content-center'>

      <Form onSubmit={handleSubmit(registerUser)} className='col-6'>
        {serverError ?? <div className='text-danger'>{serverError}</div>}
        <FloatingLabel
          controlId="floatingEmail"
          label="Email address"
          className="my-3"
          >
          <Form.Control type="email" placeholder="" {...register("email",{required:"email is required"})}/>
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
        <Button variant="primary" type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</Button>
          <DevTool control={control} /> 

      </Form>
            </Row>
          </Container>
    </>
  )
}
