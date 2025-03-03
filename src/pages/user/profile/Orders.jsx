import Table from 'react-bootstrap/Table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
// import Loader from '../../../components/user/Loader/Loader';
import ErrorsPage from '../errorsPage/ErrorsPage';
import Swal from 'sweetalert2';
import Order from './Order';
import Spinner from 'react-bootstrap/Spinner';
import ProductsLetters from '../../../components/user/ProductsLetters/ProductsLetters';


export default function Orders() {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [showOrder, setShowOrder] = useState(null);

  const showProducts = (id) => {
    const order = orders.filter((order) => order._id === id);
    setShowOrder(order[0]);
    
  }
  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BURL}/order`, {
        headers: {
          Authorization: `Tariq__${localStorage.getItem('userToken')}`
        }
      })
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
      setErrors(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (<section className="loader d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </section>)
  }
  if (errors) {
    return <ErrorsPage errorMessage={errors.message} />
  }

  
  return (
    <section>
      <Container>
        <h1>Orders</h1>
        <Table  bordered responsive>
          <thead>
            <tr>
              <th className='d-none d-lg-table-cell'>#</th>
              <th>Order</th>
              <th  className='d-none d-md-table-cell'>Number of products</th>
              <th>Total</th>
              <th className='d-none d-lg-table-cell'>Date</th>
              <th className='d-none d-md-table-cell'>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => <tr key={order._id}>
              <td className='d-none d-lg-block'>{i+1}</td>
              <td><Button onClick={()=>{showProducts(order._id)}}>
                <ProductsLetters number={5} word={order._id} /></Button></td>
              <td className='text-center d-none  d-md-table-cell'>{order.products.length}</td>
              <td className='fw-bold'>${order.finalPrice}</td>
              <td className='d-none d-lg-table-cell'>{new Date(order.createdAt).toDateString()}</td>
              <td className='text-center  d-none  d-md-table-cell'>{order.status}</td>
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
