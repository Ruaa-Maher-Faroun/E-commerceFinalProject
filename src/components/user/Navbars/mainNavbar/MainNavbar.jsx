import React, { useContext } from 'react'
import { Button, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import logo from "../../../../assets/BOTIGA.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import style from "../mainStyle.module.css";
import { CartContext } from '../../../../context/CartContext';
export default function MainNavbar() {
    const {cartCount} = useContext(CartContext);

    return (
        <>
            <Navbar expand="lg" className={`${style.nav} mw-100 p-4 sticky-top`}>
                <Container className='p-0'>
                    <Row className='w-100 align-items-center'>
                        <Col className='d-flex justify-content-start'>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-0'>
                                <Nav className="">
                                    <Nav.Link as={Link} className={`${style.link}`} to={"/"}>Home</Nav.Link>
                                    <Nav.Link as={Link} className={`${style.link}`} to={"/categories"}>Categories</Nav.Link>
                                    <Nav.Link as={Link} className={`${style.link}`} to={"/products"}>Shop</Nav.Link>
                                    <Nav.Link as={Link} className={`${style.link}`} to={"/products"}>Contact</Nav.Link>

                                </Nav>
                            </Navbar.Collapse>
                        </Col>
                        <Col className='d-flex justify-content-center'>
                            <Navbar.Brand as={Link} to={"/"}>
                                <img src={logo} alt="logo" className={`${style.imgWidth}`} />
                            </Navbar.Brand>
                        </Col>
                        <Col className='d-flex justify-content-end'>   
                            <Nav className="">
                                <Button variant="link"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                                
                                <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                               
                               <NavDropdown.Item href="#action/2.1"><Nav.Link as={Link} to={"/auth/login"}>Login</Nav.Link></NavDropdown.Item>
                               <NavDropdown.Item href="#action/2.2"><Nav.Link as={Link} to={"/auth/register"}>Register</Nav.Link></NavDropdown.Item>
                           
                       </NavDropdown>
                                
                                
                            
                                <Nav.Link as={Link} to={"/cart"}><FontAwesomeIcon icon={faCartShopping} /> {cartCount}</Nav.Link>
                       
                            </Nav>
                        </Col>
                    </Row>

                </Container>
            </Navbar>
        </>
    );
}

