import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

export default function ErrorsPage({errorMessage}) {

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage
    })

  // navigate("/cart");
  return (
    <>
   
      
    </>
  )
}
