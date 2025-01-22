import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/user/loginPage/LoginPage'
import RegisterPage from './pages/user/registerPage/RegisterPage'
import AuthLayout from './layouts/authLayout'
import { ToastContainer } from 'react-toastify';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
        path:'register',
        element: <RegisterPage />
      },
        {
        path:'login',
        element: <LoginPage />
      },
      ]
    }]
  ) 
  return (
    <>
    <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}
