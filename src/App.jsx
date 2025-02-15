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
import CategoryProducts from './components/user/Products/categoryProducts/CategoryProducts'
import ShowCategories from './components/user/Categories/showCategories/ShowCategories'
import ProductDetails from './components/user/Products/productDetails/ProductDetails'
import ResetPassword from './pages/user/resetPassword/ResetPassword'

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
        {
        path:'reset-password',
        element: <ResetPassword />
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
        path:'/categories/:categoryId',
        element: <CategoryProducts />
      },
      {
        path:"/products",
        element: <Products />,
      },
      {
        path:"/product/:productId",
        element: <ProductDetails />
      }
    ]
    }
  
  ]
  ) 
  return (
   
    <>
     {/* <ToastContainer /> */}
       <RouterProvider router={router} />
     </>
  )
}
