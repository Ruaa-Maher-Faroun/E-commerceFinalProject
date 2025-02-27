import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { UserContext } from '../../../context/user/UserContext';


export default function Image() {
    const [load, setLoad] = useState(false);
    const { user } = useContext(UserContext);
    const [img, setImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const hanldeImage = async (data) => {
        setLoad(true);
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.file[0]);
        try {


            const resp = await axios.put(`https://ecommerce-node4.onrender.com/user/update-image`, formData,
                {
                    headers: {
                        Authorization: `Tariq__${localStorage.getItem('userToken')}`
                    }
                }
            )

            console.log(resp);
            if (resp.status == 200) {
                Swal.fire({
                    title: "Good job!",
                    text: "Picutre Updated!",
                    icon: "success"
                });
                // const file = e.target.files[0];
                // setImage(URL.createObjectURL(file))
            }

        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });

        }finally{
        setLoad(false);

        }
    };



    if(load){
        return (<section className="loader d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </section>)
    }
    const handleImgChange = (e) => {
        console.log("in");
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    }


    // useEffect(()=>{
    //     if(user){

    //         setImage(user.image.secure_url);
    //     }
    // },[])
    return (
        <Form onSubmit={handleSubmit(hanldeImage)} encType='multipart/form-data'>
            {img ?
                <img src={img} alt="" style={{ width: "200px" }} />
                : ""

            }
            <Form.Group className="mb-3" controlId="updateImg">
                <Form.Label>Update image</Form.Label>
                <Form.Control type="file" {...register("file", { required: "file is required" })}  onChange={handleImgChange} />
                {errors.file ? <div className=' text-danger'>{errors.file.message}</div> : null}
            </Form.Group>
            <Button variant="dark px-5 py-3" type="submit">Update</Button>

        </Form>
    )
}
