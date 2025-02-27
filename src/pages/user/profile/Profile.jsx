import React from 'react'
import SideBar from '../../../components/user/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './sideBar.css'
export default function Profile() {
    if(!localStorage.getItem('userToken')){
      console.log("no");
      
      return <>No</>
    }
  return (
    <section className='content  mb-0'>
        <Container fluid className="p-0 ">
            <Row className='w-100 justify-content-between resp'>
                <Col xs={1} sm={1} md={3} lg={2}>
                    <SideBar />
                </Col>
                <Col xs={10} sm={10} md={8}  lg={8} className=' ms-sm-2 m-md-3 mt-2 '> 
                 <Container className='px-0 m-md-3 changePadding py-3'>
                    <Outlet />
                 </Container>
                </Col>
            </Row>
        </Container>
    </section>
  )
}
