import React from 'react'
import useFetch from '../../../../customHooks/useFetch';
import {  useParams } from 'react-router-dom'
import Product from '../../Products/product/Product';
import { Container, Row } from 'react-bootstrap';
import ErrorsPage from '../../../../pages/user/errorsPage/ErrorsPage';
import SortProduct from '../../SortProduct/SortProduct';
import style from "./categoryProducts.module.css"
// import Loader from '../../Loader/Loader';
import Spinner from 'react-bootstrap/Spinner';


export default function CategoryProducts() {
    const {categoryId} = useParams();
    const {error,data,isLoading} = useFetch(`${import.meta.env.VITE_BURL}/products/category/${categoryId}`);
    


    
    if(isLoading) {
        return (<section className="loader d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </section>)
    }
    
    if(error) {
        return <ErrorsPage errorMessage={error.message} />
    }

    


    return (
    <section className='categoryProducts'>
        <Container>
            <Row className={`${data.data.products.length === 0 ? style.EmptyPage : "my-5"}`}>
                {data.data.products.length === 0 ? 
                <h1 className='alert alert-info'>There is No products of this category</h1>
                :
                <>
                <SortProduct />
                {data.data ? data.data.products.map(product =>  <Product product={product} key={product._id}/>) : <div className='alert text-danger'>There is no products yet</div>
                </>
                }
            </Row>
        </Container>
    </section>
  )
}
