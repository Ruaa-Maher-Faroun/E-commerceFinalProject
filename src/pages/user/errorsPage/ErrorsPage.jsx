import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

export default function ErrorsPage() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage
    }).then((result) => {
      navigate("/");
     
      });
  return (
    <>
      
    </>
  )
}
