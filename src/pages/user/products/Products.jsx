// import Loader from '../../../components/user/Loader/Loader';
import React from 'react'
import ShowProducts from '../../../components/user/Products/showProducts/ShowProducts'
import { Container } from 'react-bootstrap';
import style from "./productsPage.module.css";
import ErrorsPage from '../errorsPage/ErrorsPage';
import useFetch from '../../../customHooks/useFetch';
import Spinner from 'react-bootstrap/Spinner';

export default function Products() {
  
  const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products?limit=10`);

  if (isLoading) {
    return    (<section className="loader d-flex align-items-center justify-content-center">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </section>)
  }

  if (error) {
    return <ErrorsPage errorMessage={error.message} />
  }
  return (
    <section className="content">
      <Container className="text-center h-100">
        <div className={`text-center w-100 ${style.productsPageHeight} title-part d-flex flex-column align-items-center justify-content-center`}>

          <h1>Shop</h1>
          <p className='w-50'>State the biggest use case of your product. Briefly expand on how this will help your customers.</p>
        </div>
          <ShowProducts data={data}/>
      </Container>
    </section>
  )
}


