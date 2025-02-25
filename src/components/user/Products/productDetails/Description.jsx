import React from 'react'
import useFetch from '../../../../customHooks/useFetch';
import { useParams } from 'react-router-dom';
// import Loader from '../../Loader/Loader';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';

export default function Description() {
    const { productId } = useParams();
    const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/${productId}`)
    if (isLoading) {
        return (<section className="loader d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </section>)
    }

    if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
    const product = { ...data.data.product };
  return (
    <p className='my-5'>
      {product.description}
    </p>
  )
}
