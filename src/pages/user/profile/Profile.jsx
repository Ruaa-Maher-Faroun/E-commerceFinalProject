import React, { useContext } from 'react'
import SideBar from '../../../components/user/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { UserContext } from '../../../context/user/UserContext';

export default function Profile() {
    const {l} = useContext(UserContext);
    // console.log(user);
    
  return (
    <section className='content mb-0'>
        <Container fluid className="p-0">
            <Row className='w-100 justify-content-between'>
                <Col md={2} >
                    <SideBar />
                </Col>
                <Col md={8} className='m-auto mt-2'> 
                 <Container className='px-5 py-3'>

                    <Outlet />
                 </Container>
                </Col>
            </Row>
        </Container>
    </section>
  )
}
