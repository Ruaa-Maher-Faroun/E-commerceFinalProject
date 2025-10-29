import React from 'react'
import { Container, Row } from 'react-bootstrap'
import useFetch from '../../../customHooks/useFetch'
import Category from '../../../components/user/Categories/category/Category'
import ErrorsPage from '../errorsPage/ErrorsPage'
import Spinner from 'react-bootstrap/Spinner'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export default function Categories() {
  const place = window.location.pathname
  const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/Customer/categories`)

  if (isLoading) {
    return (
      <section className="loader d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </section>
    )
  }

  if (error) {
    return <ErrorsPage errorMessage={error.message} />
  }

  const categories = data?.data?.categories || data?.categories || []

  return (
    <Container className={place === '/categories' ? 'content' : ''}>
      {place === '/categories' && <h1 className="my-5 text-center w-100">Categories</h1>}

      <Row className="my-5 justify-content-center w-100 align-items-center">
        {categories.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={3.5}
            loop
            autoplay={{ delay: 1500, disableOnInteraction: false }}
          >
            {categories.map(category => (
              <SwiperSlide key={category._id} className="mb-5">
                <Category id={category._id} img={category.image?.secure_url} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="alert text-danger">No categories available</div>
        )}
      </Row>
    </Container>
  )
}
