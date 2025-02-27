import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Table } from 'react-bootstrap'
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters'
import { Link } from 'react-router-dom'
import './tableStyle.css'
export default function Order({showOrder}) {
  return (
    <div className='rounded my-5 bg-light px-5 py-4'>
    <h2 className='fw-bold fs-2 mb-3'>Order Details</h2>
    <div className=' px-5 py-4 rounded'>
      <p><span className='fw-bold fs-5'>Address: </span>{showOrder.address}</p>
      <p><span className='fw-bold fs-5'>Coupon: </span>{showOrder.couponName != "" ? "Used" :"None"}</p>
      <p><span className='fw-bold fs-5'>Purchased At: </span>{new Date(showOrder.createdAt).toDateString()}</p>
      <p><span className='fw-bold fs-5'>Total Price: </span>${showOrder.finalPrice}</p>
      <p><span className='fw-bold fs-5'>Payment Method: </span>{showOrder.paymentType}</p>
      <p><span className='fw-bold fs-5'>Phone Number: </span>{showOrder.phoneNumber}</p>
      <p><span className='fw-bold fs-5'>Status: </span>{showOrder.status == "pending"? <>pending <FontAwesomeIcon icon={faHourglassHalf} /></> : showOrder.status }</p>
    </div>
    <Table bordered className='w-100' responsive>
      <thead>
        <tr>
          <th className='p-sm-0 d-xs-none d-sm-none d-md-none'>#</th>
          <th className='p-sm-0'>Product</th>
          <th className='p-sm-0'>Price</th>
          <th className='p-sm-0'>Quantity</th>
          <th className='p-sm-0'>Final Price</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {showOrder.products.map( (product,ind) => <tr key={product._id} >
              <td className='d-xs-none d-sm-none d-md-none'>{ind+1}</td>
              <td className='text-start w-50'><img className='w-25 me-3 d-none d-sm-none d-md-none d-lg-inline  d-xl-inline' src={product.productId.mainImage.secure_url}/><Link to={`/product/${product.productId._id}`}><ProductsLetters number={25} word={product.productId.name}/></Link></td>
              <td>${product.unitPrice}</td>
              <td>{product.quantity}</td>
              <td>${product.finalPrice}</td>
            </tr>
        )}
      </tbody>
    </Table>
  </div>
  )
}
