import React, { useContext } from 'react'
import { Button, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../../assets/BOTIGA.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import style from "../mainStyle.module.css";
import { CartContext } from '../../../../context/user/CartContext';
import { UserContext } from '../../../../context/user/UserContext';
export default function MainNavbar() {
    const navigate = useNavigate();
    const { cartCount } = useContext(CartContext);
    const { user,setUser } = useContext(UserContext);
     const handleLogout = () => {
        localStorage.removeItem('userToken');
        setUser(null);
        navigate("/auth/login")
        // window.location.reload();
    }

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
                                    {/* <Nav.Link as={Link} className={`${style.link}`} to={"/products"}>Contact</Nav.Link> */}

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

                                <NavDropdown title={user ? user.userName : "login"} id="basic-nav-dropdown">
                                    {/* <FontAwesomeIcon icon={faUser} /> */}
                                    {user ?
                                    <>
                                        <NavDropdown.Item as={Link} to={"/profile/info"}>Profile</NavDropdown.Item>
                                        <NavDropdown.Item className={style.profile} onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </> :
                                    <>
                                        <NavDropdown.Item as={Link} to={"/auth/login"}>Login</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={"/auth/register"}>Register</NavDropdown.Item>
                                    </>
                                    }

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

