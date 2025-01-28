import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/user/loginPage/LoginPage'
import RegisterPage from './pages/user/registerPage/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import { ToastContainer } from 'react-toastify';
import Home from './pages/user/home/Home'
import DashboardLayout from './layouts/dashboardLayout'
import UserLayout from './layouts/userLayout'
import Categories from './pages/user/categories/Categories'
import Products from './pages/user/products/Products'

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/auth',
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
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />
    },
    {
      path: '/',
      element: <UserLayout />,
      children:[{
        path:'/',
        element: <Home />
      },
      {
        path:"/categories",
        element: <Categories />
      },
      {
        path:"/products",
        element: <Products />
      }
    ]
    }
  
  ]
  ) 
  return (
   
    <>
     <ToastContainer />
       <RouterProvider router={router} />
     </>
  )
}
