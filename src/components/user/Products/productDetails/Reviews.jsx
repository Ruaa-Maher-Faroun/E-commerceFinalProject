import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import useFetch from '../../../../customHooks/useFetch';
// import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';

export default function Reviews() {
    const { productId } = useParams();
    const { error, data, isLoading } = useFetch(`${import.meta.env.VITE_BURL}/products/${productId}`)
    if (isLoading) {
        return         (<section className="loader d-flex align-items-center justify-content-center">
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
    console.log(product.reviews);

    return (
        <>
            {product.reviews.map((rev,ind) => <div key={rev._id} className='bg-light p-5 my-5 rounded'>
                <h6 className='fw-bold fs-5 mb-2'>{rev.createdBy.userName}</h6>
                <p className='text-secondary mb-2' style={{fontSize:"12px"}}>Purchased At: {new Date(rev.createdAt).toDateString()}</p>
                <p className='text-secondary mb-2' style={{fontSize:"12px"}}>Opinion added: {new Date(rev.createdAt).toDateString()}</p>
                <div className='mb-2'>
                    {Array.from({ length: rev.rating }, (_, index) => (
                    <FontAwesomeIcon key={index} className='text-secondary ' style={{fontSize:"12px"}} icon={faStar} />
                ))}
                {Math.ceil(rev.rating) != rev.rating ?
                <FontAwesomeIcon className='text-secondary'  style={{fontSize:"12px"}} icon={ faStarHalf} />
                 : ""}
                </div>
                <p >{rev.comment}</p>
            </div>
            )}
        </>
    )
}
