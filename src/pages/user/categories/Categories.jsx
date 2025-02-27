// import Loader from '../../../components/user/Loader/Loader';
import React from 'react'
import {  Container, Row } from 'react-bootstrap';
import useFetch from '../../../customHooks/useFetch';
import Category from '../../../components/user/Categories/category/Category';
import ErrorsPage from '../errorsPage/ErrorsPage';
import Spinner from 'react-bootstrap/Spinner';

import {Autoplay,  Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Categories() {
  const place = window.location.pathname;
  console.log(place);
  
  const {error,data,isLoading} = useFetch(`${import.meta.env.VITE_BURL}/categories/active?limit=10`);

  if(isLoading){
    return  (<section className="loader d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </section>)
  }

  if(error){
    return <ErrorsPage errorMessage={error.message} />;
  }

  return (
    <>
    <Container className='content '>
      {place == '/categories' ?  <h1 className='my-5 text-center w-100'>Categories</h1>:""}
      <Row className='my-5 justify-content-center w-100 align-items-center'>
    <Swiper
      modules={[Navigation, Pagination,Autoplay]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={3.5}
      loop
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
    >

            {data.data.categories.map(category => <SwiperSlide className='mb-5'>
                          <Category id={category._id} img={category.image.secure_url} key={category._id}/>

                </SwiperSlide> 
                          )}  
    </Swiper>
      </Row>
    </Container>
    </>
  )
}

      