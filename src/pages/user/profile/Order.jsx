import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Table } from 'react-bootstrap'
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters'
import { Link } from 'react-router-dom'

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
    <Table bordered className='w-100' >
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Final Price</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {showOrder.products.map( (product,ind) => <tr key={product._id} >
              <td>{ind+1}</td>
              <td className='text-start w-50'><img className='w-25 me-3' src={product.productId.mainImage.secure_url}/><Link to={`/product/${product.productId._id}`}><ProductsLetters number={25} word={product.productId.name}/></Link></td>
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
