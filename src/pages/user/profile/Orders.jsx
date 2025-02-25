import Table from 'react-bootstrap/Table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import Loader from '../../../components/user/Loader/Loader';
import ErrorsPage from '../errorsPage/ErrorsPage';
import Swal from 'sweetalert2';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Order from './Order';

export default function Orders() {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [showOrder, setShowOrder] = useState(null);

  const showProducts = (id) => {
    const order = orders.filter((order) => order._id === id);
    setShowOrder(order[0]);
    // console.log(products[0].finalPrice);
    console.log(order[0]);
    
  }
  const getOrders = async () => {
    setLoading(true);
    try {

      console.log("hi");
      const response = await axios.get(`${import.meta.env.VITE_BURL}/order`, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem('userToken')}`
        }
      })
      // console.log(response.data.orders);
      setOrders(response.data.orders);
      setErrors(null);
    } catch (err) {
      setErrors(err)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BURL}/order/cancel/${orderId}`, {}, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem('userToken')}`
        }
      });
      getOrders();
      Swal.fire({
        title: "Order Cancelled!",
        text: "Order Cancelled Successfully!",
        icon: "success"
      });
    } catch (err) {
      console.log(err);
      setErrors(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />
  }
  if (errors) {
    return <ErrorsPage errorMessage={errors.message} />
  }

  // console.log(orders[0].products);
  
  return (
    <section>
      <Container>
        <h1>Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Order</th>
              <th>Number of products</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => <tr key={order._id}>
              <td>{i+1}</td>
              <td><Button onClick={()=>{showProducts(order._id)}}>{order._id}</Button></td>
              <td className='text-center'>{order.products.length}</td>
              <td className='fw-bold'>${order.finalPrice}</td>
              <td>{new Date(order.createdAt).toDateString()}</td>
              <td className='text-center'>{order.status}</td>
              <td className='text-center'>
                {order.status === "cancelled" ? " - " :
                  <Button variant='danger' onClick={() => cancelOrder(order._id)}>Cancel</Button>
                }
              </td>
            </tr>
            )}

          </tbody>
        </Table>

        {showOrder ?
          <Order showOrder={showOrder} />
          :
          ""}

      </Container>
    </section>
  )
}
