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
import ProtectedRoute from './components/user/ProtectedRoute/ProtectedRoute'
import CartContextProvider from './context/user/CartContext'
import Profile from './pages/user/profile/Profile'
import Info from './pages/user/profile/Info'
import Orders from './pages/user/profile/Orders'
import UserContextProvider from './context/user/UserContext'
import Cart from './pages/user/cart/Cart'
import Reviews from './components/user/Products/productDetails/Reviews'
import Description from './components/user/Products/productDetails/Description'
import OrderRequest from './components/user/Orders/OrderRequest'
import SetCode from './pages/user/resetPassword/SetCode'
import Image from './components/user/Image/Image'
import ProtectedAuthRoute from './components/user/ProtectedRoute/ProtectedAuthRoute'

export default function App() {

  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <ProtectedAuthRoute>
        <AuthLayout />
      </ProtectedAuthRoute>,
      children: [
        {
          path: 'register',
          element: <RegisterPage />
        },
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'reset-password',
          element: <ResetPassword />
        },
        {
          path: 'setCode',
          element: <SetCode />
        },
      ]
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />
    },
    {
      path: '/',
      element: <UserContextProvider>
                    <CartContextProvider>
                    <UserLayout />
                    </CartContextProvider>
                </UserContextProvider>
      ,
      children: [{
        path: '/',
        element: <Home />
      },
      {
        path: "/categories",
        element: <Categories />
      },
      {
        path: '/categories/:categoryId',
        element: <CategoryProducts />
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
        children: [{
          path: '',
          element: <Description />
        },
        {
          path: 'reviews',
          element: <Reviews />

        },],
      },
      {
        path: 'cart',
        element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>,
      },
      {
        path: 'order',
        element: <ProtectedRoute>
          <OrderRequest />
        </ProtectedRoute>,
      },
      {
        path: 'profile',
        element: <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>,
        children: [
          {
            path: 'info',
            element: <ProtectedRoute>
                      <Info />
                    </ProtectedRoute>
          },
          {
            path: 'orders',
            element: <ProtectedRoute>
              <Orders />,
              </ProtectedRoute>

          },
          {
            path: 'image',
            element: <ProtectedRoute>
              <Image />
              </ProtectedRoute>

          },
        ]
      }
      ]
    }

  ]
  )
  return (

    <>      
        <>      
        <RouterProvider router={router} />
        </>
     </>
  )
}
