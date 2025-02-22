import React from 'react'
import useFetch from '../../../../customHooks/useFetch';
import Loader from '../../Loader/Loader';
import ErrorsPage from '../../../../pages/user/errorsPage/ErrorsPage';
import { Button, Card, Row } from 'react-bootstrap';
import Product from '../product/Product';

export default function FeaturedProducts() {
    const {error,data,isLoading} =  useFetch(`${import.meta.env.VITE_BURL}/products?limit=3`)
    if (isLoading) {
        return <Loader />;
    }

    if(error){
        <ErrorsPage errorMessage={error.message} />
    }

  
  
    return ( 
    
        <Row className='my-5 justify-content-start'>
            {data.data.products.map(product => <Product product={product} key={product._id} />)}  
        </Row>
    )
}
