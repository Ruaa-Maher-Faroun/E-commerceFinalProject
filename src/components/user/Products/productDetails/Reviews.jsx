import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import useFetch from '../../../../customHooks/useFetch';
// import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

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
    const addReview = async () =>{
        const { value: formValues } = await Swal.fire({
            title: "Multiple inputs",
            html: `
              <input id="swal-input1" class="swal2-input" placeholder="write your review">
              <input id="swal-input2" class="swal2-input" placeholder="rating">
            `,
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value
              ];
            }
          });
          if (formValues) {
            console.log(formValues);
            revRe(formValues);
          }
    }

    const revRe = async (review) =>{
        try{

            const response = await axios.post(`${import.meta.env.VITE_BURL}/products/${product._id}/review`, {  
                comment: review[0],
                  rating:parseFloat(review[1]) 
                },{
                    headers: {
                        Authorization: `Tariq__${localStorage.getItem('userToken')}`
                    },
                   }
                );
            console.log(response);
        }catch(error){
            console.log(error);
            
        }
        
    }
    return (
        <>
        {!localStorage.getItem('userToken')?
        "":
        <Form>
                <Button variant='primary mt-5' onClick={addReview}>
                     Add Review
                </Button>
        </Form>
        }
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
