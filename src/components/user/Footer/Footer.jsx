import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import logo from "../../../assets/BOTIGA.svg";
import style from "./footer.module.css";
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <section className={`footer p-5 ${style.bgColor}`}>
            <footer>
                <Container>

                    <Row>
                        <Col>
                            <div>
                                <img src={logo} alt="logo" />
                                <p className='my-3'>

                                    Give your customers insight into your product collection.
                                </p>
                                <Nav.Link as={Link}  className={`${style.link}`} to={""}>Contact</Nav.Link>


                            </div>
                        </Col>
                        <Col className="w-100 d-flex gap-5">
                            <Col>

                                <h3  className='mb-3'>Quick links</h3>
                                <Nav.Link as={Link}  className={`${style.link} mb-2 link`}  to={"/"}>Home</Nav.Link>
                                <Nav.Link as={Link}  className={`${style.link} mb-2 link`}  to={"/categories"}>Categories</Nav.Link>
                                <Nav.Link as={Link}  className={`${style.link} mb-2 link`}  to={"/products"}>Shop</Nav.Link>
                            </Col>
                            <Col>
                                <h3  className='mb-3'>About</h3>
                                <Nav.Link as={Link}  className={`${style.link} mb-2 link`}  to={""}>Shipping</Nav.Link>
                                <Nav.Link as={Link}  className={`${style.link} mb-2 link`}  to={""}>Terms</Nav.Link>
                                <Nav.Link as={Link}  className={`${style.link} mb-2 link`}  to={""}>Policy</Nav.Link>
                            </Col>
                        </Col>
                    </Row>
                </Container>

            </footer>
        </section>
    )
}
