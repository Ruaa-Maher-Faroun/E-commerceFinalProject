import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/user/loginPage/LoginPage'
import RegisterPage from './pages/user/registerPage/RegisterPage'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/user/home/Home'
import DashboardLayout from './layouts/dashboardLayout'
import UserLayout from './layouts/userLayout'
import Categories from './pages/user/categories/Categories'
import Products from './pages/user/products/Products'
import CategoryProducts from './components/user/Products/categoryProducts/CategoryProducts'
import ProductDetails from './components/user/Products/productDetails/ProductDetails'
import ResetPassword from './pages/user/resetPassword/ResetPassword'
import Cart from './pages/user/cart/cart'
import ProtectedRoute from './components/user/ProtectedRoute/ProtectedRoute'
import CartContextProvider from './context/CartContext'

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
        element: <Products numberOfProducts={10000} isPage={true}/>,
      },
      {
        path:"/product/:productId",
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <ProtectedRoute>
                    <Cart />
                </ProtectedRoute>
      }
    ]
    }
  
  ]
  ) 
  return (
   
    <>
     <CartContextProvider>

       <RouterProvider router={router} />
     </CartContextProvider>
     </>
  )
}
