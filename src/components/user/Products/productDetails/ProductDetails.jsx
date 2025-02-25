import { Link, Outlet, useParams } from 'react-router-dom'
import useFetch from '../../../../customHooks/useFetch';
import Loader from '../../Loader/Loader';
import Swal from 'sweetalert2';
import Details from './Details';
import { Container } from 'react-bootstrap';
import style from "./Details.module.css"
import { useState } from 'react';

export default function ProductDetails() {
    const [activePage, setActivePage] = useState("desc");    
    const {productId} = useParams();
    const {error,data,isLoading} =  useFetch(`${import.meta.env.VITE_BURL}/products/${productId}`)
    if (isLoading) {
        return <Loader />;
    }

    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });

    }
    const product = {...data.data.product};
   
    return (
   <section>
    <Details product={product} />
    <Container className='content w-100'>
        <div className={`${style.border} py-0 d-flex`}>
            <Link onClick={()=>setActivePage("desc")} className={`${style.linksStyle} d-block ${activePage ==="desc" ? style.active:""} px-4 py-3`} to={"description"}>Description</Link>
            <Link onClick={()=>setActivePage("reviews")} className={`${style.linksStyle} ${activePage ==="reviews" ? style.active: ""} d-block  px-4 py-3` } to={"reviews"}>Reviews <span>{product.reviews.length}</span></Link>

        </div>
    <Outlet />
    </Container>

   </section>
  )
}
